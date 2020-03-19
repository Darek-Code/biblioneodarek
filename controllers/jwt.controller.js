const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets')

exports.checkToken = (req, res, next) => {
    // 1. Comprobar si elendpoint es/login o /register
    if (req.path !== "/login" && req.path !== "/nuevoUsuario") {
        // 2.Compruebo que el usuariotenga la cookie de sesión
        if (req.cookies["sello"] !== undefined) {
            // 3.Comprobar el token
            jwt.verify(
                req.cookies["sello"],
                secrets.jwt_clave,
                (error, confirmacion) => {
                    if (error) {
                        // El token esté corrupto
                        console.log(error);
                        res.status(401).send({ "error": "Token no válido" });
                    } else if (confirmacion) {
                        // Hemos comprobado que el token esválido
                        next();
                    } else {
                        res.status(401).send({ "error": "Token no válido" });
                    }
                }
            )

        } else {
            res.status(401).send({ "error": "No estás autentificado", "loginURL": "/login" })
        }
    } else {
        // Estás intentado entrar a /login o/register
        next();
    }
}
