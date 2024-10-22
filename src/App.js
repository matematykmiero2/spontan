import React, { useState, useEffect } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/home";
import NavBar from "./Components/navBar";
import Profile from "./pages/profile";
import Signed from "./pages/signed";
import Explore from "./pages/explore/explore";
import Friends from "./pages/friends";
import EventPage from "./pages/eventPage";
import AddFriend from "./pages/addFriend";
import Create from "./pages/create";
import Settings from "./pages/settings";
import Private from "./pages/private";
import Manage from "./pages/organizerEvents";
import EventInvitations from "./pages/eventInvitations";
import {
  checkIfLogged,
  getUserSettings,
  getNotifications,
  getUserID,
  supabase,
} from "./functions";
import { useTranslation } from "react-i18next";
import NotificationBell from "./Components/notificationBell";
function App() {
  const [logged, setLogged] = useState(null);
  const [notifications, setNotifications] = useState();
  const [settings, setSettings] = useState();
  const { t, i18n } = useTranslation();
  const [id, setId] = useState();
  useEffect(() => {
    async function fetchAndParseEvents() {
      const status = checkIfLogged();
      setLogged(status);
      if (status !== null) {
        const settings = await getUserSettings();

        if (settings && settings[0] && settings[0].language) {
          setSettings(settings[0]);
          const language = settings[0].language;
          if (language) {
            i18n.changeLanguage(language);
            localStorage.setItem("lng", language);
          }
        }
      }
    }

    fetchAndParseEvents();
  }, []);
  useEffect(() => {
    const fetchNotifications = async () => {
      if (
        logged &&
        settings &&
        settings.notifications &&
        settings.notifications === true
      ) {
        const fetchedNotifications = await getNotifications();
        setNotifications(fetchedNotifications);
      }
    };

    fetchNotifications();
  }, [logged, settings]);

  if (logged === null) {
    return <div> {t("Loading...")}</div>;
  }

  return (
    <HashRouter>
      {notifications &&
        notifications.length > 0 &&
        settings &&
        settings.notifications &&
        settings.notifications === true && (
          <NotificationBell notifications={notifications} />
        )}
      {logged && <NavBar />}
      <Routes>
        {!logged ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signed" element={<Signed />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/addFriend" element={<AddFriend />} />
            <Route path="/create" element={<Create />} />
            <Route path="/event/:id" element={<EventPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/eventInvitations" element={<EventInvitations />} />
            <Route path="/manageEvents" element={<Manage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </HashRouter>
  );
}

export default App;
