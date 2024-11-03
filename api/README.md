# Prerequisites
* [SurrealDB version 2.0.4](https://surrealdb.com/docs/surrealdb/installation)
* [Bun](https://bun.sh/docs/installation)

# Installation

Install the dependencies
```bash
bun install
```

Create .env file (or you can just set the environment variables in your shell)
* DB_PRIVATE_URL - The URL/URI of the SurrealDB instance
* DB_NAMESPACE - The namespace of the DB
* DB_DATABASE - The database within the `DB_NAMESPACE`
* DB_USER - The user account to sign in with
* DB_PASSWORD - The password of the `DB_USER` to sign in with
* JWT_SECRET - Your JWT secret used for encoding access tokens

Example:
```
DB_PRIVATE_URL="ws:localhost:8000"
DB_NAMESPACE="db"
DB_DATABASE="db"
DB_USER="root"
DB_PASSWORD="root"
JWT_SECRET="secret"
```

# Running

For development:
```bash
bun run dev
```

For production:
```bash
bun run clean:build
bun run build
bun run start
```
