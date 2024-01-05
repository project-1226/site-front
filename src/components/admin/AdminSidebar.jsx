import React, { useState } from 'react'
import { Box, List, ListSubheader, Divider, ListItemButton, ListItemText, ListItemIcon, Link } from '@mui/material'

import ManageAccountsOutlineIcon from '@mui/icons-material/ManageAccounts';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';


const AdminSidebar = () => {
    const [selectedIndex, setSelectedIndex] = useState();

    const handleListItemClick = (e, index) => {
        setSelectedIndex(index);
    }

  return (
    <Box
        sx={{ width: '100%', maxWidth: 360, bgcolor: "transparent", p: 3 }}
    >
        <List
            component="nav"
            aria-labelledby="admin-list"
            subheader={
                <ListSubheader
                    component="div"
                    id="admin-list"
                    sx={{
                        fontSize: "1.3rem",
                        bgcolor: "transparent",
                    }}
                >
                    Admin
                </ListSubheader>
            }
        >
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
        <List
            component="nav"
            aria-labelledby="admin-list"
            subheader={
                <ListSubheader
                    component="div"
                    id="admin-list"
                    sx={{
                        fontSize: "1.3rem",
                        bgcolor: "transparent",
                    }}
                >
                    상품
                </ListSubheader>
            }
        >
            <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
            >
                <ListItemIcon>
                    <AddShoppingCartOutlinedIcon />
                </ListItemIcon>
                <Link href="/admin/product/register" color="inherit">
                    <ListItemText primary="상품등록" /></Link>
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
            >
                <ListItemIcon>
                    <HelpCenterOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="문의" />
            </ListItemButton>
        </List>
        <Divider />
        <List
            component="nav"
            aria-labelledby="admin-list"
            subheader={
                <ListSubheader
                    component="div"
                    id="admin-list"
                    sx={{
                        fontSize: "1.3rem",
                        bgcolor: "transparent",
                    }}
                >
                    Community
                </ListSubheader>
            }
        >
            <ListItemButton
                    selected={selectedIndex === 5}
                    onClick={(event) => handleListItemClick(event, 5)}
                >
                    <ListItemIcon>
                        <RateReviewOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="공지" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 6}
                    onClick={(event) => handleListItemClick(event, 6)}
                >
                    <ListItemIcon>
                        <RateReviewOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="후기/댓글" />
                </ListItemButton>
        </List>
        <Divider />
    </Box>
  )
}

export default AdminSidebar