import React, { useEffect, useState } from 'react'
import { Modal, Button, Box } from '@mui/material';
import { Table } from 'react-bootstrap';
import axios from 'axios';


const CustomerModal = ({ show, hide }) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getList = async() => {
        setLoading(true);
        const res = await axios.get("/admin/userlist");
        setList(res.data);
        console.log(res.data);
        setLoading(false);
    }

    useEffect(() => {
        getList();
    }, []);
   
    if(loading) return <div>loading....</div>

    return (
        <Modal
            open={show}
            onClose={hide}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 900, height: 700, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4
            }}>
                <div className='text-center'>
                    <h4>회원 목록</h4>
                </div>
                <div className='mt-5'>
                    <Table className='text-center'>
                        <thead>
                            <tr>
                                <th>회원이름</th>
                                <th>아이디</th>
                                <th>전화번호</th>
                                <th>E-mail</th>
                                <th>가입일</th>
                                <th>Point</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(u =>
                                <tr key={u.userid}>
                                    <td>{u.nickname}</td>
                                    <td>{u.userid}</td>
                                    <td>{u.phone}</td>
                                    <td>{u.email}</td>
                                    <td>{u.regdate}</td>
                                    <td>{u.point}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                <br/>
                <div className='text-end mt-3'>
                    <Button onClick={hide} variant='contained' size='sm'>close</Button>
                </div>
            </Box>
        </Modal>
    )
}

export default CustomerModal