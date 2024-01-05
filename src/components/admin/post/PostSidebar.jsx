import React, { useState } from 'react'
import { Box, List, ListItemText, ListItemButton, Divider, ListItemIcon } from '@mui/material';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';

const PostSidebar = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (e, index) => {
        setSelectedIndex(index);
    }

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List component="nav" aria-label='main mailbox folders'>
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                >
                    <ListItemIcon>
                        <RateReviewOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="공지" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
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

export default PostSidebar