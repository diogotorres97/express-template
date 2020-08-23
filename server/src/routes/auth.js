const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = require('../config/configs');

router.post('/signup', async (req, res) => {
  passport.authenticate('signup', { session: false }, async (err, user, info) => {
    if (!user && info) {
      return res.status(400).send(info.message);
    }

    if (!user) return res.status(400).send();
    /* eslint-disable */
    delete user.dataValues.password;
    delete user._previousDataValues.password;
    /* eslint-enable */
    return req.login(user, { session: false }, async () => {
      const body = { id: user.id, email: user.email };
      const token = jwt.sign({ user: body }, JWT_SECRET);

      return res.json({
        message: 'Signup successful',
        user,
        token,
      });
    });
  })(req, res);
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (!user && info) {
        return res.status(400).send(info.message);
      }

      if (!user) return res.status(400).send();

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, JWT_SECRET);

        return res.json({ token });
      });
      return next();
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
