import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEvent, checkUserEvent } from "../functions";
import EventTabs from "../Components/eventTabs";
import "./event.css";
import Alert from "@mui/material/Alert";

const EventPage = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);

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
      } catch (error) {
        console.error("Failed to fetch event data:", error);
      }
    }

    fetchEventData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <>
      {isAvailable && event ? (
        <div className="eventPage">
          <EventTabs id={id} event={event} />
        </div>
      ) : (
        isAvailable === false &&
        event && (
          <>
            {" "}
            <Alert severity="error">
              You have no permission to see that event
            </Alert>
          </>
        )
      )}
    </>
  );
};

export default EventPage;
