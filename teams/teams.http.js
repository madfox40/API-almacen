//ESTA CAPA RELACIONA TRANSPORTE (APP/DECLARACIONES) con CONTROLADORES CONTROLLERS
//ES LA CAPA INTERMEDIA

const axios = require('axios').default;
const teamsControler = require('./teams.controller');
const usersController = require('../auth/users.controller')

const getTeamFromUser = async (req, res) => {
    let team = await teamsControler.getTeamOfUser(req.user.userId);
    let user = usersController.getUser(req.user.userId);
    res.status(200).json({
        trainer: user.userName,
        team: team
    })
};


const setTeamToUser = (req, res) => {
    teamsControler.setTeam(req.user.userId, req.body.team);
    res.status(200).send();
};

const addPokemonToTeam = async (req, res) => {
    let pokemonName = req.body.name;
    console.log('Calling Pokeapi');
    let pokeApiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    let pokemon = {
        name: pokemonName,
        pokedexNumber: pokeApiResponse.data.id
    }
    try {
        await teamsControler.addPokemon(req.user.userId, pokemon);
        res.status(201).json(pokemon);
    } catch (error) {
        res.status(400).json({ message: 'You have already 6 pokemon' });
    }
};

const deletePokemonFromTeam = (req, res) => {
    teamsControler.deletePokemon(req.user.userId, req.params.pokeid);
    res.status(200).send('Hello World')
};

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamToUser = setTeamToUser;
exports.addPokemonToTeam = addPokemonToTeam;
exports.deletePokemonFromTeam = deletePokemonFromTeam;