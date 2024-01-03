import { Inbox } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const DiarySidebar = () => {
    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <ListItemButton
                selected={selectedIndex === 1}
                onClick={() => handleListItemClick(1)}
                component={Link}
                to="repo"
            >
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary="상세 리포트" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 2}
                onClick={() => handleListItemClick(2)}
                component={Link}
                to="rcmp"
            >
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary="맞춤형 추천 플랜" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 3}
                onClick={() => handleListItemClick(3)}
                component={Link}
                to="cstp"
            >
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary="커스텀 운동 플랜" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 4}
                onClick={() => handleListItemClick(4)}
                component={Link}
                to="mysv"
            >
                <ListItemIcon>
                    <Inbox />
                </ListItemIcon>
                <ListItemText primary="설문조사 결과 확인/수정" />
            </ListItemButton>
        </>
    );
};

export default DiarySidebar;
