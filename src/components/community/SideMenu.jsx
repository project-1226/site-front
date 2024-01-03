import React from 'react'
import { Box, List, ListItemButton, ListItemText, Divider, ListItem, Link } from '@mui/material'

const SideMenu = () => {

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List className='my-5 ms-3'>
                    <ListItem>
                        <ListItemButton>
                            <Link href='/community/notice' underline='none'>
                            <ListItemText primary="공지" /></Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <Link href='/community/review' underline='none'>
                            <ListItemText primary="후기" /></Link>
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            <Divider />
        </Box>
    )
}

export default SideMenu