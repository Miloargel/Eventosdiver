const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const checkToken = async(req, res, next)=>{
    // validar si el token enviado desde el cliente existe y es correcto
    try{
        //comprobar si el token viene incluido en la cabecera de la propiedad Authorization
        if(!req.headers["authorization"]){
            return res.status(403).json ({ message:"Es necesario incluir el token" })
        }
        // comprobar si el token es correcto
        const tokenString = req.headers["authorization"];
        const token = tokenString.split(" ")[1];
        let data;
        //recuperar la informacion del usuario asociado al token
        try{
            data = jwt.verify(token, process.env.JWT_API_SECRET);
        }catch (error){
            return res
            .status(403)
            .json({ message: 'El token es incorrecto'});
        }

        const user = await User.findById(data.user_id);
        // el usuario no existe
        if(!user){
            return res.status(403).json ({ message:"El usuario no existe" })
        }
        //enviar el usuario dentro de la peticion, es decir dentro del req
        req.user = user;
        //pasamos a ejecutar el controlador de la ruta protegida
        next();
    }catch(error){}
};

module.exports = checkToken;