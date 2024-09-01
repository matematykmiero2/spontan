import React from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from ".././functions";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import LoadPhoto from "../Components/loadPhoto";
const Profile = () => {
  const navigate = useNavigate();
  const Logout = () => {
    signOut();
    navigate("/");
  };
  return (
    <>
      <Stack spacing={2}>
        <Button
          onClick={() => navigate("/create")}
          variant="contained"
          endIcon={<AddIcon />}
        >
          Create event
        </Button>
        <Button onClick={Logout} variant="contained" endIcon={<LogoutIcon />}>
          Log out
        </Button>
      </Stack>
    </>
  );
};
export default Profile;
