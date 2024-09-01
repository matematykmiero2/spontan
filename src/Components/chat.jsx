import React, { useState, useEffect, useRef } from "react";
import Message from "./message";
import "./components.css";
import {
  getMessagesForEvent,
  getUserID,
  sendMessage,
  supabase,
} from "../functions";
const Chat = ({ eventId, name }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [id, setId] = useState();
  const messageListRef = useRef(null);
  useEffect(() => {
    async function fetchData() {
      const fetchedMessages = await getMessagesForEvent(eventId);

      if (Array.isArray(fetchedMessages)) {
        setMessages(fetchedMessages);
      } else {
        setMessages([]);
        console.error("Fetched messages is not an array:", fetchedMessages);
      }

      const userId = getUserID();
      setId(userId);
    }
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) =>
          setMessages((prevMessages) => [...prevMessages, payload.new])
      )
      .subscribe();
    fetchData();
  }, [eventId]);

  const handleSendMessage = async () => {
    const resp = await sendMessage(eventId, newMessage);
    if (resp === 200) {
      setNewMessage("");
    }
  };
  useEffect(() => {
    if (messageListRef.current) {
      console.log("new");
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="chat-container">
      <div className="chat-group">
        <p className="chat-title">{name}</p>
        <div className="message-list" ref={messageListRef}>
          {messages.length > 0 ? (
            messages.map((item) => (
              <Message
                key={item.id}
                timestamp={item.message_date ? item.message_date : item.date}
                sender={item.sender === id ? "Me" : item.sender_nickname}
                text={item.message}
              />
            ))
          ) : (
            <p>No messages yet</p>
          )}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="WAbutton" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
