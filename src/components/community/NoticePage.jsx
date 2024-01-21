import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Spinner } from 'react-bootstrap';
import { Button } from '@mui/material';
import { FaPlus } from "react-icons/fa6";


const NoticePage = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const categoryid = 101;

    const getList = async() => {
        setLoading(true);
        const res = await axios.get('/community/list?categoryid=' + categoryid);
        //console.log(res.data);
        const addList = res.data.map(item => ({ ...item, body: false}));
        setList(addList);
        setLoading(false);
    }

    useEffect(() => {
        getList();
    }, []);

    const onClickPlus = (index) => {
        const addList = [...list];
        addList[index].body = !addList[index].body;
        setList(addList);
    }

    const onClickNotice = () => {
        if(sessionStorage.getItem("userid") === '2fa0017c-053b-4983-8'){
            window.location.href='/admin/adno';
        }
    }

    if(loading) return <div className='text-center my-5'><Spinner/></div>

    return (
        <div className='p-5'>
            <Col className='justify-content-center'>
                <table width={850}>
                    <thead>
                        <tr>
                            <th>공지사항</th>
                        </tr>
                    </thead><br/>
                    <tbody>
                        {list.map((n, index) =>
                        <>
                            <tr key={n.categoryid}>
                                <td>공지</td>
                                <td colSpan={2}>{n.title}</td>
                                <td>{n.regdate}</td>
                                <td onClick={()=> onClickPlus(index)}><FaPlus/></td>
                            </tr><br/>
                            {n.body &&
                                <tr>
                                    <td colSpan={5} width={200} height={300}>
                                        {n.content.split('\n').map((line, index) =>(
                                            <Fragment key={index}>
                                                {line}
                                                <br/>
                                            </Fragment>
                                        ))}
                                    </td>
                                </tr>
                            }
                        </>
                        )}
                        
                    </tbody>
                </table>
            </Col>
            <div className='text-end mt-5'>
                {sessionStorage.getItem("userid") === '2fa0017c-053b-4983-8' &&
                    <Button onClick={onClickNotice} variant='contained' size='small'>공지등록</Button>
                }
            </div>
        </div>
    )
}

export default NoticePage