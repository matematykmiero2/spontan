import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../functions";
import Card from "../Components/eventPageTile";
import Chat from "../Components/chat";
import "../Components/components.css";
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
      <div>
        {event !== null ? (
          <div className="page">
            <Card
              location={`${event.city} ${event.street} ${event.number} ${event.apartment}`}
              name={event.name}
              description={event.description}
              date={event.date_time}
              photo={event.photo}
              first_name={event.first_name}
              last_name={event.last_name}
              nickname={event.nickname}
              price={event.price}
              duration={event.duration}
              categories={event.categories}
              id={id}
            />
            <Chat></Chat>
          </div>
        ) : (
          <p>Loading ...</p>
        )}
      </div>
    </>
  );
};

export default EventPage;
