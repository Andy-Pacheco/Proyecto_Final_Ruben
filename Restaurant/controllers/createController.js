let connection = require('../config/db');
let sha1 = require('sha1');


let createController = {};

// createChef/, renderizar el registerForm.ejs
createController.renderForm = (req, res) =>{
    res.render('registerForm');
};

// createChef/send, recoger el post (middleware para img), insertar en db y redirect a '/'
createController.instertChef = (req, res) =>{
    
    let {name, last_name, email, password, description, phone} = req.body;
    password = sha1(password);
    let chef_img = req.file.filename;
    let sql = ` INSERT INTO chef (name, last_name, email, password, description, phone, chef_img)
    VALUES ("${name}","${last_name}","${email}","${password}","${description}","${phone}","${chef_img}");`

    connection.query (sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.redirect('/')
    });
};

module.exports = createController;