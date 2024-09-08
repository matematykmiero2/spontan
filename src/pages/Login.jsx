import React, { useEffect, useState } from "react";
import "../Components/components.css";
import fullLogo from "../resources/fullLogo.svg";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { logIn } from "../functions";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const logged = await logIn(email, password);
    if (logged) {
      window.location.reload();
    } else {
      console.error("Login failed");
    }
  };

  return (
    <>
      <div className="login">
        <img src={fullLogo} alt="Logo" className="LoginLogo" />
        <div className="box">
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => {
              setEmail(event.target.value);
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
            onClick={login}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>
          <Button
            onClick={() => navigate("/register")}
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Create account
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
