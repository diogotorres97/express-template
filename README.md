# express-template

An opinionated template for an [Express](https://expressjs.com) based project, featuring a standardized structure, containerization, authentication, ORM, development utilities, etc.

## Getting Started

- [Features](#features)
- [Setup Project](#setup-project)
- [Architecture Overview](#architecture-overview)

## Features

[I WOULD REWRITE THIS]
Expressjs + Passportjs + JWT + Postgres + Pgadmin + Docker

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

Notice that there is not yet a server created, so when you access the pgadmin interface you must create a new one. When doing so, do not forget to consult the docker-compose file (`docker-compose.yml`). To ease your creation of the server, the example below is given:

<img src="https://i.imgur.com/zeK6HfM.png" width="400" height="400">

To access the your server schemas navigate to `Servers/<server-name>/Databases/<Maintenance-database-name>/Schemas/public/Tables`.


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
