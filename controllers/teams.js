let teamDatabase = {};

const bootstrapTeam = (userId) =>{
    teamDatabase[userId] = [{name: 'Charizard'}, {name:'Blastoise'}];
}

const addPokemon = (userId,pokemonName) => {
    teamDatabase[userId].push({name: pokemonName});
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