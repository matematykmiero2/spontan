import React, { useEffect, useState } from "react";
import "../Components/components.css";
import fullLogo from "../resources/fullLogo.svg";
import Box from "@mui/material/Box";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";
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
  changeLanguage,
} from "../functions";

import Switch from "@mui/material/Switch";
const Register = () => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [settings, setSettings] = useState();
  const [language, setLanguage] = useState("en");
  const [nickname, setNickname] = useState("");
  const handleLanguageChange = async (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    await changeLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);

    localStorage.setItem("lng", language);
  };
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
      const language = settings[0].language;
      if (language) {
        setLanguage(language);
      }
    }
    fetchLocations();
  }, []);
  return (
    <>
      {settings && (
        <div style={{ justifyContent: "center" }}>
          <div className="box">
            <Box noValidate sx={{ mt: 4 }}>
              <Typography>{t("Change Language")}:</Typography>
              <RadioGroup
                aria-label="language"
                name="language"
                value={language}
                onChange={handleLanguageChange}
                row
              >
                <FormControlLabel
                  value="en"
                  control={<Radio />}
                  label="English"
                />
                <FormControlLabel
                  value="pl"
                  control={<Radio />}
                  label="Polski"
                />
                <FormControlLabel
                  value="de"
                  control={<Radio />}
                  label="Deutsch"
                />
              </RadioGroup>
            </Box>
            <Box noValidate sx={{ mt: 2 }}>
              <TextField
                margin="dense"
                required
                fullWidth
                value={settings.nickname}
                id="nickname"
                label={t("Change nickname")}
                name="nickname"
                autoComplete="nickname"
                onChange={(event) => {
                  setNickname(event.target.value);
                }}
              />
              <div style={{ width: "100%" }}>
                <Button variant="contained" onClick={handleNickname}>
                  {t("Change nickname")}
                </Button>
              </div>
            </Box>

            <Box noValidate sx={{ mt: 2 }}>
              {t("Notifications")}
              <Switch
                defaultChecked={settings.notifications}
                onChange={handleNotification}
              >
                {t("Change password")}
              </Switch>
            </Box>
            <Box noValidate sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={async () => await updateInvitationLink()}
              >
                {" "}
                {t("Change invitation link")}
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
                {t("Change prefered categories")}
              </Button>
            </Box>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
