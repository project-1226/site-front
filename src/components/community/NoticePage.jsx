import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Table } from 'react-bootstrap';

const NoticePage = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getList = async() => {
        setLoading(true);
        const res = await axios.get('/');
        setList(res.data.list);
        setLoading(false);
    }

    useEffect(()=> {
        getList();
    }, []);


    return (
        <div className='my-5 ms-5'>
            <div className='text-center'>
                <Table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Writer</th>
                            <th>Regdate</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>공지</td>
                            <td>사이트 이용 약관</td>
                            <td>관리자</td>
                            <td>2023-12-30</td>
                            <td>50</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default NoticePage