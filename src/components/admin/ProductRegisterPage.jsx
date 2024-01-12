import { Button } from '@mui/material'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const ProductRegisterPage = () => {
    const {productid} = useParams();
    const ref_productFile = useRef(null);

    const [src, setSrc] = useState('');
    const [file, setFile] = useState(null);

    const onChangeFile = (e) => {
        setSrc(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const onSaveImage = async() => {
        if(window.confirm("사진을 등록할까요?")){
            //사진 등록 작업
            const formData = new FormData();
            formData.append("file", file);
            formData.append("productid", productid);

            await axios.post('/', formData);
            alert("사진등록 완료!");
        }
    }


    const onProductSave = async() => {
        if(window.confirm("상품을 등록할까요?")){
            await axios.post('/');
            alert("상품 등록 완료!");
        }
    }

    return (
        <div className='my-4 ms-5'>
            <Col className='justify-content-center'>
                <h5 className='text-center mb-4'> [상품등록] </h5>
                <Card className='text-center p-4' style={{width: '150%', height: 'auto'}}>
                    <div>
                        <img onClick={()=> ref_productFile.current.click()} 
                            src={src || 'http://via.placeholder.com/150x150'} width= '200' />
                        <input onChange={onChangeFile} type='file' ref={ref_productFile} style={{display: 'none'}}/>
                        <br/>
                        <div className='mt-3'>
                            <Button onClick={onSaveImage} variant='contained'>사진등록</Button>
                        </div>
                    </div>
                        <form className='mt-5 justify-content-center' style={{width: '90%', margin: '0 auto'}}>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>상품명</InputGroup.Text>
                                <Form.Control name="name"/>
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>상품가격</InputGroup.Text>
                                <Form.Control name="price"/>
                            </InputGroup>
                            <InputGroup className='mb-2'>
                                <InputGroup.Text>정보</InputGroup.Text>
                                <Form.Control as="textarea" rows="3" name="info"/>
                            </InputGroup>
                        </form>
                        <div className='mt-3'>
                            <Button onClick={onProductSave} variant="contained" size="sm">등록</Button>
                        </div>
                </Card>
            </Col>
        </div>
    )
}

export default ProductRegisterPage;