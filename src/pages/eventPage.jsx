import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEvent, checkUserEvent, getUserID } from "../functions";
import Card from "../Components/eventPageTile";
import Chat from "../Components/chat";
import "../Components/components.css";
import EventTabs from "../Components/eventTabs";
import Alert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
import "./event.css";
const EventPage = () => {
  const { t } = useTranslation();
  let { id } = useParams();
  const [isAvailable, setIsAvailable] = useState(false);
  const [event, setEvent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  async function fetchAndParseEvent() {
    setIsVisible(false);
    const fetchedEvent = await getEvent(id);
    setEvent(fetchedEvent);

    if (fetchedEvent) {
      setTimeout(() => {
        setIsVisible(true);
      }, 50);
    }
  }
  async function fetchEventData() {
    let isMounted = true;
    try {
      const available = await checkUserEvent(id);
      if (isMounted) {
        setIsAvailable(available || event.organizer_id === getUserID());
      }

      if (available) {
        const eventData = await getEvent(id);
        if (isMounted) {
          setEvent(eventData);
        }
      }
    } catch (error) {}
    return () => {
      isMounted = false;
    };
  }
  useEffect(() => {
    fetchAndParseEvent();
  }, [id]);
  useEffect(() => {
    fetchEventData();
  }, [id]);
  return (
    <>
      {(event && isAvailable) ||
      (event && event.organizer_id === getUserID()) ? (
        <div className={`eventPage ${isVisible ? "visible" : ""}`}>
          <EventTabs id={id} event={event} />
        </div>
      ) : event &&
        isAvailable === false &&
        event.organizer_id !== getUserID() &&
        !event.public ? (
        <>
          {" "}
          <Alert severity="error">
            {t("You have no permission to see that event")}
          </Alert>
        </>
      ) : (
        event &&
        isAvailable === false &&
        event.organizer_id !== getUserID() &&
        event.public && (
          <div className="page">
            <Card
              location={`${event.city} ${event.street} ${event.number} ${event.apartment}`}
              name={event.name}
              description={event.description}
              date={event.date_time}
              photo={event.photo}
              first_name={event.first_name}
              last_name={event.last_name}
              nickname={event.organizer_nickname}
              price={event.price}
              duration={event.duration}
              categories={event.categories}
              id={id}
              unsigned={true}
              refresh={fetchEventData}
            />
          </div>
        )
      )}
    </>
  );
};

export default EventPage;
