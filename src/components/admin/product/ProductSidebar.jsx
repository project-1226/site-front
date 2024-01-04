import React, { useState } from 'react'
import { Box, List, ListItemText, ListItemButton, ListItemIcon, Divider } from '@mui/material';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

const ProductSidebar = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (e, index) => {
        setSelectedIndex(index);
    }

  return (
    <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
        <List component="nav" aria-label='main mailbox folders'>
            <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
            >
                <ListItemIcon>
                    <AddShoppingCartOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="상품등록" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
            >
                <ListItemIcon>
                    <HelpCenterOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="문의" />
            </ListItemButton>
        </List>
        <Divider/>
    </Box>
  )
}

export default ProductSidebar