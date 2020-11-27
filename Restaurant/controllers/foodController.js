let connection = require('../config/db');

let foodController = {};

// food/form, renderizar el foodForm.ejs
foodController.getForm = (req, res) =>{

    let sql = `SELECT chef_id, name FROM chef`;

    connection.query (sql, (err, results) =>{
        res.render('dishForm', {results});
    });
};

// food/form/send, recoger el posteo del form e instertarlo, redirigir a '/'
foodController.insertFood = (req, res) =>{

    let {name, description, chef_id} = req.body;
    let dish_img = req.file.filename;
    let sql = ` INSERT INTO dish (name, description, dish_img, chef_id) 
    VALUES ("${name}", "${description}", "${dish_img}", ${chef_id})`;
    
    connection.query (sql, (err, result) =>{
        if (err) throw err;
        res.redirect('/');
    });
};

module.exports = foodController;