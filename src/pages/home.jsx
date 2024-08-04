import React, { useEffect, useState } from "react";
import "../Components/components.css";
import EventList from "../Components/list";
import { getAllEvents, getUserID, getCoordinates } from "../functions";
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
    <>
      <div>
        <SearchBar />
        <div className="page">
          <EventList events={events} />
        </div>
      </div>
    </>
  );
};

export default Home;
