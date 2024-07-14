import React, { useEffect, useState } from "react";
import "../Components/components.css";
import Card from "../Components/eventTile";
import { getAllEvents } from "../functions";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchAndParseEvents() {
      setEvents(await getAllEvents());
    }

    fetchAndParseEvents();
  }, []);
  return (
    <>
      <div className="page">
        {events.map((event) => (
          <>
            <div onClick={() => navigate(`/event/${event.id}`)}>
              <Card
                location={`${event.city} ${event.street} ${event.number} ${event.apartment}`}
                name={event.name}
                description={event.description}
                date={event.date_time}
                photo={event.photo}
                categories={event.categories}
              />
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Home;
