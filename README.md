# room-booking-express API

A simple REST API system for students to book rooms for studying.

## Getting started

To get started with this project, use the following commands:

```bash
yarn install
yarn migrate
yarn seed
yarn start
```

## Creating new migrations

```bash
yarn knex migrate:make create_tables
```

Have a look at `/migrations` for inspiration. Then run:

```bash
yarn migrate
```

Did an error occur? Run this:

```bash
yarn knex migrate:rollback
```
