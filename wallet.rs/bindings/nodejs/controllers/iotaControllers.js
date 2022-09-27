const {
    AccountManager,
    RemainderValueStrategy,
    SignerType,
} = require('@iota/wallet');
const iotaUrl = 'https://api.lb-0.h.chrysalis-devnet.iota.cafe';
const sh = require('sh');

async function retrieveRootKey(directory) {
    console.log('\t-- Read encrypted root key...');
    const key = directory + '../key.ctx';
    const input = directory + '../secret.enc';
    const iv = directory + '../iv.dat';

    return await sh(
        'tpm2 encryptdecrypt -c ' + key + ' -D -i ' + input + ' -t ' + iv,
    );
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.create_charger_account = async (req, res) => {
    let type = req.body.type;
    type = capitalizeFirstLetter(type.toLowerCase());
    const manager = new AccountManager({
        storagePath: `./${req.body.type}-database`,
    });

    try {
        manager.setStrongholdPassword(retrieveRootKey());
        let account;
        try {
            account = manager.getAccount(type);
        } catch (e) {
            console.log("Couldn't get account, creating a new one");
        }

        // Create account only if it does not already exist
        if (!account) {
            manager.storeMnemonic(SignerType.Stronghold);
            account = manager.createAccount({
                clientOptions: {
                    node: {
                        url: iotaUrl,
                    },
                    localPow: true,
                },
                alias: type,
            });
            console.log('Account created:', account.id());
        }

        const synced = await account.sync();
        console.log('Synced account', synced);
        res.status(200).send({ synced });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.generate_address = async (req, res) => {
    let type = req.body.type;
    type = capitalizeFirstLetter(type.toLowerCase());
    const manager = new AccountManager({
        storagePath: `./${req.body.type}-database`,
    });

    try {
        manager.setStrongholdPassword(retrieveRootKey());

        const account = manager.getAccount(type);
        console.log('Account:', account.alias());

        // The account should be always synced before any operation
        await account.sync();
        console.log('Syncing...');

        const NEW_ADDRESS = false;
        if (NEW_ADDRESS) {
            const address = account.generateAddress();
            console.log('New address:', address);
        } else {
            // We can also get the latest unused address:
            const addressObject = account.latestAddress();
            console.log('Address:', addressObject.address);
        }

        // Using the Chrysalis Faucet to send testnet tokens to the address:
        console.log(
            'Fill your address with the Faucet: https://faucet.chrysalis-devnet.iota.cafe/',
        );

        const addresses = account.listAddresses();
        res.status(200).send({ addresses });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.check_balance = async (req, res) => {
    console.log(req.body, 'Body');
    let type = req.body.type;
    type = capitalizeFirstLetter(type.toLowerCase());
    const manager = new AccountManager({
        storagePath: `./${req.body.type}-database`,
    });

    try {
        manager.setStrongholdPassword(retrieveRootKey());

        const account = manager.getAccount(type);

        console.log('Account:', account.alias());

        // Always sync before doing anything with the account
        await account.sync();
        console.log('Syncing...');

        console.log('Available balance', account.balance().available);
        res.status(200).send({ balance: account.balance().available });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.send_iota_token = async (req, res) => {
    const walletAddress = req.body.address;
    const amount = req.body.amount;
    let type = req.body.type;
    type = capitalizeFirstLetter(type.toLowerCase());
    const manager = new AccountManager({
        storagePath: `./${req.body.type}-database`,
    });

    try {
        manager.setStrongholdPassword(retrieveRootKey());

        const account = manager.getAccount(type);

        console.log('Alias', account.alias());
        console.log('Syncing...');
        await account.sync();
        console.log('Available balance', account.balance().available);

        const address = walletAddress;
        const response = await account.send(address, amount, {
            remainderValueStrategy: RemainderValueStrategy.reuseAddress(),
        });
        res.status(200).send({ response });
    } catch (err) {
        res.status(500).send(err);
    }
};