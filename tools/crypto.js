const bcrypt = require('bcrypt');

//Función asíncrona recomendado por bcrypt
//El 10 corresponde al parámetro saltRounds
//saltrounds son el número de iteraciones que se hacen en el método de cifrado
const hashPassword = (plainTextPassword, done) => {
    bcrypt.hash(plainTextPassword, 10, function(err,hash) {
        done(err,hash);
    });
};


const hashPasswordSync = (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
}

const comparePassword = (plainPassword, hashPassword, done) => {
    bcrypt.compare(plainPassword, hashPassword, done);
}

//Es lo mismo pero más abreviado y corto (Mirar al done)
// const comparePassword = (plainPassword, hashPassword, done) => {
//     bcrypt.compare(plainPassword, hashPassword,done);
// }

exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.hashPasswordSync = hashPasswordSync;