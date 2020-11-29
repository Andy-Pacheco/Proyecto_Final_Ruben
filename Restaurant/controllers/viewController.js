let connection = require("../config/db");
let sha1 = require('sha1');
let viewController = {};

// view/:chef_id, ver el perfil del user_id
viewController.renderUser = (req, res) =>{

    let chef_id = req.params.chef_id;
    let sql = `SELECT * FROM chef WHERE chef_id = ${chef_id}`;
    let sql2 = `SELECT * FROM dish WHERE chef_id = ${chef_id}`;
    let sql3 = `SELECT dish_id, COUNT(dish_id) AS count FROM rating GROUP BY dish_id`;

    connection.query (sql, (err, result) =>{
        if(err) throw err;

        connection.query(sql2, (err, results2) =>{
            if (err) throw err;
            connection.query(sql3, (err, ratings) =>{
                if(err) throw err;
                console.log(ratings);
                res.render('chefView', {result, results2, ratings});
            })
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

//view/deleteChef/:chef_id, elimina el chef y redirige a /
viewController.deleteChef = (req, res) =>{

    let chef_id = req.params.chef_id;
    console.log(chef_id)
    let sql = `DELETE FROM chef WHERE chef_id = ${chef_id}`;

    connection.query(sql, (err, result) =>{
        if (err) throw err;
        console.log(result);
        res.redirect('/');
    });
};

//view/editChef/:chef_id, form y relleno datos, redirige a /view/:chef_id
viewController.showChefForm = (req, res) =>{

    let chef_id = req.params.chef_id;
    let sql = `SELECT * FROM chef WHERE chef_id = ${chef_id}`;

    connection.query(sql, (err, result) =>{
        if (err) throw err;
        let alert = '' 
        res.render('editChefForm', {result, alert});
    })
};

//view/editChef/send/:chef_id, recoge el posteo y updatea, redirige a /view/:chef_id
viewController.editChef = (req, res) =>{
    let chef_id = req.params.chef_id;
    let {name, last_name, email, phone, description, password} = req.body;
    password = sha1(password);
    console.log(password);
    let sqlP = `SELECT password FROM chef WHERE chef_id = ${chef_id}`;

    connection.query(sqlP, (err, resultP) =>{
        if (err) throw err;
        console.log(resultP);
        if (resultP[0].password == password){
            let sql = `UPDATE chef SET name = "${name}",
                                last_name = "${last_name}",
                                email = "${email}",
                                phone = "${phone}",
                                description = "${description}"
                WHERE chef_id = ${chef_id}`;

            connection.query(sql, (err, result2) =>{
                if (err) throw err;
                res.redirect(`/view/${chef_id}`);
            })
        }
        else{
            let alert = 'Your password is not correct';
            let sql = `SELECT * FROM chef WHERE chef_id = ${chef_id}`;

            connection.query(sql, (err, result) =>{
                if (err) throw err;
             
                res.render('editChefForm', {result, alert});
            })
        };
    });   
};

module.exports = viewController;