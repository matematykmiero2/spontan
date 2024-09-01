import React from "react";
import "./message.css";

const Message = ({ timestamp, text, sender }) => {
  const isCurrentUser = sender === "Me";

  return (
    <div className={`message-container ${isCurrentUser ? "current-user" : ""}`}>
      <div className="message-content">
        <div className="message-sender">{sender}</div>
        <div className="message-text">{text}</div>
        <div className="message-timestamp">
          {new Date(timestamp).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default Message;
