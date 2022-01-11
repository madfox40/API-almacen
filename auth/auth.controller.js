const uuid = require('uuid');
const crypto = require('../tools/crypto');
const teams = require('../teams/teams.controller');

let userDataBase = {};

const cleanUpUsers = () => {
    userDataBase = {};
};

const getUser = (userID) => {
    return userDataBase[userID];
};

const registerUser = (userName, password) => {
    //Guardar en la base de datos nuestro usuario
    let hasedPwd = crypto.hashPasswordSync(password); //en result tenemos el hash
    let userId = uuid.v4();
    userDataBase[userId] = {
        userName: userName,
        password: hasedPwd
    }
    teams.bootstrapTeam(userId);
};

const getUserIdFromUserName = (userName) => {
    for (let user in userDataBase) {
        if (userDataBase[user].userName == userName) {
            let userData = userDataBase[user];
            userData.userId = user;
            return userData;
        }
    }
}

const checkUserCredentials = (userName, password, done) => {
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
exports.getUser = getUser;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.cleanUpUsers = cleanUpUsers;