import {
  HelpRounded,
  LocalGroceryStoreRounded,
  ProductionQuantityLimitsRounded,
  StarsRounded,
} from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ShopSidebar = ({ selectedIndex, handleListItemClick }) => {
  return (
    <>
      <ListItemButton
        selected={selectedIndex === 7}
        onClick={() => handleListItemClick(7)}
        component={Link}
        to="mprch"
      >
        <ListItemIcon>
          <LocalGroceryStoreRounded />
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
          <ProductionQuantityLimitsRounded />
        </ListItemIcon>
        <ListItemText primary="취소/반품/환불" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 9}
        onClick={() => handleListItemClick(9)}
        component={Link}
        to="shqna"
      >
        <ListItemIcon>
          <HelpRounded />
        </ListItemIcon>
        <ListItemText primary="문의하기" />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 10}
        onClick={() => handleListItemClick(10)}
        component={Link}
        to="wsit"
      >
        <ListItemIcon>
          <StarsRounded />
        </ListItemIcon>
        <ListItemText primary="찜한 상품" />
      </ListItemButton>
    </>
  );
};

export default ShopSidebar;
