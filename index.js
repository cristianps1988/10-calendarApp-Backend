const express = require('express');
require('dotenv').config();
const cors = require('cors')

// conexion a la base de datos
const { dbConnection } = require('./db/config')


// crear servidor en express
const app = express();

// base de datos
dbConnection()

// cors
app.use(cors())

// directorio publico
app.use(express.static('public'))

// lectura y parseo del body
app.use(express.json())

// rutas
app.use('/api/auth', require('./routes/auth'))

// escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})