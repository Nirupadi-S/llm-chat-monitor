require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./database");

const {
  getAIResponse,
} = require("./services/openRouterService");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend Running",
  });
});

/* ==========================
   CONVERSATIONS
========================== */

// Create Conversation
app.post("/conversations", (req, res) => {
  const title =
    req.body.title ||
    `Chat ${Date.now()}`;

  db.run(
    "INSERT INTO conversations(title) VALUES(?)",
    [title],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        id: this.lastID,
        title,
      });
    }
  );
});

// Get Conversations
app.get("/conversations", (req, res) => {
  db.all(
    "SELECT * FROM conversations ORDER BY id DESC",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);
    }
  );
});

/* ==========================
   CONVERSATION MESSAGES
========================== */

app.get(
  "/messages/:conversationId",
  (req, res) => {

    const id =
      req.params.conversationId;

    db.all(
      `SELECT * FROM messages
       WHERE conversation_id=?
       ORDER BY id ASC`,
      [id],
      (err, rows) => {

        if (err) {
          return res
            .status(500)
            .json(err);
        }

        res.json(rows);
      }
    );
  }
);

/* ==========================
   ALL MESSAGES
========================== */

app.get("/messages", (req, res) => {
  db.all(
    "SELECT * FROM messages ORDER BY id ASC",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);
    }
  );
});

/* ==========================
   LOGS
========================== */

app.get("/logs", (req, res) => {
  db.all(
    "SELECT * FROM logs ORDER BY id DESC",
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);
    }
  );
});

/* ==========================
   CHAT
========================== */

app.post("/chat", async (req, res) => {
  const startTime = Date.now();

  try {

    const {
      message,
      conversationId
    } = req.body;

    db.run(
      `INSERT INTO messages
      (conversation_id,role,text)
      VALUES(?,?,?)`,
      [
        conversationId,
        "user",
        message
      ]
    );

    const reply =
      await getAIResponse(message);

    db.run(
      `INSERT INTO messages
      (conversation_id,role,text)
      VALUES(?,?,?)`,
      [
        conversationId,
        "bot",
        reply
      ]
    );

    const latency =
      Date.now() - startTime;

    db.run(
      `INSERT INTO logs
      (provider,model,latency,status)
      VALUES(?,?,?,?)`,
      [
        "OpenRouter",
        "openai/gpt-oss-20b:free",
        latency,
        "success",
      ]
    );

    res.json({
      reply,
    });

  } catch (error) {

    const latency =
      Date.now() - startTime;

    db.run(
      `INSERT INTO logs
      (provider,model,latency,status)
      VALUES(?,?,?,?)`,
      [
        "OpenRouter",
        "openai/gpt-oss-20b:free",
        latency,
        "failed",
      ]
    );

    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});