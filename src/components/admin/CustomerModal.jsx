import React from 'react'
import { Modal, Button, Box } from '@mui/material';


const CustomerModal = ({ show, hide }) => {
    return (
        <Modal
            open={show}
            onClose={hide}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 600, height: 500, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4
            }}>
                <div>
                    Title
                </div>
                <div>
                    <Button onClick={hide} variant='contained' size='sm'>close</Button>
                </div>
            </Box>
        </Modal>
    )
}

export default CustomerModal