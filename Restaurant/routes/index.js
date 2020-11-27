let express = require('express');
let router = express.Router();
let indexController = require('../controllers/indexController');

// /, renderizar el index con todos los chefs del query 
router.get('/', indexController.renderIndex);


module.exports = router;
