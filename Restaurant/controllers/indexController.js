let connection = require('../config/db');

let indexController = {};

// /, renderizar el index con todos los chefs del query 
indexController.renderIndex = (req, res) =>{

    let sql = `SELECT CONCAT(name, " ", last_name) as name, 
    description, chef_img, chef_id FROM chef`;

    connection.query (sql, (err, results) =>{
        if(err) throw err;
        console.log(results)
        res.render('index', {results});
    });
};

module.exports = indexController;