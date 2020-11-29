let express = require('express');
let router = express.Router();
let ratingsController = require('../controllers/ratingsController');

router.get('/:dish_id', ratingsController.getRatings);

router.post('/send/:dish_id', ratingsController.insertRating);


module.exports = router;