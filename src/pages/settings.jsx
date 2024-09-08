import React, { useEffect, useState } from "react";
import "../Components/components.css";
import fullLogo from "../resources/fullLogo.svg";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Multiselect from "../Components/multiselect";
import {
  getUserSettings,
  updateInvitationLink,
  updateNickname,
  updateNotifications,
  getAllCategories,
  updateUserCategories,
} from "../functions";
import Switch from "@mui/material/Switch";
const Register = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [settings, setSettings] = useState();

  const [nickname, setNickname] = useState("");

  const handleNickname = async () => {
    if (nickname.length > 2) {
      await updateNickname(nickname);
    }
  };
  const handleNotification = async () => {
    const newValue = !settings.notifications;
    settings.notifications = newValue;
    await updateNotifications(newValue);
  };
  const handleCategories = async () => {
    await updateUserCategories(selectedCategories);
  };
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchLocations() {
      const categories = await getAllCategories();
      setCategories(categories);
      const settings = await getUserSettings();
      setSettings(settings[0]);
      setSelectedCategories(settings[0].categories);
    }
    fetchLocations();
  }, []);
  return (
    <>
      {settings && (
        <div style={{ justifyContent: "center" }}>
          <div className="box">
            <Box noValidate sx={{ mt: 2 }}>
              <TextField
                margin="dense"
                required
                fullWidth
                value={settings.nickname}
                id="nickname"
                label="Change nickname"
                name="nickname"
                autoComplete="nickname"
                onChange={(event) => {
                  setNickname(event.target.value);
                }}
              />
              <div style={{ width: "100%" }}>
                <Button variant="contained" onClick={handleNickname}>
                  Change nickname
                </Button>
              </div>
            </Box>

            <Box noValidate sx={{ mt: 2 }}>
              Notifications
              <Switch
                defaultChecked={settings.notifications}
                onChange={handleNotification}
              >
                Change password
              </Switch>
            </Box>
            <Box noValidate sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={async () => await updateInvitationLink()}
              >
                {" "}
                Change invitation link
              </Button>
            </Box>
            <Box noValidate sx={{ mt: 2 }}>
              <Multiselect
                categories={categories}
                selectedCategories={selectedCategories}
                selectCategory={setSelectedCategories}
              />
              <Button variant="contained" onClick={handleCategories}>
                {" "}
                Change prefered categories
              </Button>
            </Box>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
