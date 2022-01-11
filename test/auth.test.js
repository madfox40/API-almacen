const chai = require("chai");
const chaiHTTP = require('chai-http');
const app = require('../app').app;

chai.use(chaiHTTP);
const usersController = require('../controllers/users');
const teamsController = require('../controllers/teams');
//con chai.use y dentro un plugin lo implementamos para que funcione con chai
//nos permite hacer chai.get, chai.post....



//Los test con chaiHTTP son de integración es 
//decir asíncronos tienen un coste de tiempo asociado
//done es una función para avisar cuando ha terminado el test y que no sale de linea
//en caso de que no haya una respuesta sincrona





describe('Test de autentificación', () => {

    it("Should return 400 when no data is provided", (done) => {
        //Primero logueamos al usuario
        chai.request(app)
            .post('/auth/login')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 400);
                done();
            });
    });

    it("Should return 200 and token for succesful login", (done) => {
        //Primero logueamos al usuario
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'bettatech', password: '1234'})
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 200);
                done();
            });
    });

});
