const usuariosModel = require('../models/usuarios.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets =require('../config/secrets')


exports.nuevoUsuario = async (req, res) => {
    const nombre = req.body.nombreUsuario;
    const email = req.body.email;

    const now = new Date;
    const fechaInscripcion = `${now.getFullYear()}${now.getMonth().toString().padStart(2, "0")}${now.getDate()}`
    // Llamar al modelo y pedir que nos cree un nuevo usuario
    try {
        const hash = await bcrypt.hash(req.body.contraseña, 15);
        console.log("El hash ya ha sido creado");
        const result = await usuariosModel.crearUsuario(
            nombre,
            email,
            fechaInscripcion,
            hash
        );
        res.send({ "message": "Ok, usuario creado!", "Id": result.insertId });
    } catch (error) {
        res.send(error);
    }
};

exports.login = async (req, res) => {
    const Id = req.body.Id;
    const contraseña = req.body.contraseña;
    try {
        const usuario = await usuariosModel.getUserById(Id);
        const match = await bcrypt.compare(contraseña, usuario[0].contraseña);
        console.log("El compare ya ha terminado");
        if (match) {
            // Json Web Tokens (JWT)
            jwt.sign({ "userId": usuario.Id },
                secrets.jwt_clave,
                (error, token) => {
                    if (error) {
                        console.log(error);
                        res.send(error);
                    } else {
                        res.cookie("sello", token);
                        res.send({ "message": "Estás autorizado", "token": token })
                    }

                }
            )
        } else {
            // Contraseñas no coinciden
            res.status(400).send({ "error": "Las contraseñas no coinciden" })
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
