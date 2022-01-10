const uuid = require('uuid');
const crypto = require('../crypto');


const userDataBase = {};


const registerUser = (userName, password) => {
    //Guardar en la base de datos nuestro usuario
    let hasedPwd = crypto.hashPasswordSync(password); //en result tenemos el hash
    userDataBase[uuid.v4()] = {
        userName: userName,
        password: hasedPwd
    }
};

const getUserIdFromUserName = (userName) => {
    for (let user in userDataBase) {
        if (userDataBase[user].userName == userName) {
            console.log(userDataBase[user])
            return userDataBase[user];
        }
    }
}

const checkUserCredentials = (userName, password, done) => {
    console.log('Checking user credentials')
    //Comprobar que las credenciales son correctas
    let user = getUserIdFromUserName(userName);
    if (user) {
        crypto.comparePassword(password ,user.password, done);
    } else {
        done('Missing user')
    }
};


exports.checkUserCredentials = checkUserCredentials;
exports.registerUser = registerUser;