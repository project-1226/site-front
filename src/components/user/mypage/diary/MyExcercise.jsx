import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyExcercise = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const getList = async () => {
    setLoading(true);
    const res = await axios("/user/my-excercise", {
      params: { userid: sessionStorage.getItem("userid") },
    });
    console.log(res.data);
    setList(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {list.map((l) => l.categoryname)}
    </>
  );
};

export default MyExcercise;
