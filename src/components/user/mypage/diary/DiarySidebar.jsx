import {
  AssessmentRounded,
  FolderSpecialRounded,
  SummarizeRounded,
} from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const DiarySidebar = ({ selectedIndex, handleListItemClick }) => {
  return (
    <>
      <ListItemButton
        selected={selectedIndex === 1}
        onClick={() => handleListItemClick(1)}
        component={Link}
        to=""
      >
        <ListItemIcon>
          <AssessmentRounded />
        </ListItemIcon>
        <ListItemText primary="상세 리포트" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 3}
        onClick={() => handleListItemClick(3)}
        component={Link}
        to="scrp"
      >
        <ListItemIcon>
          <FolderSpecialRounded />
        </ListItemIcon>
        <ListItemText primary="플랜" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 4}
        onClick={() => handleListItemClick(4)}
        component={Link}
        to="mysv"
      >
        <ListItemIcon>
          <SummarizeRounded />
        </ListItemIcon>
        <ListItemText primary="설문조사 결과 확인/수정" />
      </ListItemButton>
    </>
  );
};

export default DiarySidebar;
