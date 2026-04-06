# Semana 2 Taller 1: API REST con node.js y SQLite3

## Run

```bash
npm install
npm start
```

The API runs on port `3000` by default. Set `PORT` if you want another port.

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

