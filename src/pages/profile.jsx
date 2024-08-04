import React from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from ".././functions";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const Logout = () => {
    signOut();
    navigate("/");
  };
  return (
    <>
      <Button onClick={Logout} variant="contained" endIcon={<LogoutIcon />}>
        Log out
      </Button>
    </>
  );
};
export default Profile;
