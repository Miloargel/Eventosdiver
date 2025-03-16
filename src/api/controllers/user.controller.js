const bcrypt = require ('bcrypt');
const { createToken } = require ('../../utils/jwt');
const mongoose = require('mongoose');
const Users = require('../models/user.model');

const registerUser = async(req, res)=> {
    try{
        let {  email, password } = req.body;
        const userDB = await Users.findOne({email:email});

        console.log("userDB:", userDB);

        if (!userDB) {  // Si el usuario no existe, lo creamos
            password = bcrypt.hashSync(password, 10); // Encripta la contraseña

            const newUser = new Users({
                username: req.body.name,
                email: req.body.email,
                password: password
              });

            const createdU = await newUser.save(); // Guarda el usuario en la BD

            res.json({
                success: true,
                usuarioCreado: createdU,
            });
        } else {
            res.json({
                success: false,
                message: 'El usuario ya existe',
            });
        }

    } catch (error) {
        console.error("❌ Error en registerUser:", error);
        res.status(500).json({ message: error.message });
    }
};

const login = async(req, res) =>{
    try{
        //recibo el uusuario y contrasena del cliente body
        const {email, password} = req.body;
        //verificar que el email existe
        const userDB = await Users.findOne({ email: email });
        if(!userDB){
            return res.json({success: false, message:"Usuario no existe"});
        }
        // SI EXISTE EL EMAIL
            // comparar la contrasena que me has enviado con la guardada en la DB
        const isSame = bcrypt.compareSync(password, userDB.password);
        // NO coinciden las contrasenas --> devuelvo msj de error
        if (!isSame) {
            return res.json({ success:false, message: 'contrasena incorrecta'});
        }
        //coinciden las contrasenas---> se crea el token
        const token = createToken(userDB);
        res.json({ success:true, token: token });
        //NO EXISTE EL EMAIL--> devuelvo msj de error

    } catch (error){ 

    }

};
const getProfile = async(req, res) => {
    try {
        res.json({ success:true, data: req.user });
    } catch (error) {
        res.json({ success: false, message: error });
    }
};

module.exports = { registerUser,
    login,
    getProfile,
};