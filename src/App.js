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
import { checkIfLogged } from "./functions";

function App() {
  const [logged, setLogged] = useState(null);

  useEffect(() => {
    async function fetchAndParseEvents() {
      const status = await checkIfLogged();
      setLogged(status);
    }

    fetchAndParseEvents();
  }, []);

  // Show a loading message or spinner while checking the login status
  if (logged === null) {
    return <div>Loading...</div>;
  }

  return (
    <HashRouter>
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
            <Route path="/private/:id" element={<Private />} />
            <Route path="/manageEvents" element={<Manage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </HashRouter>
  );
}

export default App;
