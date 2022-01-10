const express = require('express');
const passport = require('passport'); //Pasport desencripta los JWT
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const usersController = require('./controllers/users');
usersController.registerUser('bettatech', '1234');
usersController.registerUser('victor22junio', '4321');

require('./auth')(passport); //Lammamos a la función pasándole como parámetro passport y lo que hace es modificar
//passport para que funcione como le hemos indicado




const app = express();
app.use(bodyParser.json());
//App es el objeto servidor
// Es decir el ejecutable para levantar el servidor ""

const port = 3000;

app.post('/login', (req, res) => {
    if (!req.body) {
        return res.status(400).json({message: 'Missing data'});
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({message: 'Missing data'});
    }
    usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
        if (err || !result) {
            if (err){
                console.log('error');
            } else {
                console.log(result);
                console.log('No hay resultado')
            }
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({userId:result}, 'secretPassword');
        res.status(200).json({token:token});
    })
});


app.get('/team',
    //Esta función protege login
    //Hace una autentificación usando jwt Json web token
    passport.authenticate('jwt', { session: false }), 
    (req, res, next) => {
        res.status(200).send('Hello wotld!');
    });

app.listen(port, () => {
    console.log(`Server iniciado en el puerto ${port}`);
});

app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});


app.get('/almacen', (req, res) => {

});


app.post('/almacen/cajas', (req, res) => {

});


app.delete('/almacen/caja:cajaid', (req, res) => {

});

exports.app = app;
