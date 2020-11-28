let connection = require("../config/db");

let viewController = {};

// view/:chef_id, ver el perfil del user_id
viewController.renderUser = (req, res) =>{

    let chef_id = req.params.chef_id;
    let sql = `SELECT * FROM chef WHERE chef_id = ${chef_id}`;
    let sql2 = `SELECT * FROM dish WHERE chef_id = ${chef_id}`;

    connection.query (sql, (err, result) =>{
        if(err) throw err;

        connection.query(sql2, (err, results2) =>{
            if (err) throw err;
            res.render('chefView', {result, results2});
        });
    });
};

// view/editDish/:dish_id, formulario con los datos del dish 'dishEditForm.ejs'
viewController.renderEditForm = (req, res) =>{

    let dish_id = req.params.dish_id;
    let sql = `SELECT name, description, dish_img, dish_id FROM dish WHERE dish_id = ${dish_id}`;

    connection.query (sql, (err, result) =>{
        if(err) throw err;
        res.render('editDishForm', {result});
    });
};

// view/sendDish/:dish_id, recoge posteo del form y lo updatea en db, redirect a /view/:user_id
viewController.updateDish = (req, res) =>{

    let dish_id = req.params.dish_id;
    let {name, description} = req.body;
    if (description.length > 300){
        description = description.slice(0,300);
    };
    let sql2 = `UPDATE dish SET name = "${name}", description = "${description}" 
                WHERE dish_id = ${dish_id}`;
    let sql = `SELECT chef_id from dish WHERE dish_id = ${dish_id}`;

    connection.query(sql, (err, result) =>{
        if(err) throw err;
        let chef_id = result[0].chef_id;

        connection.query(sql2, (err, result2) =>{
            if(err) throw err;
            res.redirect(`/view/${chef_id}`);
        });
    });
};

// view/deleteDish/:dish_id, recoge id y elimina, redirect a /view/user/:user_id
viewController.deleteDish = (req, res) =>{

    let dish_id = req.params.dish_id;
    let sql = `SELECT chef_id from dish WHERE dish_id = ${dish_id}`;
    let sql2 = `DELETE FROM dish WHERE dish_id = ${dish_id}`;

    connection.query(sql, (err, result) =>{
        if (err) throw err;
        let chef_id = result[0].chef_id;

        connection.query(sql2, (err, resul2) =>{
            if(err) throw err;
            res.redirect(`/view/${chef_id}`);
        });
    });
};

module.exports = viewController;