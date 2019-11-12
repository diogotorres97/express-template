# express-template

An opinionated template for an [Express](https://expressjs.com) based project, featuring a standardized structure, containerization, authentication, ORM, development utilities, etc.

## Getting Started

- [Features](#features)
- [Setup Project](#setup-project)
- [Architecture Overview](#architecture-overview)

## Features

### Main Features
- REST API template Web Application
  - [Express](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features to develop an api.
- [JWT](http://www.passportjs.org/packages/passport-jwt) Authentication
  - [Passport](http://www.passportjs.org/) - Passport is authentication middleware for Node.js. Easy to integrate in an Express-based web application.
- Database Connection w/ [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) and GUI 
  - [PostgreSQL](https://www.postgresql.org/) - PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.
  - [Sequelize](https://sequelize.org/) - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.
  - [pgAdmin](https://www.pgadmin.org/) - pgAdmin is the most popular and feature rich Open Source administration and development platform for PostgreSQL.
- Containerization
  - [Docker](https://www.docker.com/) - Docker containers wrap up software and its dependencies into a standardized unit for software development that includes everything it needs to run: code, runtime, system tools and libraries.
  - [(Docker) Compose](https://docs.docker.com/compose/) - Compose is a tool for defining and running multi-container Docker applications. We use Compose to run a Web Application, the postgreSQL database and the pgAdmin instance to interact with the database.

### Development Features

- Unit Tests Template w/ Coverage
  - [Chai](https://www.chaijs.com/) - Chai is a BDD/TDD assertion library for Node.js and the browser that can be paired with any Javascript testing framework. We use the [Should](https://www.chaijs.com/guide/styles/#should) style.
  - [Mocha](https://mochajs.org/) - Mocha is a JavaScript test framework running on Node.js and in the browser, making asynchronous simple. 
  - [nyc(Instabul's cli-client)](https://istanbul.js.org/) - Istanbul is a test coverage tool for ES5 and ES2015+ Javascript.
- Linting
  - [ESLint](https://eslint.org/) - Tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. We enforce the [Airbnb](https://github.com/airbnb/javascript) style.
- Hot Reloading
  - [nodemon](https://nodemon.io/) - Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

## Setup Project

* [Cloning Project](#cloning-project)
* [Prerequisites](#prerequisites)
* [Run Containers](#run-containers)
* [Setup pgAdmin](#setup-pgadmin)
* [Running Tests](#running-tests)
* [Running Linter](#running-linter)

### Cloning Project
```shell
$ git clone https://github.com/diogotorres97/express-template
$ cd express-template
```

### Prerequisites

To use the template, you need the following software installed (official instructions linked):
- [Docker](https://docs.docker.com/install/)
- [(Docker) Compose](https://docs.docker.com/compose/install/#install-compose)


**Note:** If you're using Linux, you might enconter permission errors while installing Docker. Try [this](https://docs.docker.com/install/linux/linux-postinstall/).

### Run Containers

Inside the repository's main directory, run:

```shell
$ docker-compose up
```

You should now be able to access:
- http://localhost:3000 - REST API instance
- http://localhost:5050 - pgAdmin instance

### Setup pgAdmin

When you access the pgAdmin instance for the first time, there will be no server connection. You must create one. When doing so, consult the docker-compose file (`docker-compose.yml`) to check the database configuration. An example connection creation:

<img src="https://i.imgur.com/zeK6HfM.png" width="400" height="400" alt="
A pgAdmin connection creation form, with the following fields and values:
Host name/address: template-psqldb, 
Port: 5432,
Maintenance database: template,
Username: user,
Password: *hidden*,
Save password: *checked*,
">

**Tip:** In pgAdmin, you can find the server's schemas at `Servers/<server-name>/Databases/<Maintenance-database-name>/Schemas/public/Tables`.


### Running Tests
  ```shell
   $ chmod +x test.sh # set executable permissions
   $ sh test.sh
   ```


### Running Linter
```shell
$ cd server
$ docker-compose run template-server sh
$ npm run lint # run linter
$ npm run lint:fix # run linter and fix errors
```

## Architecture Overview

### Repository structure

```
express-template/
\-- server
|   \-- src
|   |   \-- config
|   |   \-- controllers
|   |   \-- migrations
|   |   \-- models
|   |   \-- routes
|   |   \-- seeders
|   |   \-- services
|   |   \-- test
|   |   \-- utils
|   +-- Dockerfile
|   +-- package.json
```

### Main Sections Overview

| Section | Description | 
|:-:|:-|
| __Config__ | Definition of global variables independent to the application's context. Relevant for the setup of _CI / CD_.  |
| __Models__ | The models defined through _ORM_, hence representing the database schema.  |
| __Controllers__ | Handlers responsible for the manipulation of the respective Models. |
| __Migrations__ | Migrations are like version control for your database, allowing your team to easily modify and share the application's database schema. |
| __Routes__ | Where the mapping between the Controllers' functions and the actual URL endpoints are made. |
| __Seeders__ | Definition of an initial set of values used to populate the database. |
| __Services__ | Additional services such as _OAuth_, email integration, websockets, among others. |
| __Test__ | Definition of a set of files with the purpose of verifying that our server is working as it is supposed to. |
| __Utils__ | Definition of a set of utility functions that can be used across all afore-mentioned sections |

Other important files:

| File | Description |
|:-:|:-|
| __Dockerfile__| Text document that contains all the commands used to support the express framework. It's based on `node:11-alpine` and has some dependencies installed to support the `bcrypt` package. |
| __package.json__ | _JSON_ document that describes the behavior of the related npm-package. Defines some useful scripts used in this template but also the dependencies installed as well as their version. |

### Detailed View of Important Sections

#### Models

This template uses [__Sequelize__](https://sequelize.org), promise-based ORM for Node.js. It supports the dialects PostgreSQL, MySQL, MariaDB, SQLite, and MSSQL and features solid transaction support, relations, read replication and more. In this case, we use it with PostgreSQL.

When trying to define your models, it might be useful to check some of the Sequelize documentation, such as the [Datatypes](https://sequelize.org/v5/manual/data-types.html) or the [Associations](https://sequelize.org/v5/manual/associations.html).
