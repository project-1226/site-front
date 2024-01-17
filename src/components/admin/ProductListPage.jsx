import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Form, InputGroup, Spinner, Table } from 'react-bootstrap';
import '../../css/adminnotice.css'

const ProductListPage = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("고구마");
    const [cnt, setCnt] = useState(0);
    

    const getList = async() => {
        setLoading(true);
        const res = await axios.get(`/admin/product/list?page=${page}&size=5&query=${query}`);
        //console.log(res.data);

        let data = res.data.items.map(p=> p && {...p, name:stripHtmlTags(p.title), price:p.lprice});
        data= data.map(item=>item && {...item, checked:false});
        setList(data);
        setLoading(false);
        //console.log(list);
    }

    useEffect(() => {
        getList();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        if(query === ""){
            alert("검색어를 입력하세요.");
        }else{
            getList();
        }
    }

    //HTML 태그 제거하는 함수
    const stripHtmlTags = (htmlString) => {
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        return doc.body.textContent || "";
    }

    const onSave = async(name, price) => {
        //console.log(name);
        //console.log(price);
        
        if(window.confirm("상품을 등록할까요?")){
            await axios.post("/admin/insert/product", {name, price});
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
                        await axios.post(`/admin/insert/product`, item);
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
            <Col md={3} className='mt-5'>
                <form onSubmit={onSubmit}>
                    <InputGroup>
                        <Form.Control onChange={(e)=> setQuery(e.target.value)} placeholder='상품명' value={query} />
                        <Button type='submit' variant='outlined' size='small'>검색</Button>
                    </InputGroup>
                </form>
            </Col>
            <Col className='text-end'>
                <Button onClick={onCheckedSave}>선택저장</Button>
            </Col>
            <Table className='mt-3' style={{width:'1000px'}}>
                <thead>
                    <tr>
                        <th><input type='checkbox' onChange={onChangeAll} checked={list.length === cnt} /></th>
                        <th>Brand</th>
                        <th>title</th>
                        <th>가격</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(p=>
                        <tr key={p.productId}>
                            <td><input type='checkbox' onChange={(e)=> onChangeSingle(e, p.productId)}
                                checked={p.checked} /></td>
                            <td>{p.brand}</td>
                            <td ><div className='ellipsis_adpro'>{p.name}</div></td>
                            <td>{p.lprice}</td>
                            <td><Button onClick={()=> onSave(p.name, p.price)} variant='contained' size='small'>등록</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default ProductListPage