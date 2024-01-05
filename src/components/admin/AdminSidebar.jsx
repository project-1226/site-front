import { Box, List, ListSubheader, Divider } from '@mui/material'
import React from 'react'
import ManagementSidebar from './management/ManagementSidebar'
import ProductSidebar from './product/ProductSidebar'
import PostSidebar from './post/PostSidebar'

const AdminSidebar = () => {
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
            <ManagementSidebar />
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
            <ProductSidebar  />
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
            <PostSidebar />
        </List>
        <Divider />
    </Box>
  )
}

export default AdminSidebar