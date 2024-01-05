import React, { useState } from 'react'
import { List, Box, ListItemButton, ListItemText, Divider, ListItemIcon  } from '@mui/material';
import ManageAccountsOutlineIcon from '@mui/icons-material/ManageAccounts';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

const ManagementSidebar = () => {
    const [selectedIndex, setSelectedIndex] = useState();

    const handleListItemClick = (e, index) => {
        setSelectedIndex(index);
    }

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemIcon>
                        <ManageAccountsOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary="회원관리" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                >
                    <ListItemIcon>
                        <ShoppingBasketOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="주문/배송" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <ListItemIcon>
                        <LocalShippingOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="배송지관리" />
                </ListItemButton>
            </List>
            <Divider />
        </Box>
    )
}

export default ManagementSidebar