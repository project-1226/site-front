import { Box, Stack } from "@mui/material";
import React from "react";
import Sidebar from "./mypage/Sidebar";
import { Outlet } from "react-router";
import Chatbot from "../chatbot/Chatbot";


const MyPage = () => {
  return (
    <Box sx={{ minWidth: "960px" }}>
      <Stack direction="row" spacing={1}>
        <Sidebar />
        <Outlet />
      </Stack>
      <Chatbot/>
    </Box>
  );
};

export default MyPage;
