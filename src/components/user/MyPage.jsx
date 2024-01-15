import { Box, Stack } from "@mui/material";
import React from "react";
import Sidebar from "./mypage/Sidebar";
import { Outlet } from "react-router";
import "../../css/user.css";

const MyPage = () => {
  return (
    <Box sx={{ minWidth: "960px", bgcolor: "white" }}>
      <Stack direction="row" spacing={1}>
        <Sidebar />
        <Outlet />
      </Stack>
    </Box>
  );
};

export default MyPage;
