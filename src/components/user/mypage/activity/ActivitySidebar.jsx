import { ArticleRounded, FolderSpecialRounded } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ActivitySidebar = ({ selectedIndex, handleListItemClick }) => {
  return (
    <>
      <ListItemButton
        selected={selectedIndex === 5}
        onClick={() => handleListItemClick(5)}
        component={Link}
        to="mact"
      >
        <ListItemIcon>
          <ArticleRounded />
        </ListItemIcon>
        <ListItemText primary="활동 내역" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 12}
        onClick={() => handleListItemClick(12)}
        component={Link}
        to="sact"
      >
        <ListItemIcon>
          <FolderSpecialRounded />
        </ListItemIcon>
        <ListItemText primary="스크랩" />
      </ListItemButton>
    </>
  );
};

export default ActivitySidebar;
