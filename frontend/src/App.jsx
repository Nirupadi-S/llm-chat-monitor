import { useState, useEffect } from "react";
import axios from "axios";
import Logs from "./Logs";
import "./App.css";

const API_URL = "https://llm-chat-backend-0k8e.onrender.com";

function App() {
  const [showLogs, setShowLogs] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] =
    useState(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/conversations`
      );

      setConversations(response.data);

      if (
        response.data.length > 0 &&
        !selectedConversation
      ) {
        loadConversation(response.data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadConversation = async (conversationId) => {
    try {
      const response = await axios.get(
        `${API_URL}/messages/${conversationId}`
      );

      const formatted = response.data.map((msg) => ({
        role: msg.role,
        text: msg.text,
      }));

      setMessages(formatted);
      setSelectedConversation(conversationId);
      setShowLogs(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createConversation = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/conversations`,
        {
          title: `Chat ${Date.now()}`,
        }
      );

      fetchConversations();
      setMessages([]);
      setSelectedConversation(response.data.id);
      setShowLogs(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    if (!selectedConversation) {
      alert("Create a chat first");
      return;
    }

    const userMessage = {
      role: "user",
      text: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentMessage = message;
    setMessage("");

    try {
      const response = await axios.post(
        `${API_URL}/chat`,
        {
          message: currentMessage,
          conversationId: selectedConversation,
        }
      );

      const botMessage = {
        role: "bot",
        text: response.data.reply,
      };

      setMessages((prev) => [
        ...prev,
        botMessage,
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Backend Error",
        },
      ]);
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h2>Chats</h2>

        <button
          className="new-chat-btn"
          onClick={createConversation}
        >
          + New Chat
        </button>

        <button
          className="new-chat-btn"
          onClick={() => setShowLogs(true)}
          style={{ marginTop: "10px" }}
        >
          Logs Dashboard
        </button>

        <div>
          {conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() =>
                loadConversation(chat.id)
              }
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #ddd",
                background:
                  selectedConversation === chat.id
                    ? "#2d3748"
                    : "transparent",
                color:
                  selectedConversation === chat.id
                    ? "white"
                    : "inherit",
              }}
            >
              {chat.title}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-area">
        {showLogs ? (
          <Logs />
        ) : (
          <>
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.role}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="input-area">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
              />

              <button onClick={handleSend}>
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;