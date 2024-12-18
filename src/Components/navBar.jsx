import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import EventIcon from "@mui/icons-material/Event";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { useNavigate, useLocation } from "react-router-dom";
import { checkIfLogged } from "../functions";
import { useTranslation } from "react-i18next";

const NavBar = ({ id }) => {
  const { t } = useTranslation();
  const unLogged = checkIfLogged();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const location = useLocation();
  const [value, setValue] = useState(2);
  useEffect(() => {
    switch (location.pathname) {
      case "/friends":
        setValue(0);
        break;
      case "/explore":
        setValue(1);
        break;
      case "/":
        setValue(2);
        break;
      case "/signed":
        setValue(3);
        break;
      case "/profile":
        setValue(4);
        break;
      default:
        setValue(null);
    }
  }, [location.pathname]);
  return (
    <>
      {isMobile ? (
        <Paper
          sx={{
            position: "fixed",
            zIndex: 1000,
            bottom: 0,
            left: 0,
            right: 0,
          }}
          elevation={3}
        >
          <BottomNavigation value={value}>
            <BottomNavigationAction
              label={t("Friends")}
              icon={<Diversity3Icon />}
              onClick={() => navigate(unLogged ? "/friends" : "/login")}
            />
            <BottomNavigationAction
              label={t("Explore")}
              icon={<ExploreIcon />}
              onClick={() => navigate("/explore")}
            />
            <BottomNavigationAction
              label={t("Home")}
              icon={<HomeIcon />}
              onClick={() => navigate("/")}
            />
            <BottomNavigationAction
              label={t("Signed")}
              icon={<EventIcon />}
              onClick={() => navigate(unLogged ? "/signed" : "/login")}
            />
            <BottomNavigationAction
              label={t("Profile")}
              icon={<AccountBoxIcon />}
              onClick={() => navigate(unLogged ? "/profile" : "/login")}
            />
          </BottomNavigation>
        </Paper>
      ) : (
        <Paper
          sx={{ position: "fixed", zIndex: 1000, top: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation value={value} showLabels>
            <BottomNavigationAction
              label={t("Friends")}
              icon={<Diversity3Icon />}
              onClick={() => navigate(unLogged ? "/friends" : "/login")}
            />
            <BottomNavigationAction
              label={t("Explore")}
              icon={<ExploreIcon />}
              onClick={() => navigate("/explore")}
            />
            <BottomNavigationAction
              label={t("Home")}
              icon={<HomeIcon />}
              onClick={() => navigate("/")}
            />
            <BottomNavigationAction
              label={t("Signed")}
              icon={<EventIcon />}
              onClick={() => navigate(unLogged ? "/signed" : "/login")}
            />
            <BottomNavigationAction
              label={t("Profile")}
              icon={<AccountBoxIcon />}
              onClick={() => navigate(unLogged ? "/profile" : "/login")}
            />
          </BottomNavigation>
        </Paper>
      )}
    </>
  );
};

export default NavBar;
