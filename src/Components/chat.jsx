import React, { useState, useEffect, useRef } from "react";
import Message from "./message";
import "./components.css";
import {
  getMessagesForEvent,
  getUserID,
  sendMessage,
  supabase,
} from "../functions";
import { useTranslation } from "react-i18next";
const Chat = ({ eventId, name }) => {
  const { t } = useTranslation();
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
          filter: `event_id=eq.${eventId}`,
        },
        async (payload) => {
          //console.log(payload);

          await fetchData();
        }
      )
      .subscribe();
    fetchData();
  }, [eventId]);

  const handleSendMessage = async () => {
    if (newMessage.length < 1) return;
    //console.log(messages);
    const newMes = {
      message_id: new Date().toISOString(),
      message_date: new Date().toISOString(),
      event_id: eventId,
      sender: id,
      message: newMessage,
      new: true,
    };
    //console.log("newMes", newMes);
    const actualized = [...messages, newMes];
    //console.log(actualized);
    setMessages(actualized);
    const resp = await sendMessage(eventId, newMessage);
    if (resp === 200) {
      setNewMessage("");
    }
  };
  useEffect(() => {
    if (messageListRef.current) {
      ////console.log("new");
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
                newMessage={item.new}
              />
            ))
          ) : (
            <p>{t("No messages yet")}</p>
          )}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder={t("Type your message...")}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="WAbutton" onClick={handleSendMessage}>
            {t("Send")}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
