import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Spinner } from 'react-bootstrap';

const ProductList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const size = 15;
    

    const getList = async() => {
        setLoading(true);
        const res = await axios.get("/admin/productList", {
            params: {page, size},
        });
        //console.log(res.data);
        setList(res.data)
        setLoading(false);

        const totalResult = await axios.get("/admin/total");  
        setTotal(totalResult.data);
        
    }

    useEffect(() => {
        getList();
    }, []);

    if(loading) return <div className='text-center my-5 p-3'><Spinner/></div>

    return (
        <div className='Product_List'>
            <h5 className='mt-3'>Product List</h5>
            <div style={{opacity: '1', transform: '0px, 0px'}}>
                <div className='mt-5'>상품수: {total}</div>
                <div className='table p-1 my-5'>
                    {list.map((p)=>
                        <div style={{width: '15%', display: 'inline-block', margin: '0 10px'}}>
                            <Card>
                                <div className='text-center'><img src={p.image_url} width='100px' height='100px' /></div>
                                <div className='text-center'>[{p.productid}] {p.name}</div>
                                <div className='text-end'>{p.fmtprice}원</div>
                                <div className='ellipsis_adproli'>{p.content}</div>
                            </Card>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default ProductList