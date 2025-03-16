//rutas
const router= require("express").Router();
const {registerUser,
        login,
        getProfile,

} = require ('../../controllers/user.controller');

const checkToken = require("../../middleware/auth");

// endpoints para registro de usuario y login

router.post("/register", registerUser);
router.post("/login", login);
router.get("/profile", checkToken, getProfile); // ruta privada o protegida

module.exports = router;