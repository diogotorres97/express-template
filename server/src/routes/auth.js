'use strict';

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {JWT_SECRET} = require('../config/configs');


router.post('/signup', async (req, res) => {
    passport.authenticate('signup', {session: false}, async (err, user, info) => {
        if (!user && info) {
            res.status(400).send(info.message);
        }
        if (user)
            res.json({
                message: 'Signup successful',
                user
            });
    })(req, res);
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (!user) {
                return res.status(400).send(info.message);
            }
            req.login(user, {session: false}, async (error) => {
                if (error) return next(error);

                const body = {_id: user._id, email: user.email};
                const token = jwt.sign({user: body}, JWT_SECRET);

                return res.json({token});
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router;