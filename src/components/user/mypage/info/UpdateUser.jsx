import axios from "axios";
import React, { useEffect, useState } from "react";
import CheckUser from "./CheckPage";
import UpdatePage from "./UpdatePage";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

const UpdateUser = () => {
  const [user, setUser] = useState("");
  const [isEqualPass, setIsEqualPass] = useState(false);

  const location = useLocation();

  const getUser = async () => {
    const res = await axios("/user/read", {
      params: {
        userid: sessionStorage.getItem("userid"),
      },
    });
    setUser(res.data);
  };

  const onCheckPass = (passEqual) => {
    setIsEqualPass(passEqual);
  };

  useEffect(() => {
    getUser();
  }, [location]);

  return (
    <Box sx={{ width: "100%", bgcolor: "transparent", p: 5 }}>
      {!isEqualPass ? (
        <CheckUser user={user} onPassCheck={onCheckPass} />
      ) : (
        <UpdatePage userInfo={user} setIsEqualPass={setIsEqualPass} />
      )}
    </Box>
  );
};

export default UpdateUser;
