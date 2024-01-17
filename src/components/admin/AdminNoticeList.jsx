import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner, Col } from 'react-bootstrap';

const AdminNoticeList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const categoryid = '101';

    const getList = async() => {
        setLoading(true);
        const res = await axios.get(`/admin/list?categoryid=${categoryid}`);
        setList(res.data);
        //console.log(res.data);
        setLoading(false);
    }

    useEffect(() => {
        getList();
    }, []);

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