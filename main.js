const express = require('express');
const helmet = require('helmet');
const mainController = require('./controllers/main.controller');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwtController = require('./controllers/jwt.controller');

const server = express();

// Middleware:
server.use(helmet());
server.use(bodyParser.json());
server.use(cookieParser());
server.use(jwtController.checkToken);
// server.use(express.static('static'));

server.post('/nuevoUsuario', mainController.nuevoUsuario);
server.post('/login', mainController.login);

// Endpoint:
server.get('/', (req, res) => {
    res.send("Bienvenido!")
})

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
