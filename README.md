# A Secure IOTA-Based Mobile Payment System for Smart Vehicle
The goal of this project is to evaluate the viability of implementing an IOTA-based wallet for electric vehicles, focusing mainly on increasing the security of the wallet by exploiting a Trusted Platform Module (TPM) for the generation of seeds and any required credentials. Moreover, the wallet and the developed system should have the following characteristics:

- Receive and send payments
- Keep an account balance
- Secure communication with other wallets 
- Abort transactions in lack of balance
- Secure seed generation and storage
- Secure generation of required credentials

## Project Structure
The description regarding the structure of this repository is as follows:
- `iota-asl-car-gui` and `iota-asl-charger-gui` contain the frontend/GUI of the final implementation, developed by Vue.js
- `tmp2-abrmd`, `tpm2-tools` and `tpm2-tss` are the modules that are utilised to work with TPMs. Furthure explenations on these modules can be found in `final_report.pdf`
- `wallet.rs` includes the firefly wallet implementation and the backend/server of the final development. The main controller can be found in `wallet.rs/bindinds/nodejs/controllers`
- `iota-streams` includes the implementation of IOTA Streams protocol which is developed in rust. Further description can be found within the README file in this directory