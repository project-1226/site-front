import { Box, Stack } from "@mui/material";
import React from "react";
import Sidebar from "./mypage/Sidebar";
import { Outlet } from "react-router";

const MyPage = () => {
    return (
        <Box>
            <Stack direction="row" spacing={2}>
                <Sidebar />
                <Outlet />
            </Stack>
        </Box>
    );
};

export default MyPage;
