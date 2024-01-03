import { Inbox } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useState } from "react";

const InfoSidebar = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <ListItemButton
                selected={selectedIndex === 9}
                onClick={() => handleListItemClick(9)}
            >
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary="개인정보확인/수정" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 10}
                onClick={() => handleListItemClick(10)}
            >
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary="배송지 관리" />
            </ListItemButton>
        </>
    );
};

export default InfoSidebar;
