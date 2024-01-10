import { Inbox } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const InfoSidebar = ({ selectedIndex, handleListItemClick }) => {
  return (
    <>
      <ListItemButton
        selected={selectedIndex === 11}
        onClick={() => handleListItemClick(11)}
        component={Link}
        to="upd"
      >
        <ListItemIcon>
          <Inbox />
        </ListItemIcon>
        <ListItemText primary="개인정보확인/수정" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 12}
        onClick={() => handleListItemClick(12)}
        component={Link}
        to="addr"
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
