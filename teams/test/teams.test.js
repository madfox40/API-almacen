const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const usersController = require('../../auth/auth.controller');
const teamsControler = require('../teams.controller');

const app = require('../../app').app;

beforeEach((done) => {
    usersController.registerUser('bettatech', '1234');
    usersController.registerUser('victor22junio', '4321');
    done();
});

afterEach((done) => {
    teamsControler.cleanUpTeam();
    done();
});

describe('Pruebas de teams', () => {
    it("Should return the team of the given user", (done) => {
        //Primero logueamos al usuario
        let team = [{ name: 'Charizard' }, { name: 'Blastoise' }, { name: 'Pikachu' }];
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'victor22junio', password: '4321' })
            .end((err, res) => {
                let token = res.body.token;
                //Comprobamos si el token es correcto
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/team')
                    .send({ team: team })
                    .set('Authorization', `jwt ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/team')
                            .set('Authorization', `jwt ${token}`)
                            .end((err, res) => {
                                //tiene equipo con Charizard y Blastoise
                                // {trainer: 'mastermind', team: [Pokemon]}
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'victor22junio');
                                chai.assert.equal(res.body.team.length, 3);
                                chai.assert.equal(res.body.team[0].name, 'Charizard');
                                chai.assert.equal(res.body.team[1].name, 'Blastoise');
                                done();
                            });

                    });
            });

    });


    it("Should return the pokedex number", (done) => {
        //Primero logueamos al usuario
        let pokemonName = 'bulbasaur';
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'victor22junio', password: '4321' })
            .end((err, res) => {
                let token = res.body.token;
                //Comprobamos si el token es correcto
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .post('/team/pokemons')
                    .send({ name: pokemonName })
                    .set('Authorization', `jwt ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/team')
                            .set('Authorization', `jwt ${token}`)
                            .end((err, res) => {
                                //tiene equipo con Charizard y Blastoise
                                // {trainer: 'mastermind', team: [Pokemon]}
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'victor22junio');
                                chai.assert.equal(res.body.team.length, 1);
                                chai.assert.equal(res.body.team[0].name, 'bulbasaur');
                                chai.assert.equal(res.body.team[0].pokedexNumber, 1);
                                done();
                            });

                    });
            });

    });

    it("Should return 200 if is deleted successfully", (done) => {
        //Primero logueamos al usuario
        let team = [{ name: 'Charizard' }, { name: 'Blastoise' }, { name: 'Pikachu' }];
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({ user: 'victor22junio', password: '4321' })
            .end((err, res) => {
                let token = res.body.token;
                //Comprobamos si el token es correcto
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/team')
                    .send({ team: team })
                    .set('Authorization', `jwt ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .delete('/team/pokemons/2')
                            .set('Authorization', `jwt ${token}`)
                            .end((err, res) => {
                                chai.request(app)
                                .get('/team')
                                    .set('Authorization', `jwt ${token}`)
                                    .end((err, res) => {
                                        chai.assert.equal(res.statusCode, 200);
                                        chai.assert.equal(res.body.trainer, 'victor22junio');
                                        chai.assert.equal(res.body.team.length, team.length - 1);
                                        done();
                                    });
                            });
                    });

            });
    });

});


after((done) => {
    usersController.cleanUpUsers();
    done();
});