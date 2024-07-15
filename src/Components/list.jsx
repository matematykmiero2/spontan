import React from "react";
import Card from "./eventTile";
import "./components.css";

const EventList = ({ events, type }) => {
  return (
    <div className="list" style={{ paddingBottom: "100px" }}>
      {events.map((event) => (
        <Card
          location={`${event.city} ${event.street} ${event.number} ${event.apartment}`}
          name={event.name}
          description={event.description}
          date={event.date_time}
          photo={event.photo}
          categories={event.categories}
          id={event.id}
          type={type}
        />
      ))}
    </div>
  );
};

export default EventList;
