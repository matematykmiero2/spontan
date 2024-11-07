import React, { useEffect, useState } from "react";
import "../Components/components.css";
import fullLogo from "../resources/fullLogo.svg";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { logIn } from "../functions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    const logged = await logIn(email, password);
    if (logged) {
      window.location.reload();
    } else {
      setError(true);
    }
  };

  return (
    <>
      <div className="login">
        <img src={fullLogo} alt="Logo" className="LoginLogo" />
        <div className="box">
          <TextField
            error={error}
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("Email Address")}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => {
              setError(false);
              setEmail(event.target.value);
            }}
            helperText={error && t("Incoorect login or password")}
          />
          <TextField
            error={error}
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("Password")}
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => {
              setError(false);
              setPassword(event.target.value);
            }}
            helperText={error && t("Incoorect login or password")}
          />
          <Button
            onClick={login}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t("Sign in")}
          </Button>
          <Button
            onClick={() => navigate("/register")}
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            {t("Create account")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
