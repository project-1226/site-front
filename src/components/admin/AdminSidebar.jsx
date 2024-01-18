import React, { useState } from 'react'
import { Box, List, ListSubheader, Divider, ListItemButton, ListItemText, ListItemIcon } from '@mui/material'

import ManageAccountsOutlineIcon from '@mui/icons-material/ManageAccounts';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import CustomerModal from './CustomerModal';
import { Link } from 'react-router-dom';


const AdminSidebar = () => {
    const [selectedIndex, setSelectedIndex] = useState();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleListItemClick = (e, index) => {
        setSelectedIndex(index);
        if(index === 0){
            setModalOpen(true);
        }
    }

    const handleCloseModal = () => {
        setModalOpen(false);
      };

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
                    component={Link}
                    to="adorder"
                >
                    <ListItemIcon>
                        <ShoppingBasketOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="주문/배송" />
                </ListItemButton>
                <List></List>
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
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                    component={Link}
                    to="register"
                >
                    <ListItemIcon>
                        <AddShoppingCartOutlinedIcon />
                    </ListItemIcon>
                    
                        <ListItemText primary="상품등록" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                    component={Link}
                    to="product"
                >
                    <ListItemIcon>
                        <AddShoppingCartOutlinedIcon />
                    </ListItemIcon>
                    
                        <ListItemText primary="상품 가져오기" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 4}
                    onClick={(event) => handleListItemClick(event, 4)}
                    component={Link}
                    to="plist"
                >
                    <ListItemIcon>
                        <AddShoppingCartOutlinedIcon />
                    </ListItemIcon>
                    
                        <ListItemText primary="상품 목록" />
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
                    component={Link}
                    to="adno"
                >
                    <ListItemIcon>
                        <RateReviewOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="공지" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 6}
                    onClick={(event) => handleListItemClick(event, 6)}
                    component={Link}
                    to="adnoud"
                >
                    <ListItemIcon>
                        <RateReviewOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="공지목록" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 7}
                    onClick={(event) => handleListItemClick(event, 7)}
                    component={Link}
                    to="adreview"
                >
                    <ListItemIcon>
                        <RateReviewOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="후기/댓글" />
                </ListItemButton>
            </List>
            <Divider />
            <CustomerModal show={isModalOpen} hide={handleCloseModal} />
        </Box>
    )
}

export default AdminSidebar;