import React, { useEffect, useState } from "react";
import "../Components/components.css";
import fullLogo from "../resources/fullLogo.svg";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { signUp } from "../functions";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nickname, setNickname] = useState("");
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value));
  };
  const register = async () => {
    if (!emailError && email && password && name && surname && nickname) {
      await signUp(email, password, name, surname, nickname);
    } else {
      alert("Fullfill all fields");
    }
  };
  return (
    <>
      <div className="login">
        <img src={fullLogo} alt="Logo" className="LoginLogo" />
        <div className="box">
          <Box noValidate sx={{ mt: 0 }}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleEmailChange}
              error={emailError}
              helperText={
                emailError ? "Please enter a valid email address" : ""
              }
            />
            <TextField
              margin="dense"
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
              margin="dense"
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
              margin="dense"
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
              margin="dense"
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
              sx={{ mt: 1, mb: 0 }}
            >
              Create account
            </Button>
            <Button
              onClick={() => navigate("/login")}
              fullWidth
              sx={{ mt: 1, mb: 3 }}
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
