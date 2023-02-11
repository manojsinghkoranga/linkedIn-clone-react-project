import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signUp } from "../../services/firebase/auth";
import { addUser } from "../../services/firebase/user";
import NavBar from "../../shared/components/NavBar";
import useRedirectToHomeIfLoggedIn from "../../shared/hooks/useRedirectToHomeIfLoggedIn";
import Navigation from "../SignIn/Navigation";

const initialError = {
  email: "",
  password: "",
};

const SignUp = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
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

    const user = await signUp(emailValue, passwordValue);

    await addUser(user.user.uid, {
      firstName: firstNameValue,
      lastName: lastNameValue,
    });

    navigate("/");
  };

  return (
    <>
      <Navigation />
      <SignUpContainer>
        <form onSubmit={handleSubmit}>
          <TextField
            label="first name"
            variant="standard"
            fullWidth
            required
            value={firstNameValue}
            onChange={(event) => setFirstNameValue(event.target.value)}
          />
          <TextField
            label="last name"
            variant="standard"
            fullWidth
            value={lastNameValue}
            onChange={(event) => setLastNameValue(event.target.value)}
          />
          <TextField
            label="email"
            variant="standard"
            fullWidth
            required
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
            required
            error={error.password !== ""}
            helperText={error.password}
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.target.value)}
          />
          <Button variant="contained" type="submit">
            Sign up
          </Button>
  
        </form>
        <Typography variant="subtitle1" paragraph={true} sx={{ mt: 2 }}>
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </Typography>

      </SignUpContainer>
    </>
  );
};

const SignUpContainer = styled.div`
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

export default SignUp;