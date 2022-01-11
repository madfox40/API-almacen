const bodyParser = require('body-parser');
const authmiddleware = require('./tools/auth-middleware')

const setUpMiddleWares = (app) => {
    app.use(bodyParser.json());
    authmiddleware.init();
    app.use(authmiddleware.protectWithJwt);
}
exports.setUpMiddleWares = setUpMiddleWares;