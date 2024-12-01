import React from "react";
import "./message.css";
import LinearProgress from "@mui/material/LinearProgress";
const Message = ({ timestamp, text, sender, newMessage }) => {
  const isCurrentUser = sender === "Me";

  return (
    <div className={`message-container ${isCurrentUser ? "current-user" : ""}`}>
      <div
        className="message-content"
        style={newMessage ? { background: "#f7ffd1" } : {}}
      >
        <div className="message-sender">{sender}</div>
        <div className="message-text">{text}</div>
        {!newMessage ? (
          <div className="message-timestamp">
            {new Date(timestamp).toLocaleString()}
          </div>
        ) : (
          <div
            className="message-timestamp"
            style={{ width: "100%", height: "10px" }}
          >
            <LinearProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
