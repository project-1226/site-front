import { Button } from '@mui/material'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { Card, Col, Form, InputGroup } from 'react-bootstrap'
import ImageUploader from '../community/ImageUploader'

const ProductRegisterPage = () => {
    const [loading, setLoading] = useState(false);

    let [form, setForm] = useState({
        name: '',
        price: '',
        content: ''
    });

    const { name, price, content } = form;
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const uploaderRef = useRef(null);
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const [imageNames, uploadedURLs] = await uploaderRef.current.onUpload2();
            //console.log(uploadedURLs);

            if (uploadedURLs) {
                const updateForm = {
                    name: '',
                    price: '',
                    content: '',
                    image_names: imageNames.join(","),
                    image_urls: uploadedURLs.join(","),
                };
                //console.log(form);
                setForm(updateForm);

                if(window.confirm("상품을 등록할까요?")){
                    await axios.post("/admin/insertProR", updateForm);
                    alert("상품등록 완료!");
                }
            }
        }catch (error) {
            setLoading(false);
            console.log("상품등록 오류:", error);
            alert("상품등록 실패");
        }
    };

    return (
        <div className='my-4 ms-5'>
            <Col className='justify-content-center'>
                <h5 className='mb-4'> [상품등록] </h5>
                <Card className='text-center p-4' style={{width: '750px', height: '500px'}}>
                    <form onSubmit={onSubmit} 
                        className='mt-3 justify-content-center' style={{width: '90%', margin: '0 auto'}}>
                        <div>
                           <ImageUploader ref={uploaderRef} /> 
                        </div>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>상품명</InputGroup.Text>
                            <Form.Control name="name" value={name} onChange={onChange}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>상품가격</InputGroup.Text>
                            <Form.Control name="price" value={price} onChange={onChange}/>
                        </InputGroup>
                        <InputGroup className='mb-2'>
                            <InputGroup.Text>정보</InputGroup.Text>
                            <Form.Control as="textarea" rows="3" name="content" value={content} onChange={onChange}/>
                        </InputGroup>
                        <div className='mt-3'>
                            <Button type='submit' variant="contained" size="sm">등록</Button>
                        </div>
                    </form>
                </Card>
            </Col>
        </div>
    )
}

export default ProductRegisterPage;