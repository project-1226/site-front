import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Spinner, Table } from 'react-bootstrap';

const AdminOrderList = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const getList = async() => {
        setLoading(true);
        const res = await axios.get('/');
        setList(res.data.list);
        setLoading(false);
    }

    useEffect(()=> {
        getList();
    }, []);


    if(loading) return <div><Spinner/></div>

    return (
        <div className='my-5 ms-5'>
            <Row className='justify-content-center'>
                <Table>
                    <thead className='text-center p-2'>
                        <tr>
                            <th>주문번호</th>
                            <th>주문자명 / (userid)</th>
                            <th>전화번호</th>
                            <th>배송지</th>
                            <th>주문상품</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0001</td>
                            <td>홍길동 / userid</td>
                            <td>010-1234-5678</td>
                            <td>제주도 한림읍 210-2</td>
                            <td>닭가슴살 외 2종</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
        </div>
    )
}

export default AdminOrderList