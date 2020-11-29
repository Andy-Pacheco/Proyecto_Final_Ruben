let connection = require("../config/db");

let ratingsController = {}

ratingsController.getRatings = (req, res) =>{

    let dish_id = req.params.dish_id;
    let sql2 = `SELECT dish_img, dish_id FROM dish WHERE dish_id = ${dish_id}`;
    let sql = `SELECT * FROM rating WHERE rating.dish_id = ${dish_id}`;

    connection.query(sql, (err, results) =>{
        if(err) throw err;

        connection.query(sql2, (err, img) =>{
            if(err) throw err;
            res.render('ratings', {results, img});
        });
    });
};

ratingsController.insertRating = (req, res) =>{
    let dish_id = req.params.dish_id;
    let {user, star_rating, review} = req.body;
    if (review == ""){review = "..."};
    if (user == "") {
        var sql = `INSERT INTO rating (star_rating, review, dish_id) 
                    VALUES (${star_rating}, "${review}", ${dish_id})`;
    }
    else {
        var sql = `INSERT INTO rating (user, star_rating, review, dish_id) 
                    VALUES ("${user}", ${star_rating}, "${review}", ${dish_id})`;
    };

    connection.query(sql, (err, result) =>{
        if(err) throw err;
        res.redirect(`/ratings/${dish_id}`);
    })
};


module.exports = ratingsController;