const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const passport = require('passport'); //Pasport desencripta los JWT
const teamsControler = require('./teams.controller');
const usersController = require('../auth/auth.controller');
const axios = require('axios').default;
require('../tools/auth')(passport); //Lammamos a la función pasándole como parámetro passport y lo que hace es modificar
//passport para que funcione como le hemos indicado



router.route('/')
    //Esta función protege login
    //Hace una autentificación usando jwt Json web token
    .get(passport.authenticate('jwt', { session: false }),
        (req, res, next) => {
            let user = usersController.getUser(req.user.userId);
            res.status(200).json({
                trainer: user.userName,
                team: teamsControler.getTeamOfUser(req.user.userId)
            });
        })
    .put(passport.authenticate('jwt', { session: false }),
        (req, res) => {
            teamsControler.setTeam(req.user.userId, req.body.team);
            res.status(200).send();
        });

router.route('/pokemons')
    .post(passport.authenticate('jwt', { session: false }),
        (req, res) => {
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
        });

router.route('/pokemons/:pokeid')
    .delete(passport.authenticate('jwt', { session: false }),
        (req, res) => {
        teamsControler.deletePokemon(req.user.userId, req.params.pokeid);
        res.status(200).send('Hello World')
    })

exports.router = router;