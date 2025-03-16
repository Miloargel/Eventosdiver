// modelo vista controlador ---> arquitectura de desarrollo MVC
//modelos ---> estructuras de datos(definicion de documentos de mongoDB,crud de una tabla)
//controladores ---> funciones a ejecutar sobre un modelo de datos
//routes--> rutas de los endpoint de cada modelo 

const express= require("express");
const cors= require("cors");
const connectDB= require("./src/utils/conexion_db");
const router = require("./src/api/routers/api.routes");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

 connectDB();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const server = express();
server.use(express.json());
server.use(cors());
server.use("/", router);

// server.use('/api'/user/list)
const PORT= process.env.PORT;
server.listen(PORT, ()=>{
    console.log(`Server running http://localhost:${PORT}`)
});