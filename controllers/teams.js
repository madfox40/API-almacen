const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const passport = require('passport'); //Pasport desencripta los JWT
require('../auth')(passport); //Lammamos a la función pasándole como parámetro passport y lo que hace es modificar
//passport para que funcione como le hemos indicado

router.route('/')
    //Esta función protege login
    //Hace una autentificación usando jwt Json web token
    .get(passport.authenticate('jwt', { session: false }),
        (req, res, next) => {
            res.status(200).send('Hello wotld!');
        })
    .put();

router.route('pokemons')
    .post(() => {
        res.status(200).send('Hello World')
    })

router.route('pokemons/:pokeid')
    .delete(() => {
        res.status(200).send('Hello World')
    })

exports.router = router;