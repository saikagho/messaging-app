import React from "react";

import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ForumTwoToneIcon from "@material-ui/icons/ForumTwoTone";

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((e) => alert(e.message));
  };

  return (
    <Container maxWidth="sm">
      <Typography
        component="div"
        style={{
          backgroundColor: "#ffffff",
          marginTop: "15vh",
          height: "50vh",
          borderRadius: "2%",
        }}
      >
        <div className="login">
          <div className="login__container">
            <ForumTwoToneIcon fontSize="large" />
            <div className="login__text">
              <h2>Sign in to Messaging App</h2>
            </div>
            <Button onClick={signIn}>Sign In With Google</Button>
          </div>
        </div>
      </Typography>
    </Container>
  );
};

export default Login;
