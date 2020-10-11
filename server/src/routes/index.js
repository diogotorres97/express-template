const router = require('express').Router();

/*+++++++++++++++++++++++++++++++++++++++++++++
 Routes
 ++++++++++++++++++++++++++++++++++++++++++++++*/

const passport = require('passport');
const auth = require('./auth');
const todos = require('./todos');
const todoItems = require('./todoItems');

router.use('/api/', auth);
router.use('/api/', passport.authenticate('jwt', { session: false }));
router.use('/api/', todos);
router.use('/api/', todoItems);

module.exports = router;
