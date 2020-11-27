let jwt = require("jsonwebtoken");
let secret = "";

function verifyToken(req, res, next){
    const token = req.header("token");
    jwt.verify(token, secret, (err, result)=>{
        if(err){
            console.log("El error es", err)
            return res.status(401).json({message: "el token no es válido"})
        }
        console.log(result);
        next();
    })
}

module.exports = verifyToken;