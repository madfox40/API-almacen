const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usersController = require('./users.controller');


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
            let user = usersController.getUserIdFromUserName(req.body.user);
            const token = jwt.sign({ userId: user.userId }, 'secretPassword');
            res.status(200).json({ token: token });
        })
    });

exports.router = router;