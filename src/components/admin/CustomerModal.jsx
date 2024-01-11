import React from 'react'
import { Modal, Button, Box } from '@mui/material';
import { Table } from 'react-bootstrap';


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
                width: 800, height: 700, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4
            }}>
                <div className='text-center'>
                    <h3>회원 목록</h3>
                </div>
                <div className='mt-5'>
                    <Table className='text-center'>
                        <thead>
                            <tr>
                                <th>회원이름</th>
                                <th>아이디</th>
                                <th>전화번호</th>
                                <th>주소</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>홍길동</td>
                                <td>userid</td>
                                <td>010-1234-5678</td>
                                <td>제주도 서귀포시 중문로 123-4</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <br/>
                <div className='text-end'>
                    <Button onClick={hide} variant='contained' size='sm'>close</Button>
                </div>
            </Box>
        </Modal>
    )
}

export default CustomerModal