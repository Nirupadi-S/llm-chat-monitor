const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./chat.db", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("SQLite Connected");
  }
});

// Messages Table
db.run(`
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conversation_id INTEGER,
    role TEXT,
    text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

// Logs Table
db.run(`
CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    provider TEXT,
    model TEXT,
    latency INTEGER,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

// Conversations Table
db.run(`
CREATE TABLE IF NOT EXISTS conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

module.exports = db;