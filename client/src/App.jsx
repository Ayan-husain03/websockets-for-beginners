import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./style.css";

const socket = io("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const [AllMsg, setAllMsg] = useState([]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit("send-message", message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setAllMsg((prev) => [...prev, data]);
    });

    return () => socket.off("receive-message");
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-box">
        <h2 className="chat-title">Realtime Chat</h2>

        <div className="messages">
          {AllMsg.map((msg, i) => (
            <div key={i} className="message">
              {msg}
            </div>
          ))}
        </div>

        <form className="input-area" onSubmit={handleSend}>
          <input
            type="text"
            value={message}
            placeholder="Type a message..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
