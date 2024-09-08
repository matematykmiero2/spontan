import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../functions";
import Card from "../Components/eventPageTile";
import Chat from "../Components/chat";
import "../Components/components.css";
import EventTabs from "../Components/eventTabs";
import "./event.css";
const EventPage = () => {
  let { id } = useParams();

  const [event, setEvent] = useState(null);
  useEffect(() => {
    async function fetchAndParseEvent() {
      setEvent(await getEvent(id));
    }

    fetchAndParseEvent();
  }, []);

  return (
    <>
      <div className="eventPage">
        <EventTabs id={id} event={event} />
      </div>
    </>
  );
};

export default EventPage;
