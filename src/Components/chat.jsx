import React, { useState, useEffect } from "react";
import Message from "./message";
import "./components.css";
const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  return (
    <div className="chat-container">
      <div className="chat-group">
        <p className="chat-title">Event chat</p>
        <div className="message-list">
          <Message timestamp="17:45" sender="John" text="test" />
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="WAbutton">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
