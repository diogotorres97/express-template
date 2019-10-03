const port = process.env.PORT || 3000;

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const {
  FORCE_UPDATE_DB,
} = require('./config/configs');

// Set up the express app
const app = express();
const routes = require('./routes/index');

app.use(cors());

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Authentication
require('./services/auth/passport');

app.use(passport.initialize());

// Require our routes into the application.
app.use('/', routes);

const db = require('./models/index');
const { initializeDatabase } = require('./seeders/seedDatabase');

db.sequelize.sync({ force: FORCE_UPDATE_DB }).then(() => {
  if (FORCE_UPDATE_DB) initializeDatabase();
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
});

module.exports = app;
