import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Form, InputGroup, Spinner } from 'react-bootstrap';
import { Button } from '@mui/material';
import ProductDetailModal from './ProductDetailModal';

const ProductList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const size = 5;
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [modalProduct, setModalProduct] = useState([]);

    const getList = async() => {
        setLoading(true);
        const res = await axios.get("/admin/productList", {
            params: {page, size, query},
        });
        //console.log(res.data);
        setList(res.data)
        setLoading(false);

        const totalResult = await axios.get("/admin/total", {params: {query}});  
        setTotal(totalResult.data);
    }

    useEffect(() => {
        getList();
    }, [page]);


    const onSubmit = async(e) => {
        e.preventDefault();
        if(query === ""){
            alert("검색어를 입력하세요.");
        }else{
            getList();
        }
    }

    const onClickDetail = (p) => {
        console.log(p);
        setModalProduct(p);
        setIsOpen(true);
        
    }

    const handleClose = () => {
        setIsOpen(false);
    }


    if(loading) return <div className='text-center my-5 p-3'><Spinner/></div>

    return (
        <div className='Product_List'>
            <h5 className='mt-3'>Product List</h5>
            <div>
                <div className='mt-5'>
                    <form onSubmit={onSubmit}>
                        <InputGroup style={{width:'300px'}}>
                            <Form.Control onChange={(e)=> setQuery(e.target.value)}
                                placeholder='상품명'
                                value={query}/>
                                <Button type='submit' variant='outlined' size='small'>검색</Button>
                        </InputGroup>
                    </form>
                </div>
                <div className='mt-4'>상품수: {total}</div>
                <div className='table my-3'>
                    {list.map((p)=>
                        <div key={p.productid} style={{display: 'inline-block', margin: '0 10px 0px 10px'}}>
                            <Card className='text-center' style={{width:'200px', height:'320px'}}>
                                <div style={{ marginBottom: '5px' }}>
                                    {p.image_url ?
                                        <img src={p.image_url} width='100px' height='100px' />
                                        :
                                        <img src='http://via.placeholder.com/100x100' />
                                    }
                                </div>
                                <div style={{ marginBottom: '5px' }}>
                                    [{p.productid}] {p.name}
                                </div>
                                <div style={{ marginBottom: '5px' }}>
                                    {p.fmtprice}원
                                </div>
                                <div>
                                    <Button onClick={(e)=>onClickDetail(p)}>상세보기</Button>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
            <div className='mt-5'>
                <Button onClick={()=> setPage(page-1)} disabled={page === 1} variant='contained' size='small'>Prev</Button>
                <span className='mx-3'>{page}</span>
                <Button onClick={()=> setPage(page+1)} disabled={page === 3} variant='contained' size='small'>Next</Button>
            </div>
            <ProductDetailModal show={isOpen} hide={handleClose} product={modalProduct} />
        </div>
    )
}

export default ProductList