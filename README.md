# Semana 2 Taller 1: API REST con node.js y SQLite3

## Run

```bash
npm install
npm start
```

The API runs on port `3000` by default. Set `PORT` if you want another port.

## Fix for AWS Cloud9 / Ubuntu 22

If you see an error like `GLIBC_2.38 not found` while loading `sqlite3`, the issue is the native SQLite3 binary, not the app code. This usually happens when `node_modules` was installed on a different machine or when the prebuilt binary does not match the VM's glibc version.

Use these steps on the VM where you want to run the app:

```bash
sudo apt update
sudo apt install -y build-essential python3 make g++
rm -rf node_modules
npm install
npm run rebuild:sqlite3
npm start
```

If you copied the project from your local PC, do not copy `node_modules`. Install dependencies directly on the AWS VM so `sqlite3` is compiled for that environment.

## Routes

- `GET /health`
- `GET /items`
- `GET /items/:id`
- `PATCH /items/:id`
- `POST /items` with JSON body `{ "name": "Test" }`
- `DELETE /items/:id`

## Quick test

```bash
curl http://localhost:3000/health
curl -X POST http://localhost:3000/items -H 'Content-Type: application/json' -d '{"name":"demo"}'
curl http://localhost:3000/items
```

SQLite creates `app.db` automatically on first run.

## Notes

- Keep `package-lock.json` in the repository so dependency versions stay consistent.
- If the native module is still failing after reinstalling, repeat the install step on the same machine where the app will run.

