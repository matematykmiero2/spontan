import React, { useEffect, useState } from "react";
import "../Components/components.css";
import fullLogo from "../resources/fullLogo.svg";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { registration } from "../functions";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    const register = await registration(
      email,
      password,
      name,
      surname,
      nickname
    );
    if (register) {
      navigate("/");
    } else {
      console.error("Register failed");
    }
  };
  return (
    <>
      <div className="login">
        <img src={fullLogo} alt="Logo" className="LoginLogo" />
        <div className="box">
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="First name"
              name="name"
              autoComplete="name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Last name"
              name="lastname"
              autoComplete="lastname"
              onChange={(event) => {
                setSurname(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="nickname"
              label="Nickname"
              name="nickname"
              autoComplete="nickname"
              onChange={(event) => {
                setNickname(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <Button
              onClick={register}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create account
            </Button>
            <Button
              onClick={() => navigate("/login")}
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Sign in
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Register;
