import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner, Col } from 'react-bootstrap';
import { Button } from '@mui/material';

const AdminNoticeList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectNotice, setSelectNotice] = useState(null); //수정시 모달창?
    const categoryid = '101';

    const getList = async() => {
        setLoading(true);
        const res = await axios.get(`/admin/list?categoryid=${categoryid}`);
        //console.log(res.data);

        let data = res.data.map(n=> n && {...n, checked: false});
        setList(data);
        
        setLoading(false);
    }

    useEffect(() => {
        getList();
    }, []);

    const handleEditClick = (notice) => {//수정버튼 눌렀을때
        setSelectNotice(notice);
    }

    const onDelete = async(postid) => {
        if(window.confirm(`${postid}번 공지를 삭제할까요?`)){
            //await axios.post(`/admin/deletePost?postid=` + postid);
            //alert("삭제완료!");
            //getList();
        }
    }

    if(loading) return <div className='my-5 text-center'><Spinner/></div>

    return (
        <div className='my-5 ms-5'>
            <Col className='justify-content-center'>
                <table width={850}>
                    <thead className='p-2'>
                        <tr>
                            <th>공지사항</th>
                        </tr>
                    </thead><br/>
                    <tbody>
                        {list.map(n =>
                        <>
                            <tr key={n.categoryid}>
                                <td colSpan={2}>[{n.postid}] {n.title}</td>
                                <td>{n.regdate}</td>
                                <td>{n.content}</td>
                                <td>
                                    <div>
                                        <Button>수정</Button>
                                        <Button onClick={()=> onDelete(n.postid)} >삭제</Button>
                                    </div>
                                </td>
                            </tr><br/>
                        </>
                        )}
                        
                    </tbody>
                </table>
            </Col>
        </div>
    )
}

export default AdminNoticeList