const chai = require("chai");
const chaiHTTP = require('chai-http');
const app = require('../../app').app;
const usersController = require('../users.controller');
chai.use(chaiHTTP);
//con chai.use y dentro un plugin lo implementamos para que funcione con chai
//nos permite hacer chai.get, chai.post....



//Los test con chaiHTTP son de integración es 
//decir asíncronos tienen un coste de tiempo asociado
//done es una función para avisar cuando ha terminado el test y que no sale de linea
//en caso de que no haya una respuesta sincrona



beforeEach((done) => {
    usersController.registerUser('bettatech', '1234');
    usersController.registerUser('victor22junio', '4321');
    done();
});

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

after((done) => {
    usersController.cleanUpUsers();
    done();
});