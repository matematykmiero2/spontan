import React, { useEffect, useRef, useState } from "react";
import "../Components/components.css";
import EventList from "../Components/list";
import { getAllEvents, search, getUserCategories } from "../functions";
import SearchIcon from "@mui/icons-material/Search";
import "../Components/searchbar.css";
import { IconButton } from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";
import { useTranslation } from "react-i18next";
import SearchBar from "../Components/searchBar";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    async function fetchAndParseEvents() {
      const fetchedEvents = await getAllEvents();
      const categories = await getUserCategories();

      if (!categories || categories.length === 0) {
        setEvents(fetchedEvents);
        return;
      }
      if (!fetchedEvents || fetchedEvents.length === 0) {
        setEvents([]);
        return;
      }
      setUserCategories(categories);
      setEvents(fetchedEvents);

      const sortedEvents = fetchedEvents.sort((eventA, eventB) => {
        const matchCountA = eventA.categories
          ? eventA.categories.filter((category) =>
              categories.some(
                (userCategory) => userCategory.category_name === category
              )
            ).length
          : 0;

        const matchCountB = eventB.categories
          ? eventB.categories.filter((category) =>
              categories.some(
                (userCategory) => userCategory.category_name === category
              )
            ).length
          : 0;

        return matchCountB - matchCountA;
      });

      setEvents(sortedEvents);
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
