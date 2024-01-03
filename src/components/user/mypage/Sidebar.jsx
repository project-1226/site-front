import { Box, Divider, List, ListSubheader } from "@mui/material";
import React, { useState } from "react";
import DiarySidebar from "./diary/DiarySidebar";
import ActivitySidebar from "./activity/ActivitySidebar";
import ShopSidebar from "./shop/ShopSidebar";
import InfoSidebar from "./info/InfoSidebar";

const Sidebar = () => {
    return (
        <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "transparent", p: 3 }}
        >
            <List
                component="nav"
                aria-labelledby="list1-diary"
                subheader={
                    <ListSubheader
                        component="div"
                        id="list1-diary"
                        sx={{
                            fontSize: "1.1rem",
                            bgcolor: "transparent",
                        }}
                    >
                        MY 다이어리
                    </ListSubheader>
                }
            >
                <DiarySidebar />
            </List>
            <Divider />
            <List
                component="nav"
                aria-labelledby="list1-diary"
                subheader={
                    <ListSubheader
                        component="div"
                        id="list1-diary"
                        sx={{
                            fontSize: "1.1rem",
                            bgcolor: "transparent",
                        }}
                    >
                        MY 활동
                    </ListSubheader>
                }
            >
                <ActivitySidebar />
            </List>
            <Divider />
            <List
                component="nav"
                aria-labelledby="list1-diary"
                subheader={
                    <ListSubheader
                        component="div"
                        id="list1-diary"
                        sx={{
                            fontSize: "1.1rem",
                            bgcolor: "transparent",
                        }}
                    >
                        MY 쇼핑
                    </ListSubheader>
                }
            >
                <ShopSidebar />
            </List>
            <Divider />
            <List
                component="nav"
                aria-labelledby="list1-diary"
                subheader={
                    <ListSubheader
                        component="div"
                        id="list1-diary"
                        sx={{
                            fontSize: "1.1rem",
                            bgcolor: "transparent",
                        }}
                    >
                        MY 정보
                    </ListSubheader>
                }
            >
                <InfoSidebar />
            </List>
        </Box>
    );
};

export default Sidebar;
