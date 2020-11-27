let express = require('express');
let router = express.Router();
let multer  = require('multer');
let createController = require('../controllers/createController');

let storageChef = multer.diskStorage({
    destination: 'public/images/users/chefs',
    filename: function (req, file, cb) {
      const extension = file.originalname.slice(
        file.originalname.lastIndexOf("."));
      cb(null, Date.now() + extension)
      }
  });

let uploadChef = multer({ storage: storageChef }).single('chef_img');

// createChef/, renderizar el ChefForm.ejs
router.get('/', createController.renderForm);

// createChef/send, recoger el post (middleware para img), insertar en db y redirect a '/'
router.post('/send', uploadChef, createController.instertChef);

module.exports = router;