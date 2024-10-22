import React, { useEffect, useState } from "react";
import { getUserEvents } from "../functions";
import EventList from "../Components/list"; // Note: This import is unused
import Button from "@mui/material/Button";
import "../Components/components.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Calendar from "../Components/calendar";

const Signed = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAndParseEvents() {
      setEvents(await getUserEvents());
    }

    fetchAndParseEvents();
  }, []);

  return (
    <div className="page">
      <div>
        <Button
          variant="contained"
          onClick={() => navigate("/eventInvitations")}
        >
          {t("Show event invitations")}
        </Button>
      </div>
      <div
        style={{
          width: "90vw",
          paddingInline: "2vw",
          marginBlockStart: "-100px",
        }}
      >
        <Calendar signed={events} />
      </div>
    </div>
  );
};

export default Signed;
