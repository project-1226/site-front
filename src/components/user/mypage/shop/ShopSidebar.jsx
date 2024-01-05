import { Inbox } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ShopSidebar = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <ListItemButton
                selected={selectedIndex === 7}
                onClick={() => handleListItemClick(7)}
                component={Link}
                to="mprch"
            >
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary="주문목록/배송조회" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 8}
                onClick={() => handleListItemClick(8)}
                component={Link}
                to="cncl"
            >
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary="취소/반품/환불" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 9}
                onClick={() => handleListItemClick(9)}
                component={Link}
                to="wsit"
            >
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary="찜한 상품" />
            </ListItemButton>
        </>
    );
};

export default ShopSidebar;
