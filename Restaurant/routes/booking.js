let express = require('express');
let router = express.Router();
let bookingController = require('../controllers/bookingController');

router.get('/', bookingController.getBooking);

router.post('/send', bookingController.sendBooking);

module.exports = router;