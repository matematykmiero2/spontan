import React from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from ".././functions";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import LoadPhoto from "../Components/loadPhoto";
import SettingsIcon from "@mui/icons-material/Settings";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { useTranslation } from "react-i18next";
const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const Logout = async () => {
    await signOut();
    window.location.reload();
  };
  return (
    <>
      <Stack spacing={2}>
        <Button
          onClick={() => navigate("/create")}
          variant="contained"
          endIcon={<AddIcon />}
        >
          {t("Create event")}
        </Button>
        <Button
          onClick={() => navigate("/manageEvents")}
          variant="contained"
          endIcon={<EditCalendarIcon />}
        >
          {t("Manage events")}
        </Button>
        <Button
          onClick={() => navigate("/settings")}
          variant="contained"
          endIcon={<SettingsIcon />}
        >
          {t("Settings")}
        </Button>

        <Button onClick={Logout} variant="contained" endIcon={<LogoutIcon />}>
          {t("Log out")}
        </Button>
      </Stack>
    </>
  );
};
export default Profile;
