import React, { useEffect, useState } from "react";
import "../Components/components.css";
import fullLogo from "../resources/fullLogo.svg";
import Box from "@mui/material/Box";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Switch,
} from "@mui/material";
import { useTranslation } from "react-i18next";
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

const Register = () => {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [settings, setSettings] = useState();
  const [language, setLanguage] = useState("en");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleLanguageChange = async (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    await changeLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("lng", newLanguage);
  };

  const handleNickname = async () => {
    //console.log(nickname);
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

  useEffect(() => {
    async function fetchLocations() {
      const categories = await getAllCategories();
      setCategories(categories);
      const settings = await getUserSettings();
      setSettings(settings[0]);
      if (settings && settings[0]) {
        if (settings[0].categories) {
          setSelectedCategories(settings[0].categories);
        }

        const language = settings[0].language;
        if (language) {
          setLanguage(language);
        }
        if (settings[0].nickname) {
          setNickname(settings[0].nickname);
        }
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
              <FormControl fullWidth>
                <InputLabel>{t("Change Language")}</InputLabel>
                <Select value={language} onChange={handleLanguageChange}>
                  <MenuItem value="en">
                    <img
                      src="https://flagicons.lipis.dev/flags/4x3/sh.svg"
                      alt="English"
                      style={{ width: 20, height: 15, marginRight: 8 }}
                    />
                    English
                  </MenuItem>
                  <MenuItem value="pl">
                    <img
                      src="https://flagicons.lipis.dev/flags/4x3/pl.svg"
                      alt="Polski"
                      style={{ width: 20, height: 15, marginRight: 8 }}
                    />
                    Polski
                  </MenuItem>
                  <MenuItem value="de">
                    <img
                      src="https://flagicons.lipis.dev/flags/4x3/de.svg"
                      alt="Deutsch"
                      style={{ width: 20, height: 15, marginRight: 8 }}
                    />
                    Deutsch
                  </MenuItem>
                  <MenuItem value="uk">
                    <img
                      src="https://flagicons.lipis.dev/flags/4x3/ua.svg"
                      alt="українська"
                      style={{ width: 20, height: 15, marginRight: 8 }}
                    />
                    українська
                  </MenuItem>
                  <MenuItem value="cs">
                    <img
                      src="https://flagicons.lipis.dev/flags/4x3/cz.svg"
                      alt="čeština"
                      style={{ width: 20, height: 15, marginRight: 8 }}
                    />
                    čeština
                  </MenuItem>
                  <MenuItem value="fr">
                    <img
                      src="https://flagicons.lipis.dev/flags/4x3/fr.svg"
                      alt="Français"
                      style={{ width: 20, height: 15, marginRight: 8 }}
                    />
                    Français
                  </MenuItem>
                  <MenuItem value="es">
                    <img
                      src="https://flagicons.lipis.dev/flags/4x3/es.svg"
                      alt="Español"
                      style={{ width: 20, height: 15, marginRight: 8 }}
                    />
                    Español
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box noValidate sx={{ mt: 2 }}>
              <TextField
                margin="dense"
                required
                fullWidth
                value={nickname}
                id="nickname"
                label={t("Change nickname")}
                name="nickname"
                autoComplete="nickname"
                onChange={(event) => {
                  setNickname(event.target.value);
                }}
              />
              <div style={{ width: "100%" }}>
                <Button fullWidth variant="contained" onClick={handleNickname}>
                  {t("Change nickname")}
                </Button>
              </div>
            </Box>

            <Box noValidate sx={{ mt: 2 }}>
              {t("Notifications")}
              <Switch
                defaultChecked={settings.notifications}
                onChange={handleNotification}
              />
            </Box>
            <Box noValidate sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={async () => await updateInvitationLink()}
              >
                {t("Change invitation link")}
              </Button>
            </Box>
            <Box noValidate sx={{ mt: 2 }}>
              <Multiselect
                categories={categories}
                selectedCategories={selectedCategories}
                selectCategory={setSelectedCategories}
              />

              <Button fullWidth variant="contained" onClick={handleCategories}>
                {t("Change preferred categories")}
              </Button>
            </Box>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
