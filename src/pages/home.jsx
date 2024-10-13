import React, { useEffect, useRef, useState } from "react";
import "../Components/components.css";
import EventList from "../Components/list";
import { getAllEvents, search } from "../functions";
import SearchIcon from "@mui/icons-material/Search";
import "../Components/searchbar.css";
import { IconButton } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useTranslation } from "react-i18next";
import SearchBar from "../Components/searchBar";

const Home = () => {
  const [events, setEvents] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    async function fetchAndParseEvents() {
      const fetchedEvents = await getAllEvents();
      setEvents(fetchedEvents);
    }

    fetchAndParseEvents();

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);

  const handleSearch = async () => {
    const query = inputRef.current.value;
    if (query.length > 0) {
      setEvents(await search(query));
    }
  };

  return (
    <>
      <div>
        <SearchBar
          onSearch={handleSearch}
          inputRef={inputRef}
          setEvents={setEvents}
        />
        <div className="page">{<EventList events={events} />}</div>
      </div>
    </>
  );
};

export default Home;
