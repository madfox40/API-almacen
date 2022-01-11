
let teamDatabase = {};

const cleanUpTeam = () => {
    for (let user in teamDatabase) {
        teamDatabase[user] = [];
    }
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
    teamDatabase[userId].push(pokemon);
}

const getTeamOfUser = (userId) => {
    return teamDatabase[userId];
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