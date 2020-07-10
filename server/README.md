# Server

> Some instructions on to how to run the server

## Requirements

- NodeJS LTS
- Yarn
- MongoDB

## Environment Variables

```bash
$ cp .env.example .env
```

Provide some information in this `env` file.


## Starting the server

### Download dependencies

```bash
$ yarn
```

### Start express
 
for development:

```bash
$ yarn dev
```

### Scripts

```bash
$ yarn update-schema
```

This will update the graphql.schema on both server and web side