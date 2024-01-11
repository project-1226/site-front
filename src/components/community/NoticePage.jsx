import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Row, Table } from 'react-bootstrap';
import { Button } from '@mui/material';
import { FaPlus } from "react-icons/fa6";

const NoticePage = () => {
    const [content, setContent] = useState(false);
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

    const onClickPlus = () => {
        setContent(!content);
    }

    const onClickNotice = () => {
        if(sessionStorage.getItem("userid") === 'admin'){
            window.location.href='/admin/adno';
        }
    }

    return (
        <div className='my-5 ms-5'>
            <Col className='justify-content-center'>
                <table width={850}>
                    <thead>
                        <tr>
                            <th>공지사항</th>
                        </tr>
                    </thead><br/>
                    <tbody>
                        <tr>
                            <td>공지</td>
                            <td colSpan={2}>사이트 이용 약관</td>
                            <td>2023-12-30</td>
                            <td onClick={onClickPlus}><FaPlus/></td>
                        </tr><br/>
                        {content &&
                            <tr>
                                <td colSpan={5} width={200} height={300}>
                                    detail content
                                </td>
                            </tr>
                        }
                        <tr>
                            <td>공지</td>
                            <td colSpan={2}>개인 정보 보호 관련 안내</td>
                            <td>2024-01-01</td>
                            <td><FaPlus/></td>
                        </tr>
                    </tbody>
                </table>
            </Col>
            <div className='text-end mt-5'>
                {sessionStorage.getItem("userid") === 'admin' &&
                    <Button onClick={onClickNotice} variant='contained' size='small'>공지등록</Button>
                }
            </div>
        </div>
    )
}

export default NoticePage