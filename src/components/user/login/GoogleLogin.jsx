import React from "react";

import { auth } from "../../FirebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import axios from "axios";

const GoogleLogin = () => {
  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    signInWithPopup(auth, provider) // popup을 이용한 signup
      .then(async (data) => {
        const user = data.user;
        const email = user.email;
        const photoURL = user.photoURL;
        console.log(data);
        console.log(email + "\n" + photoURL);
        const res = await axios.post("/user/login", { email, password: "0" });
        console.log(res.data);
        // if (res.data === 0) {
        //   await axios.post("/user/insert", {
        //     email,
        //     photo: photoURL,
        //   });
        // }
        // sessionStorage.setItem("email", email);
        // window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Button
      fullWidth
      disableElevation
      sx={{ height: "100%" }}
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={handleGoogleLogin}
    >
      Google
    </Button>
  );
};

export default GoogleLogin;
