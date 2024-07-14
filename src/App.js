import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/home";
import NavBar from "./Components/navBar";
import Profile from "./pages/profile";
import Signed from "./pages/signed";
import Explore from "./pages/explore/explore";
import Friends from "./pages/friends";
import EventPage from "./pages/eventPage";
function App() {
  return (
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signed" element={<Signed />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/event/:id" element={<EventPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
