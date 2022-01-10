const chai = require("chai");
const chaiHTTP = require('chai-http');
const app = require('../app').app;

chai.use(chaiHTTP);
//con chai.use y dentro un plugin lo implementamos para que funcione con chai
//nos permite hacer chai.get, chai.post....



//Los test con chaiHTTP son de integración es 
//decir asíncronos tienen un coste de tiempo asociado
//done es una función para avisar cuando ha terminado el test y que no sale de linea
//en caso de que no haya una respuesta sincrona
describe('Test de prueba', () => {
    it('Should return hello world', (done) => {
        chai.request(app) //Sirve para iniciar el servidor para el entorno de pruebas
            .get('/')
            //.end() Acepta otra función que nos permite recoger el resultado de
            //la llamada .get()
            .end((err, res) => {
                chai.assert.equal(res.text, 'Hello World');
                done();
            });

    });
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

    it("Should return 200 when jwt is valid", (done) => {
        //Primero logueamos al usuario
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'bettatech', password: '1234'})
            .end((err, res) => {
                //Comprobamos si el token es correcto
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .get('/team')
                    .set('Authorization', `jwt ${res.body.token}`)
                    //Aquí estamos mandando el header con nombre authorization
                    //y valor JWT token
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });
            });

    });
});