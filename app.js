const express = require('express');
const middlewares = require('./middlewares');

const authRoutes = require('./auth/auth.router').router;
const teamRoutes = require('./teams/teams.router').router;

const app = express();
//App es el objeto servidor
// Es decir el ejecutable para levantar el servidor ""

const port = 3000;

middlewares.setUpMiddleWares(app);



app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});


app.use('/auth', authRoutes);
app.use('/team', teamRoutes);

app.listen(port, () => {
    console.log(`Server iniciado en el puerto ${port}`);
});

exports.app = app;
