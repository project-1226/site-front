import { Box, Container, Stack } from "@mui/material";
import React from "react";
import Sidebar from "./mypage/Sidebar";
import { Outlet } from "react-router";

import Chatbot from "../chatbot/Chatbot";
import "../../css/user.css";

const MyPage = () => {
  return (
    <Box minWidth="1440px">
      <Container maxWidth="xl">
        <Stack direction="row" spacing={4}>
          <Sidebar />
          <Outlet />
        </Stack>
        <Chatbot/>
      </Container>
    </Box>
  );
};

export default MyPage;
