import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Form, InputGroup, Spinner, Table } from 'react-bootstrap';
import Pagination from "react-js-pagination";
import '../../css/admin.css'
import "./Pagination.css";

const ProductSearchPage = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("저염식단");
    const [cnt, setCnt] = useState(0);
    const [total, setTotal] = useState();
    const size=5;
    

    const getList = async() => {
        setLoading(true);
        const res = await axios.get(`/admin/product/list?page=${page}&size=5&query=${query}`);
        console.log(res.data);

        let data = res.data.items.map(p=> p && {...p, name:stripHtmlTags(p.title), price:p.lprice});
        data= data.map(item=>item && {...item, checked:false});
        setList(data);
        setTotal(res.data.total);
        setLoading(false);
        //console.log(list);
    }

    useEffect(() => {
        getList();
    }, [page]);

    const onSubmit = (e) => {
        e.preventDefault();
        if(query === ""){
            alert("검색어를 입력하세요.");
        }else{
            getList();
        }
    }

    const changeGetList = (cpage) => {
        //console.log(cpage);
        setPage(cpage);
    }

    //HTML 태그 제거하는 함수
    const stripHtmlTags = (htmlString) => {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    }

    const onSave = async(name, price, image, productid) => {
        if(window.confirm("상품을 등록할까요?")){
            await axios.post("/admin/insert/product", {name, price, image_url:image, productid});
            alert("등록완료!");
        }
    }

    const onChangeSingle = (e, productId) => {
        const data = list.map(item=> item.productId === productId ? {...item, checked:e.target.checked} : item);
        setList(data);
    }

    const onChangeAll = (e) => {
        const data = list.map(item=> item && {...item, checked:e.target.checked});
        setList(data);
    }

    const onCheckedSave = async() => {
        if(cnt === 0){
            alert("등록할 상품을 선택하세요!");
        }else{
            if(window.confirm(`${cnt}개 상품을 등록할까요?`)){
                for(const item of list){
                    if(item.checked){
                        await axios.post("/admin/insert/product", {
                            name: item.name,
                            price: item.price,
                            image_url: item.image,
                            productid: item.productid
                        });
                    }
                }
                alert("상품등록 완료!");
                getList();
            }
        }
    }

    useEffect(() => {
        let chk = 0;
        list.forEach(item=> {
            if(item.checked) chk++;
        });
        setCnt(chk);
    }, [list]);


    if(loading) return <div className='text-center my-5'><Spinner/></div>

    return (
        <div className='my-3'>
            <h5 className='mb-3'>상품검색</h5>
            <Col md={4} className='mt-5'>
                <form onSubmit={onSubmit}>
                    <InputGroup>
                        <Form.Control onChange={(e)=> setQuery(e.target.value)} placeholder='상품명' value={query} />
                        <Button type='submit' variant='outlined' size='small'>검색</Button>
                    </InputGroup>
                </form>
            </Col>
            <div className='text-end mx-5' style={{paddingRight: '8%'}}>
                <Button onClick={onCheckedSave} variant='outlined' size='small'>선택저장</Button>
            </div>
            <Table className='mt-3' style={{width:'1100px'}}>
                <thead>
                    <tr>
                        <th className='text-center'><input type='checkbox' onChange={onChangeAll} checked={list.length === cnt} /></th>
                        <th style={{width:'130px'}}>Image</th>
                        <th className='text-center' style={{width:'480px'}}>title</th>
                        <th className='text-center'>가격</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p=>
                        <tr key={p.productId}>
                            <td className='text-center'><input type='checkbox' onChange={(e)=> onChangeSingle(e, p.productId)}
                                checked={p.checked} /></td>
                            <td>
                                {p.image ?
                                    <img src={p.image} width='50px' height='50px' />
                                    :
                                    <img src='http://via.placeholder.com/50x50' />
                                }
                            </td>
                            <td ><div className='ellipsis_adpro'>{p.name}</div></td>
                            <td className='text-center'>{p.lprice}원</td>
                            <div><Button onClick={()=> onSave(p.name, p.price, p.image, p.productid)} variant='contained' size='small'>등록</Button></div>
                        </tr>
                    )}
                </tbody>
            </Table>
                {total > size &&
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={size}
                        totalItemsCount={total}
                        pageRangeDisplayed={10}
                        prevPageText={"‹"}
                        nextPageText={"›"}
                        onChange={(cpage)=>{changeGetList(cpage)}}/>
                }
        </div>
    )
}

export default ProductSearchPage