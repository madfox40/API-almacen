const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const usersController = require('../controllers/users');
usersController.registerUser('bettatech', '1234');
usersController.registerUser('victor22junio', '4321');

router.route('/login')
    .post((req, res) => {
        if (!req.body) {
            return res.status(400).json({ message: 'Missing data' });
        } else if (!req.body.user || !req.body.password) {
            return res.status(400).json({ message: 'Missing data' });
        }
        usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
            if (err || !result) {
                if (err) {
                    console.log('error');
                } else {
                    console.log(result);
                    console.log('No hay resultado')
                }
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = jwt.sign({ userId: result }, 'secretPassword');
            res.status(200).json({ token: token });
        })
    });

exports.router = router;