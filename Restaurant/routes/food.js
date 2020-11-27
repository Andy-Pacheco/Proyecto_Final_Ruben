let express = require('express');
let router = express.Router();
let multer  = require('multer');
let foodController = require('../controllers/foodController');

let storageDish = multer.diskStorage({
    destination: 'public/images/users/dishes',
    filename: function (req, file, cb) {
      const extension = file.originalname.slice(
        file.originalname.lastIndexOf('.'));
      cb(null, Date.now() + extension)
      }
  });

let uploadChef = multer({ storage: storageDish }).single('dish_img');

// food/form, renderizar el foodForm.ejs
router.get('/form', foodController.getForm);

// food/form/send, recoger el posteo del form e instertarlo, redirigir a '/'
router.post('/form/send', uploadChef, foodController.insertFood);

module.exports = router;