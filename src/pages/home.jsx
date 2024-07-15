import React, { useEffect, useState } from "react";
import "../Components/components.css";
import EventList from "../Components/list";
import { getAllEvents } from "../functions";
import SearchBar from "../Components/searchBar";
const Home = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    async function fetchAndParseEvents() {
      setEvents(await getAllEvents());
    }

    fetchAndParseEvents();
  }, []);
  return (
    <div className="page">
      <SearchBar />
      <EventList events={events} />
    </div>
  );
};

export default Home;
