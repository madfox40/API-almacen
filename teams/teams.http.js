//ESTA CAPA RELACIONA TRANSPORTE (APP/DECLARACIONES) con CONTROLADORES CONTROLLERS
//ES LA CAPA INTERMEDIA

const axios = require('axios').default;
const teamsControler = require('./teams.controller');
const usersController = require('../auth/users.controller')

const getTeamFromUser = (req, res) =>  {
    let user = usersController.getUser(req.user.userId);
    res.status(200).json({
        trainer: user.userName,
        team: teamsControler.getTeamOfUser(req.user.userId)
    })
};


const setTeamToUser = (req,res) => {
    teamsControler.setTeam(req.user.userId, req.body.team);
    res.status(200).send();
};

const addPokemonToTeam = (req,res) => {
    let pokemonName = req.body.name;
    console.log('Calling Pokeapi');
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(function (response) {
            //sucess
            let pokemon = {
                name: pokemonName,
                pokedexNumber: response.data.id
            };
            teamsControler.addPokemon(req.user.userId, pokemon);

            res.status(201).json(pokemon);
        })
        .catch(function (error) {
            console.log(error);
            res.status(400).json({ mssage: error });
            //error
        })
        .then(function () {
            //final
        });
};

const deletePokemonFromTeam = (req,res) => {
        teamsControler.deletePokemon(req.user.userId, req.params.pokeid);
        res.status(200).send('Hello World')
} ;

exports.getTeamFromUser = getTeamFromUser;
exports.setTeamToUser = setTeamToUser;
exports.addPokemonToTeam = addPokemonToTeam;
exports.deletePokemonFromTeam = deletePokemonFromTeam;