import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signIn } from "../../services/firebase/auth";
import useRedirectToHomeIfLoggedIn from "../../shared/hooks/useRedirectToHomeIfLoggedIn";
import Navigation from "./Navigation";

const initialError = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState(initialError);

  const navigate = useNavigate();

  useRedirectToHomeIfLoggedIn();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(initialError);
    const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    let isValid = true;

    if (!emailRegex.test(emailValue)) {
      setError((prevState) => {
        return { ...prevState, email: "Email is invalid" };
      });

      isValid = false;
    }

    if (passwordValue.length < 6) {
      setError((prevState) => {
        return {
          ...prevState,
          password: "Password must be at least 6 characters",
        };
      });
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    await signIn(emailValue, passwordValue);

    navigate("/");
  };

  return (
    <>
      <Navigation />
      <SignInContainer>
          <form onSubmit={handleSubmit}>
            <TextField
              label="email"
              variant="standard"
              fullWidth
              error={error.email !== ""}
              helperText={error.email}
              value={emailValue}
              onChange={(event) => setEmailValue(event.target.value)}
            />
            <TextField
              label="password"
              type="password"
              variant="standard"
              fullWidth
              error={error.password !== ""}
              helperText={error.password}
              value={passwordValue}
              onChange={(event) => setPasswordValue(event.target.value)}
            />
            <Button variant="contained" type="submit">
              Sign in
            </Button>
          </form>
          <Typography variant="subtitle1" paragraph={true} sx={{ mt: 2 }}>
            Don't have an account? <Link to="/sign-up">Sign up</Link>
          </Typography>
      </SignInContainer>
      
    </>
  );
};

const SignInContainer = styled.div`
  width: 400px;
  height: auto;
  position: relative;
  margin-top: 50px;
  left: calc(50% - 200px);
  box-shadow: 5px 5px 5px 5px lightgray;
  background-color: rgb(240, 240, 240);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > form{
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 80%;
  }
`;

export default SignIn;