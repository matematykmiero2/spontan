import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEvent, checkUserEvent } from "../functions";
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
  useEffect(() => {
    async function fetchAndParseEvent() {
      const fetchedEvent = await getEvent(id);
      setEvent(fetchedEvent);

      if (fetchedEvent) {
        setTimeout(() => {
          setIsVisible(true);
        }, 50);
      }
    }

    fetchAndParseEvent();
  }, [id]);
  useEffect(() => {
    let isMounted = true;

    async function fetchEventData() {
      try {
        const available = await checkUserEvent(id);
        if (isMounted) {
          setIsAvailable(available);
        }

        if (available) {
          const eventData = await getEvent(id);
          if (isMounted) {
            setEvent(eventData);
          }
        }
      } catch (error) {}
    }

    fetchEventData();

    return () => {
      isMounted = false;
    };
  }, [id]);
  return (
    <>
      {event && isAvailable ? (
        <div className={`eventPage ${isVisible ? "visible" : ""}`}>
          <EventTabs id={id} event={event} />
        </div>
      ) : (
        isAvailable === false &&
        event && (
          <>
            {" "}
            <Alert severity="error">
              {t("You have no permission to see that event")}
            </Alert>
          </>
        )
      )}
    </>
  );
};

export default EventPage;
