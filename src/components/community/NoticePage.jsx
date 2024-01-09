import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Row, Table } from 'react-bootstrap';
import { Button } from '@mui/material';

const NoticePage = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getList = async () => {
        setLoading(true);
        const res = await axios.get('/');
        setList(res.data.list);
        setLoading(false);
    }

    useEffect(() => {
        getList();
    }, []);


    const onClickNotice = () => {
        //sessionStorage.getItem("userid") === 'admin'
        window.location.href='/admin/adno';
    }

    return (
        <div className='my-5 ms-5'>
            <Col className='justify-content-center'>
                <table width={750} className='text-center'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Writer</th>
                            <th>Regdate</th>
                            <th>Count</th>
                        </tr>
                    </thead><br/>
                    <tbody>
                        <tr>
                            <td>공지</td>
                            <td>사이트 이용 약관</td>
                            <td>관리자</td>
                            <td>2023-12-30</td>
                            <td>50</td>
                        </tr><br/>
                        <tr>
                            <td>공지</td>
                            <td>개인 정보 보호 관련 안내</td>
                            <td>관리자</td>
                            <td>2024-01-01</td>
                            <td>11</td>
                        </tr>
                    </tbody>
                </table>
            </Col>
            <div className='text-end mt-5'>
                <Button onClick={onClickNotice} variant='contained' size='small'>공지등록</Button>
            </div>
        </div>
    )
}

export default NoticePage