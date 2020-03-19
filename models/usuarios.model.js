const connection = require('./db.model');

//4 CRUD SOBRELATABLA USUARIOS

// INSERT === CREATE

exports.crearUsuario = (nombreUsuario, email, fechaInscripcion, contraseña) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await connection.query(`
            INSERT INTO usuarios (nombreUsuario, email, fechaInscripcion, contraseña)
            VALUES ("${nombreUsuario}", "${email}", ${fechaInscripcion}, "${contraseña}" );
            `);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};
// SELECT == READ (CRUD)
exports.getUserById = (Id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await connection.query(
                `SELECT * FROM usuarios WHERE Id = ${Id}`
            );
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};
