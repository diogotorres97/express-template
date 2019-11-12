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
- JWT Authentication
  - [Passport](http://www.passportjs.org/) - Passport is authentication middleware for Node.js. Easy to integrate in an Express-based web application.
- Database Connection w/ [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping) and GUI 
  - [PostgreSQL](https://www.postgresql.org/) - PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.
  - [Sequelize](https://sequelize.org/) - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.
  - [pgAdmin](https://www.pgadmin.org/) - pgAdmin is the most popular and feature rich Open Source administration and development platform for PostgreSQL.
- Containerization
  - [Docker](Docker) - Docker containers wrap up software and its dependencies into a standardized unit for software development that includes everything it needs to run: code, runtime, system tools and libraries.
  - [[Docker] Compose] - Compose is a tool for defining and running multi-container Docker applications. We use Compose to run a Web Application, the postgreSQL database and the pgadmin instance to interact with the database.

### Development Features

- Unit Tests Template w/ Coverage
  - [Chai](https://www.chaijs.com/) - Chai is a BDD/TDD assertion library for Node.js and the browser that can be paired with any Javascript testing framework. We use the [Should](https://www.chaijs.com/guide/styles/#should) style.
  - [Mocha](https://mochajs.org/) - Mocha is a JavaScript test framework running on Node.js and in the browser, making asynchronous simple. 
  - [nyc(Instabul's cli-client)](https://istanbul.js.org/) - Istanbul is a test coveerage tool for ES5 and ES2015+ Javascript.
- Linting
  - [ESLint](https://eslint.org/) - Tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. We enformce the [Airbnb] style.
- Hot Reloading
  - [nodemon](https://nodemon.io/) - Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

## Setup Project

* [Cloning Project](#cloning-project)
* [Installing Docker and Docker Compose](#installing-docker-and-docker-compose)
* [Configured containers](#configured-containers)
* [Setup pgAdmin](#setup-pgadmin)
* [How to run the tests](#how-to-run-the-tests)
* [How to run the linter](#how-to-run-the-linter)

### Cloning Project
```shell
$ git clone https://github.com/diogotorres97/expressjs-template
$ cd expressjs-template
```

### Installing Docker and Docker Compose

Before starting you'll need to have __Docker__ and __Docker Compose__ installed on your PC.
The official instructions are in [Install Docker](https://docs.docker.com/install/) and in [Install Docker Compose](https://docs.docker.com/compose/install/#install-compose).

Note: If you are getting permission error one the docker run hello-world or if you get a warning ".docker/config.json: permission denied run..." follow [this instructions](https://docs.docker.com/install/linux/linux-postinstall/).

### Configured containers

__To start the environment__ :

```shell
$ docker-compose up
```

Access to:
- `http://localhost:3000` -> to access the server
- `http://localhost:5050` -> to access pgadmin to interact with database

### Setup pgAdmin

Notice that there is not yet a server created, so when you access the pgadmin interface you must create a new one. When doing so, consult the docker-compose file (`docker-compose.yml`) to see the database configuration. To ease your creation of the server, the example below is given:

<img src="https://i.imgur.com/zeK6HfM.png" width="400" height="400">

To access your server schemas navigate to `Servers/<server-name>/Databases/<Maintenance-database-name>/Schemas/public/Tables`.


### How to run the tests
  ```shell
   $ chmod +x test.sh # set executable permissions
   $ sh test.sh
   ```


### How to run the linter
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
| __Dockerfile__| Text document that contains all the commands a user could call on the command line to assemble a docker image. |
| __package.json__ | _JSON_ document that describes the behavior of the related npm-package. Defines some standard information regarding it, as well as useful scripts. |

### Detailed View of Important Sections

#### Models

This template uses [__Sequelize__](https://sequelize.org), promise-based ORM for Node.js. It supports the dialects PostgreSQL, MySQL, MariaDB, SQLite, and MSSQL and features solid transaction support, relations, read replication and more. In this case, we use it with PostgreSQL.

When trying to define your models, it might be useful to check some of the Sequelize documentation, such as the [Datatypes](https://sequelize.org/v5/manual/data-types.html) or the [Associations](https://sequelize.org/v5/manual/associations.html).
