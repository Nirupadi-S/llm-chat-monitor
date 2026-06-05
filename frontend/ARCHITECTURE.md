# Architecture Notes

## Ingestion Flow

User sends a message from the React frontend.

The backend receives the request through the `/chat` endpoint.

The request is forwarded to the LLM wrapper service (`openRouterService.js`).

The wrapper invokes the OpenRouter API and measures inference latency.

After the response is received, metadata is extracted and stored in SQLite.

The response is returned to the frontend.

---

## Logging Strategy

Each inference generates a log entry containing:

* Provider
* Model
* Latency
* Status
* Timestamp

Logs are stored in the `logs` table and displayed in the Logs Dashboard.

---

## Database Design

### conversations

Stores chat sessions.

### messages

Stores user and AI messages.

### logs

Stores inference monitoring data.

---

## Scaling Considerations

For larger workloads:

* Replace SQLite with PostgreSQL
* Add a message queue
* Separate ingestion and inference services
* Add caching

---

## Failure Handling

Failed requests are captured in the logs table.

The frontend displays an error message while preserving chat history.
