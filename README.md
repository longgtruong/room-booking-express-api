# room-booking-express API

A simple REST API system for students to book rooms for studying.

## Getting started

To get started with this project, use the following commands:

```bash
yarn install
yarn migrate
yarn seed # inserting some hard-coded rooms to the system
yarn start
```

## Creating new migrations

```bash
npx knex migrate:make create_tables
```

Have a look at `/migrations` for inspiration. Then run:

```bash
yarn migrate
```

Did an error occur? Run this:

```bash
yarn knex migrate:rollback
```


## Creating new seeds

```bash
npx knex seeds:make 001-rooms
# use number to indicate which seeds to run first
```

Have a look at `/seeds` for inspiration. Then run:

```bash
yarn seed
```

