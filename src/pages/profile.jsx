import React from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from ".././functions";
const Profile = () => {
  return (
    <>
      <Button onClick={signOut} variant="contained" endIcon={<LogoutIcon />}>
        Log out
      </Button>
    </>
  );
};
export default Profile;
