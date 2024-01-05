import React, { useState } from 'react'
import { Box, List, ListItemButton, ListItemText, Divider, Link } from '@mui/material'

const SideMenu = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (e, index) => {
        setSelectedIndex(index);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', p: 3}}>
            <List component="nav" aria-label="main mailbox folders" className='my-3 ms-3'>
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(e) => handleListItemClick(e, 0)}
                >
                    <Link href='/community/notice' color="inherit">
                        <ListItemText primary="공지" /></Link>
                </ListItemButton>

                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(e) => handleListItemClick(e, 1)}
                >
                    <Link href='/community/review' color="inherit">
                        <ListItemText primary="후기" /></Link>
                </ListItemButton>
            </List>
            <Divider />
        </Box>
    )
}

export default SideMenu