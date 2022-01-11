const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const passport = require('passport'); //Pasport desencripta los JWT
const teamsControler = require('../controllers/teams');
const { getUser } = require('../controllers/users');
require('../auth')(passport); //Lammamos a la función pasándole como parámetro passport y lo que hace es modificar
//passport para que funcione como le hemos indicado



router.route('/')
    //Esta función protege login
    //Hace una autentificación usando jwt Json web token
    .get(passport.authenticate('jwt', { session: false }),
        (req, res, next) => {
            let user = getUser(req.user.userId);
            res.status(200).json({
                trainer: user.userName,
                team: teamsControler.getTeamOfUser(req.user.userId)
            });
        })
    .put((req, res) => {
        teamsControler.setTeam(req.body.user, req.body.team);
    });

router.route('pokemons')
    .post(() => {
        res.status(200).send('Hello World')
    })

router.route('pokemons/:pokeid')
    .delete(() => {
        res.status(200).send('Hello World')
    })

exports.router = router;