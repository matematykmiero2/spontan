import React, { useEffect, useState } from "react";
import { getUserEvents } from "../functions";
import EventList from "../Components/list";
import "../Components/components.css";
const Signed = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    async function fetchAndParseEvents() {
      setEvents(await getUserEvents());
    }

    fetchAndParseEvents();
  }, []);
  return (
    <>
      <div className="page">
        <EventList events={events} type={"signed"} />
      </div>
    </>
  );
};
export default Signed;
