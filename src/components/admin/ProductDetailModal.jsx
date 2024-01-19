import React, { useEffect, useState } from 'react'
import { Modal, Box, Button } from '@mui/material'
import axios from 'axios'
import { Form, InputGroup } from 'react-bootstrap'


const ProductDetailModal = ({ show, hide, product }) => {
    const [loading, setLoading] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const productid = product.productid;

    const [form, setForm] = useState({
        name: '',
        price: '',
        content: ''
    });

    const { name, price, content} = form;

    const onChange = (e) => {
        if(e.target.name === 'price'){
            const value = e.target.value.replace(/[^0-9]/g, ''); //숫자 이외의 모든 문자값 제거 정규식
            setForm({
                ...form,
                [e.target.name]:value
            });

        }else{
            setForm({
                ...form,
                [e.target.name]:e.target.value
            });
        }
    }

    const getImage = async() => {
        setLoading(true);
        const res = await axios.get("/admin/imageList?productid=" + productid);
        //console.log(res.data);
        setImageList(res.data);
        setLoading(false);
    }

    useEffect(() => {
        getImage();
    }, []);

    const handleClick = () => {
        setEditOpen(!editOpen);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(window.confirm(`${productid}번 상품정보를 수정할까요?`)){
            //상품정보 수정작업

        }
    }

    const onEditCancel = () => {
        setEditOpen(false);
        setForm({ name: '', price: '', content: ''});
    }

    const onDelete = (productid) => {
        if(window.confirm(`${productid}번 상품을 삭제할까요?`)){
            //상품 삭제 작업
        }
    }

    return (
        <Modal
            open={show}
            onClose={hide}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 800, height: 700, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4
            }}>
                <div className='justify-content-center'>
                    <h6>[{product.productid}]</h6>
                    <form style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{marginRight: '8px'}}>
                            {/* {imageList.map((i)=>
                                <img src={i.image_url}/>
                            )} */}

                            {product.image_url ?
                                <img src={product.image_url} width='280px' height='200px' />
                                :
                                <img src='http://via.placeholder.com/280x200' />
                            }
                        </div>
                        <div className='text-center' 
                            style={{display: 'flex', flexDirection: 'column', marginBottom: '30px'}}>
                            <div style={{ marginBottom: '10px' }}>{product.name}</div>
                            <div style={{ marginBottom: '10px' }}>{product.fmtprice}원</div>
                            <div style={{ whiteSpace: 'pre-line'}}>{product.content}</div>
                        </div>
                    </form>
                    <div className='text-center my-3'>
                        <Button onClick={handleClick} variant='outlined'>수정하기</Button>
                        <Button onClick={()=> onDelete(productid)} className='ms-3' variant='outlined' color='error'>삭제하기</Button>
                    </div>
                    {editOpen && (
                        <>
                            <form onSubmit={onSubmit} style={{ width: '70%' }}>
                                <InputGroup className='mt-5'>
                                    <InputGroup.Text>상품명</InputGroup.Text>
                                    <Form.Control name='name' value={name} onChange={onChange} />
                                </InputGroup>
                                <InputGroup className='mt-2'>
                                    <InputGroup.Text>가격</InputGroup.Text>
                                    <Form.Control name='price' value={price} onChange={onChange} />
                                </InputGroup>
                                <textarea className='form-control mt-2' name='content' 
                                    rows={5} placeholder='내용을 입력하세요.' value={content} onChange={onChange} />
                                <div className='text-center mt-5'>
                                    <Button onClick={onEditCancel} type="reset" variant='outlined'>취소</Button>
                                    <Button type="submit" className='ms-3' variant='contained'>수정</Button>
                                </div>
                            </form>
                        </>
                        
                    )}
                </div>
            </Box>
        </Modal>
    )
}

export default ProductDetailModal