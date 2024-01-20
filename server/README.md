# server

## Install

### Requirements

- Bun (Runtime)
- Turso (Database)
- Firebase (Storage)

### Running

1. Install the dependencies

```sh
bun i
```

2. Create a database with Turso

```sh
turso db create $YOUR_DB_NAME
```

3. Get the auth token

```sh
turso db tokens create $YOUR_DB_NAME
```

4. Create a firebase app through their dashboard

```sh
echo "No instructions. :p"
```

5. Create a `.env` file with the credentials

```sh
cp .env.example .env
```

6. Fill in the credentials on the `.env`

```sh
DATABASE_URL=""
DATABASE_AUTH_TOKEN=""
FIREBASE_API_KEY=""
FIREBASE_AUTH_DOMAIN=""
FIREBASE_PROJECT_ID=""
FIREBASE_STORAGE_BUCKET=""
FIREBASE_MESSAGING_SENDER_ID=""
FIREBASE_APP_ID=""
FIREBASE_MEASUREMENT_ID=""
```

7. Migrate the database

```sh
bun kit push:sqlite
```

8. Run the server

```
bun run dev
```

> Done, thats it!
