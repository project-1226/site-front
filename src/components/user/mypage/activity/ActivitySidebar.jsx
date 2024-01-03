import { Inbox } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useState } from "react";

const ActivitySidebar = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <ListItemButton
                selected={selectedIndex === 5}
                onClick={() => handleListItemClick(5)}
            >
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary="활동 내역" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 6}
                onClick={() => handleListItemClick(6)}
            >
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary="스크랩" />
            </ListItemButton>
        </>
    );
};

export default ActivitySidebar;
