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
    const [cnt, setCnt] = useState(0);
    const getList = async() => {
        setLoading(true);
        const res = await axios.get("/admin/productList", {
            params: {page, size, query},
        });
        //console.log(res.data);
        let data = res.data.map(item => item && {...item, checked:false});
        //console.log(data);
        setList(data)
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
        //console.log(p);
        setModalProduct(p);
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const onChangeAll = (e) => {
        const data = list.map(item=> item && {...item, checked:e.target.checked});
        setList(data);
    }

    const onCheckSingle = (e, productid) => {
        const data = list.map(item => item.productid === productid ? {...item, checked:e.target.checked} : item);
        setList(data);
    };

    useEffect(() => {
        let chk = 0;
        list.forEach(item=> {
            if(item.checked) chk++;
        });
        setCnt(chk);
    }, [list]);

    const onCheckDelete = async(productid) => {
        if(cnt === 0){
            alert("삭제할 상품을 선택하세요!");
        }else{
            if(window.confirm(`${cnt}개 상품을 삭제할까요?`)){
                await axios.post("/admin/deleteProduct", {productid});

                alert("상품 삭제!");
                getList();
            }
        }
    }

    if(loading) return <div className='text-center my-5 p-3'><Spinner/></div>

    return (
        <div className='Product_List'>
            <h6 className='mt-3'>Product List</h6>
            <div>
                <div className='mt-4'>
                    <form onSubmit={onSubmit}>
                        <InputGroup style={{width:'300px'}}>
                            <Form.Control onChange={(e)=> setQuery(e.target.value)}
                                placeholder='상품명'
                                value={query}/>
                                <Button type='submit' variant='outlined' size='small'>검색</Button>
                        </InputGroup>
                    </form>
                </div>
                <div className='mt-4'>상품수: {total}
                    <div className='text-end'>
                        <Button onClick={onCheckDelete} variant='contained' size='small' sx={{ position: 'relative', top: '-35px'}}>선택삭제</Button>
                    </div>
                    <input type='checkbox' onChange={onChangeAll} checked={list.length === cnt} />
                </div>
                <div className='table my-2'>
                    {list.map((p)=>
                        <div key={p.productid} style={{display: 'inline-block', margin: '0 10px 0px 10px'}}>
                            <Card className='text-center' style={{width:'200px', height:'320px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <input type='checkbox' onChange={(e)=> onCheckSingle(e, p.productid)} style={{ alignSelf: 'flex-start', marginLeft: '10px', marginTop: '10px'}}/>
                                <div style={{ marginBottom: '3px', marginTop: '-15px' }}>
                                    {p.image_url ?
                                        <img src={p.image_url} width='100px' height='80px' />
                                        :
                                        <img src='http://via.placeholder.com/100x80' />
                                    }
                                </div>
                                <div style={{ marginBottom: '3px' }}>
                                    [{p.productid}] {p.name}
                                </div>
                                <div style={{ marginBottom: '3px' }}>
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
            <div className='mt-4'>
                <Button onClick={()=> setPage(page-1)} disabled={page === 1} variant='contained' size='small'>Prev</Button>
                <span className='mx-3'>{page}</span>
                <Button onClick={()=> setPage(page+1)} disabled={page === total} variant='contained' size='small'>Next</Button>
            </div>
            <ProductDetailModal show={isOpen} hide={handleClose} product={modalProduct} />
        </div>
    )
}

export default ProductList