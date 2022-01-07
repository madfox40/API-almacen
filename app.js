const express = require('express');
const passport = require('passport'); //Pasport desencripta los JWT
require('./auth')(passport); //Lammamos a la función pasándole como parámetro passport y lo que hace es modificar
//passport para que funcione como le hemos indicado

const app = express();
//App es el objeto servidor
// Es decir el ejecutable para levantar el servidor ""

const port = 3000;

app.post('/login', (req, res) => {
    res.status(200).json({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.zX5MPQtbjoNAS7rpsx_hI7gqGIlXOQq758dIqyBVxxY' })
});


app.get('/team',
    //Esta función protege login
    //Hace una autentificación usando jwt Json web token
    passport.authenticate('jwt', { session: false }), 
    (req, res) => {
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
