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
describe('Este es un test de prueba', () => {
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

    it("Should return 200 when jwt is valid", (done) => {
        //Primero logueamos al usuario
        chai.request(app)
            .post('/login')
            .end((err, res) => {
                //Comprobamos si el token es correcto
                chai.request(app)
                    .get('/team')
                    //Aquí estamos mandando el header con nombre authorization
                    //y valor JWT token
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });
            });

    });
});