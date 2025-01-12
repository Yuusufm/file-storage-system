const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });
const db = new sqlite3.Database('files.db');

app.use(cors());
app.use(express.json());


db.run(`
  CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    size INTEGER,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);


app.post('/upload', upload.single('file'), (req, res) => {
  const { file } = req;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  db.run(
    'INSERT INTO files (name, size) VALUES (?, ?)',
    [file.originalname, file.size],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save file info' });
      }
      res.json({ message: 'File uploaded successfully' });
    }
  );
});


app.get('/files', (req, res) => {
  db.all('SELECT * FROM files ORDER BY uploaded_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch files' });
    }
    res.json(rows);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 