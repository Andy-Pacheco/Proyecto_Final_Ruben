let connection = require("../config/db");
let sha1 = require('sha1');
let jwt = require("jsonwebtoken");

let loginController = {};
let secret = "godzilla011!@";

// login/, renderizar el form login.ejs
loginController.renderLogin = (req, res) =>{
    let alert = "";
    res.render('loginForm', {alert});
};

// login/token, recoger el posteo de 'login.ejs', crear token y devolverlo en json
loginController.createToken = (req, res) =>{
    let {email, password} = req.body;
    password = sha1(password);
    let sql = ` SELECT description, last_name, chef_img FROM chef WHERE email = "${email}"
    AND password = "${password}"`;
    connection.query(sql, (err, result) =>{
        if (err) throw err;
        if (result.length != 0){
            let token = jwt.sign({result}, secret);
            res.json(token);
        }
        else{
            let alert = 'Email or password are not correct'
            res.render('loginForm', {alert})
        }
    });
};


module.exports = loginController;