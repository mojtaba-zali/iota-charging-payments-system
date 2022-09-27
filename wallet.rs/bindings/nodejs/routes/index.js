const express = require('express');
const router = express.Router();
const iotaControllers = require('../controllers/iotaControllers');

router.post('/create-account', iotaControllers.create_charger_account);
router.post('/generate-address', iotaControllers.generate_address);
router.post('/check-balance', iotaControllers.check_balance);
router.post('/send-payment', iotaControllers.send_iota_token);

module.exports = router;
