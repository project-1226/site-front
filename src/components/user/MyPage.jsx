import { Box, Container, Stack } from "@mui/material";
import React from "react";
import Sidebar from "./mypage/Sidebar";
import { Outlet } from "react-router";
import "../../css/user.css";

const MyPage = () => {
  return (
    <Box minWidth="1440px">
      <Container maxWidth="xl">
        <Stack direction="row" spacing={4}>
          <Sidebar />
          <Outlet />
        </Stack>
      </Container>
    </Box>
  );
};

export default MyPage;
