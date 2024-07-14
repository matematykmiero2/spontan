import React from "react";
const Message = ({ timestamp, text, sender }) => {
  return (
    <div>
      <div className="message-sender">{sender}</div>
      <div className="message-text">{text}</div>
      <div className="message-timestamp">{timestamp?.toLocaleString()}</div>
    </div>
  );
};

export default Message;
