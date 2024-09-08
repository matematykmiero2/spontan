import React, { useEffect, useState } from "react";
import { getUserEvents } from "../functions";
import EventList from "../Components/list";
import Button from "@mui/material/Button";
import "../Components/components.css";
import { useNavigate } from "react-router-dom";
const Signed = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchAndParseEvents() {
      setEvents(await getUserEvents());
    }

    fetchAndParseEvents();
  }, []);
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/eventInvitations")}
        >
          Show event invitations
        </Button>
      </div>

      <div className="page" style={{ marginTop: "10px" }}>
        <EventList events={events} type={"signed"} />
      </div>
    </>
  );
};
export default Signed;
