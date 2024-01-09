import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import React, { useState } from "react";
import DiarySidebar from "./diary/DiarySidebar";
import ActivitySidebar from "./activity/ActivitySidebar";
import ShopSidebar from "./shop/ShopSidebar";
import InfoSidebar from "./info/InfoSidebar";

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "transparent", p: 3 }}>
      <List component="nav" aria-labelledby="list1-diary">
        <ListItem>
          <ListItemText
            primary="MY 다이어리"
            primaryTypographyProps={{
              color: "primary",
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          />
        </ListItem>
        <DiarySidebar
          selectedIndex={selectedIndex}
          handleListItemClick={setSelectedIndex}
        />
      </List>
      <Divider />
      <List component="nav" aria-labelledby="list1-diary">
        <ListItem>
          <ListItemText
            primary="MY 활동"
            primaryTypographyProps={{
              color: "primary",
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          />
        </ListItem>
        <ActivitySidebar
          selectedIndex={selectedIndex}
          handleListItemClick={setSelectedIndex}
        />
      </List>
      <Divider />
      <List component="nav" aria-labelledby="list1-diary">
        <ListItem>
          <ListItemText
            primary="MY 쇼핑"
            primaryTypographyProps={{
              color: "primary",
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          />
        </ListItem>
        <ShopSidebar
          selectedIndex={selectedIndex}
          handleListItemClick={setSelectedIndex}
        />
      </List>
      <Divider />
      <List component="nav" aria-labelledby="list1-diary">
        <ListItem>
          <ListItemText
            primary="MY 정보"
            primaryTypographyProps={{
              color: "primary",
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          />
        </ListItem>
        <InfoSidebar
          selectedIndex={selectedIndex}
          handleListItemClick={setSelectedIndex}
        />
      </List>
    </Box>
  );
};

export default Sidebar;
