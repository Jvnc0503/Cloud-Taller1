const express = require('express');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get all items
app.get('/items', (req, res) => {
  db.all('SELECT * FROM items ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Get item by ID
app.get('/items/:id', (req, res) => {
  db.get('SELECT * FROM items WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(row);
  });
});

// Update item by ID
app.patch('/items/:id', (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'name is required' });
  }

  db.run('UPDATE items SET name = ? WHERE id = ?', [name.trim(), req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    db.get('SELECT * FROM items WHERE id = ?', [req.params.id], (selectErr, row) => {
      if (selectErr) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(row);
    });
  });
});

// Create new item
app.post('/items', (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'name is required' });
  }

  db.run('INSERT INTO items (name) VALUES (?)', [name.trim()], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    db.get('SELECT * FROM items WHERE id = ?', [this.lastID], (selectErr, row) => {
      if (selectErr) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json(row);
    });
  });
});

// Delete item by ID
app.delete('/items/:id', (req, res) => {
  db.run('DELETE FROM items WHERE id = ?', [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(204).send();
  });
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
