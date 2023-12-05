const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());


// Create a new database instance
let db = new sqlite3.Database('./times.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run('CREATE TABLE IF NOT EXISTS times (name TEXT, time INTEGER)', (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Table created or already exists.');
      }
    });
  }
});

// POST endpoint to add new time
app.post('/post-time', (req, res) => {
  const { name, time } = req.body;
  db.run('INSERT INTO times (name, time) VALUES (?, ?)', [name, time], function(err) {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(201).send({ message: 'Time added successfully', id: this.lastID });
    }
  });
});

// GET endpoint to retrieve all times
app.get('/get-times', (req, res) => {
  db.all('SELECT name, SUM(time) as total_time, MAX(time) as max_time, MIN(time) as min_time, COUNT(time) as total_times FROM times GROUP BY name', [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send(rows);
    }
  });
});

// Start the Express server
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
