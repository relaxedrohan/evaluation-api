# Evaluation API Documentation

## Overview

This documentation provides information about the Evaluation API, which serves as a Backend Developer Task. The API is built with Node.js and TypeScript and uses various tools and libraries for development, testing, and deployment.

## Prerequisites

-   Node.js installed on your system. version is mentioned in package.json (key:engines)
-   Yarn package manager installed globally.

## Installation

1. Clone the repository from [GitHub](git@github.com:relaxedrohan/evaluation-api.git).
2. Navigate to the project directory.
3. Run `yarn` to install dependencies.

## Scripts

Before running `yarn docker:build`, make sure you've changed `example.env` to `.env`.

The following scripts are available for development, testing, and containerization:

-   `build`: TypeScript compilation.
-   `db`: Generates Prisma client.
-   `dev`: Starts the development server with nodemon.
-   `inspect`: Starts the server in debugging mode.
-   `start`: Starts the server in production mode.
-   `docker:up`: Starts Docker containers.
-   `docker:build`: Builds Docker containers.
-   `test:server:up`: Starts test server with Docker.
-   `test:e2e`: Runs end-to-end tests with Jest.
-   `lint`: Lints TypeScript files.
-   `lint:fix`: Fixes linting issues automatically.
-   `format`: Formats code with Prettier.
-   `prepare`: Executes Husky hooks for pre-commit linting.
-   `prisma:migrate`: Deploys Prisma migrations.
-   `prisma:migrate:dev`: Runs Prisma migrations in development environment.
-   `prisma:migrate:prod`: Deploys Prisma migrations in production environment.
-   `prisma:generate`: Generates Prisma client.
-   `prisma:db:push`: Pushes changes to the database.
-   `prisma:introspect`: Introspects database schema with Prisma.
-   `prisma:studio`: Opens Prisma Studio for database management.
-   `db:populate`: Populates database with sample data.
-   `benchmark`: Runs benchmark tests.

## Dependencies

-   `@prisma/client`: Prisma ORM for database operations.
-   `autocannon`: HTTP benchmarking tool.
-   `axios`: HTTP client for making requests.
-   `bcrypt`: Library for hashing passwords.
-   `bullmq`: Redis-backed job queue.
-   `class-transformer`: Library for object transformation.
-   `class-validator`: Library for validation.
-   `dotenv`: Library for loading environment variables.
-   `express`: Web framework for Node.js.
-   `jsonwebtoken`: Library for JSON Web Tokens.
-   `reflect-metadata`: Library for metadata reflection.

## Dev Dependencies

-   `eslint`: Linter for JavaScript and TypeScript.
-   `jest`: Testing framework.
-   `nodemon`: Utility for automatically restarting the server.
-   `prettier`: Code formatter.
-   `husky`: Git hooks manager.
-   `lint-staged`: Executes linters on staged files.
-   `ts-node`: TypeScript execution and REPL for Node.js.
-   `typescript`: TypeScript language compiler.

## Testing

-   End-to-end tests are performed with Jest. Before running `yarn test:e2e` make sure you've another terminal running `yarn test:server:up` and test server is up and running.

## Contact

For any inquiries or issues, please contact Rohan Yadav at rohanyadavdec@gmail.com.
