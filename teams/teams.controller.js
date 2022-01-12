const { reject, promise } = require("bcrypt/promises");


let teamDatabase = {};

const cleanUpTeam = () => {
    return new Promise((resolve, reject) => {
        for (let user in teamDatabase) {
            teamDatabase[user] = [];
        }
        resolve();
    })
};

const deletePokemon = (userId, pokeId) => {
    if (teamDatabase[userId][pokeId]) {
        teamDatabase[userId].splice(pokeId, 1);
    }
}

const bootstrapTeam = (userId) => {
    teamDatabase[userId] = [];
}

const addPokemon = (userId, pokemon) => {
    return new Promise((resolve, reject) => {
        if (teamDatabase[userId].length == 6) {
            reject();
        } else {
            resolve();
            teamDatabase[userId].push(pokemon);
        }
    })
}

const getTeamOfUser = (userId) => {
    return new Promise((resolve, reject) => {
        resolve(teamDatabase[userId]);
    })
}

const setTeam = (userId, team) => {
    teamDatabase[userId] = team;
}

exports.setTeam = setTeam;
exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
exports.deletePokemon = deletePokemon;