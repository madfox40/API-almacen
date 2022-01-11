const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

const app = require('../app').app;

describe('Pruebas de teams', () => {
    it("Should return the team of the given user", (done) => {
        //Primero logueamos al usuario
        let team =  [{ name: 'Charizard' }, { name: 'Blastoise' }, { name: 'Pikachu' } ];
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'bettatech', password: '1234' })
            .end((err, res) => {
                let token = res.body.token;
                //Comprobamos si el token es correcto
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/team')
                    .send({team:team})
                    .set('Authorization', `jwt ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/team')
                            .set('Authorization', `jwt ${token}`)
                            .end((err, res) => {
                                //tiene equipo con Charizard y Blastoise
                                // {trainer: 'mastermind', team: [Pokemon]}
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'bettatech');
                                chai.assert.equal(res.body.team.length, 3);
                                chai.assert.equal(res.body.team[0].name, 'Charizard');
                                chai.assert.equal(res.body.team[1].name, 'Blastoise');
                                done();
                            });

                    });
            });

    });
})