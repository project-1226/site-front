import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

const Chat = () => {
    
    const [chatOpen, setChatOpen] = useState(false);

    const handleChatOpen = () => setChatOpen(true);
    const handleChatClose = () => setChatOpen(false);

    return (
        <div className='chat'>
            <div>
                <Button onClick={handleChatOpen}>
                <span className='ms-5'>1:1 채팅 상담</span>
                <div className='ms-2'><TextsmsOutlinedIcon/></div>
                </Button>
            </div>
            <div className='chat-body'>
                <div
                    open={chatOpen} onClose={handleChatClose}>
                    <DialogTitle>[1:1채팅 상담]</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            text
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleChatClose}>Close</Button>
                    </DialogActions>
                </div>
            </div>
        </div>
    )
}

export default Chat