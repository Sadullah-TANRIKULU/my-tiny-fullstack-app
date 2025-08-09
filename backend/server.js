const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Get all records
app.get('/entries', async (req, res) => {
  const result = await pool.query('SELECT * FROM entries ORDER BY id');
  res.json(result.rows);
});

// Create new record
app.post('/create', async (req, res) => {
  const { content } = req.body;
  await pool.query('INSERT INTO entries(content) VALUES($1)', [content]);
  res.json({ status: 'created' });
});

// Delete last record
app.delete('/delete', async (req, res) => {
  await pool.query(`DELETE FROM entries WHERE id = (
      SELECT id FROM entries ORDER BY id DESC LIMIT 1
  )`);
  res.json({ status: 'deleted' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
