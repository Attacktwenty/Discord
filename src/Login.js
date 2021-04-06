import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";

function Login() {
  const signIn = () => {
    //do google login
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          //   style={{ width: "400px" }}
          src="https://logos-download.com/wp-content/uploads/2021/01/Discord_Logo_full.png"
          alt="logo"
        ></img>
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
}

export default Login;
