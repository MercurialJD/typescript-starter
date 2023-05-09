<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is a [Nest](https://github.com/nestjs/nest) framework Feature Enhancement Assignment. This assignment implements a new feature to manage a collection of tasks, each task has the following properties:

- `id`: unique identifier, auto-generated
- `title`: string, required
- `description`: string, optional
- `status`: enum, required: ['TODO', 'IN_PROGRESS', 'COMPLETED']
- `createdAt`: date, auto-generated
- `updatedAt`: date, auto-generated

This assignment implements the following operations:
- Create a new task (POST)
- Retrieve a task by its `id` (GET)
- Delete a task by its `id` (DELETE)

## Files

The folder `src/tasks` contains implementation and unit tests for the new module `TasksModule`, which contains the following files:
- The file `tasks.entity.ts` defines `Task` and `TaskStatus`.
- The file `tasks.controller.ts` validates the parameters and implements routing for the 3 RESTful APIs (POST, GET, DELETE).
- The file `tasks.service.ts` implements logics for task storage and query.
- The file `tasks.controller.spec.ts` contains unit tests for the controller, implemented with Jest.
- The file `tasks.service.spec.ts` contains unit tests for the provider, implemented with Jest.

The E2E tests are placed under the `test` folder, which connects to a PostgreSQL database and runs E2E tests automatically.

## Prerequisites
1. Install the PostgreSQL, create a database called "Tasks".
2. Install Node.js and npm.
3. Install the Nest.js CLI.
4. Tools to test the APIs, e.g. Postman.

## Assignment Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# unit tests coverage
$ npm run test:cov

# e2e tests
$ npm run test:e2e

# e2e tests coverage
$ npm run test:e2e:cov
```
**Note:**
1. When checking the coverage for unit tests, it would complain about `*.module.ts`, but was suggested to ignore them and test those files in the E2E tests.
2. When checking the coverage for E2E tests, line 5 of `tasks.entity.ts` was marked as uncovered. That was an imported decorator, seems unnecessary to write tests specifically for it.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch
- This assignment
  - Author - [Junda Shen](https://shenjunda.com)
- Original framework
  - Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
  - Website - [https://nestjs.com](https://nestjs.com/)
  - Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
