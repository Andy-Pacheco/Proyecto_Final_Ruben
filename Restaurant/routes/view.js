let express = require('express');
let router = express.Router();
let viewController = require('../controllers/viewController');

// view/:chef_id, ver el perfil del user_id
router.get('/:chef_id', viewController.renderUser);

// view/editDish/:dish_id, formulario con los datos del dish 'dishEditForm.ejs'
router.get('/editDish/:dish_id', viewController.renderEditForm);

// view/sendDish/:dish_id, recoge posteo del form y lo updatea en db, redirect a /view/:user_id
router.post('/sendDish/:dish_id', viewController.updateDish);

// view/deleteDish/:dish_id, recoge id y elimina, redirect a /view/user/:user_id
router.get('/deleteDish/:dish_id', viewController.deleteDish);

//view/deleteChef/:chef_id, elimina el chef y redirige a /
router.get('/deleteChef/:chef_id', viewController.deleteChef);

//view/editChef/:chef_id, form y relleno datos, redirige a /view/:chef_id
router.get('/editChef/:chef_id', viewController.showChefForm);

//view/editChef/send, recoge el posteo y updatea, redirige a /view/:chef_id
router.post('/editChef/send/:chef_id', viewController.editChef);

module.exports = router;
