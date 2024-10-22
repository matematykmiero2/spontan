import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyBigCalendar = ({ signed }) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const transformedEvents = signed.map((event) => {
      const dateTimeString = `${event.date} ${event.start_time}`;
      const dateTime = moment(dateTimeString);
      return {
        start: dateTime.toDate(),
        end: dateTime.add(event.duration, "hours").toDate(),
        title: event.name,
        link: `/#/event/${event.id}`,
      };
    });

    setEvents(transformedEvents);
  }, [signed]);
  const handleEventClick = (event) => {
    window.location.href = event.link;
  };
  const EventLink = ({ event }) => (
    <a href={event.link} style={{ color: "inherit" }}>
      {event.title}
    </a>
  );
  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={handleEventClick}
        components={{
          event: EventLink,
        }}
      />
    </div>
  );
};

export default MyBigCalendar;
