let express = require('express');
let router = express.Router();
let loginController = require('../controllers/loginController');

// login/, renderizar el form login.ejs
router.get('/', loginController.renderLogin);

// login/token, recoger el posteo de 'login.ejs', crear token y devolverlo en json
router.post('/token', loginController.createToken);

module.exports = router;