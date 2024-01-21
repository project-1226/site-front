import { ForumRounded, TryRounded } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

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
          <ForumRounded />
        </ListItemIcon>
        <ListItemText primary="커뮤니티" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 6}
        onClick={() => handleListItemClick(6)}
        component={Link}
        to="ract"
      >
        <ListItemIcon>
          <TryRounded />
        </ListItemIcon>
        <ListItemText primary="상품리뷰" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 11}
        onClick={() => handleListItemClick(11)}
        component={Link}
        to="wspl"
      >
        <ListItemIcon>
        <BookmarkOutlinedIcon/>
        </ListItemIcon>
        <ListItemText primary="찜한 식단" />
      </ListItemButton>
    </>
  );
};

export default ActivitySidebar;
