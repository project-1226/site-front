import React, { useState } from 'react'
import { Box, List, ListItemButton, ListItemText, Divider, ListItemIcon } from '@mui/material'
import { Link } from 'react-router-dom';

import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import SimCardAlertOutlinedIcon from '@mui/icons-material/SimCardAlertOutlined';

const SideMenu = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent', p: 3 }}>
      <List component="nav" aria-labelledby="list1-diary">
        <ListItemText
          primary="커뮤니티"
          primaryTypographyProps={{
            color: "primary",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
        />
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          component={Link}
          to=""
        >
          <ListItemIcon>
            <SimCardAlertOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="공지" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          component={Link}
          to="review"
        >
          <ListItemIcon>
            <RateReviewOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="후기" />
        </ListItemButton>
      </List>
      <Divider />
    </Box>
  )
}

export default SideMenu