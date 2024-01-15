import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Box } from '@mui/material';
import { Card, Form, InputGroup } from 'react-bootstrap'
import axios from 'axios';

const ReviewEditModal = ({ show, hide, reviewData, postid, getReview }) => {
    const [data, setData] = useState('');
    const [form, setForm] = useState({
        categoryid: '102',
        userid: sessionStorage.getItem("userid"),
        title: '',
        content: ''
    });

    const {categoryid, userid, title, content} = form;

    const ref_file = useRef(null);
    const [file, setFile] = useState(null);
    const [src, setPhoto] = useState('');


    const onChangeFile = (e) => {
        setPhoto(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }

    const onUpdatePhoto = async() => {
        if(window.confirm("사진을 등록할까요?")){
            const formData = new FormData();
            formData.append("file", file);

            await axios.post('/', formData);
            alert("등록완료!");
        }
    }

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        if(window.confirm("수정된 내용을 저장할까요?")){
            await axios.post("/community/update", form);
            alert("수정완료!");
            hide();

            const updateData = await axios(`/community/read/review?postid=${postid}`);
            setData(updateData);

            getReview();
        }
    }

    useEffect(()=> {
        if(show && reviewData){
            setForm({
                categoryid: '102',
                postid: postid,
                userid: sessionStorage.getItem("userid"),
                title: reviewData.title,
                content: reviewData.content
            });
        }
    }, [show, reviewData, postid]);


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
                    <h6>[{postid}]</h6>
                    <Card className='text-center p-3' style={{ width: '100%' }}>
                        <form onSubmit={onSubmit}>
                            <div style={{ width: '100%' }}>
                                <img onClick={() => ref_file.current.click()}
                                    src={src || 'http://via.placeholder.com/200x100'} width='200px' height='100px' />
                                <input type='file' ref={ref_file} onChange={onChangeFile} style={{ display: 'none' }} />
                                <br />
                                <Button onClick={onUpdatePhoto}
                                    className='mt-2' variant='contained' size='small'>사진 변경</Button>
                            </div>
                            <div>
                                <InputGroup className='mt-3' style={{ width: '80%' }}>
                                    <InputGroup.Text>제목</InputGroup.Text>
                                    <Form.Control name='title' value={title} onChange={onChange} />
                                </InputGroup>
                                <InputGroup className='mt-2' style={{ width: '80%' }}>
                                    <InputGroup.Text>작성자</InputGroup.Text>
                                    <Form.Control name='userid' value={userid} onChange={onChange} />
                                </InputGroup>
                                <textarea className='form-control mt-2' name='content' value={content}
                                    onChange={onChange} rows={10} placeholder='내용을 입력하세요.' />
                            </div>
                            <div className='text-center mt-5'>
                                <Button type="reset" onClick={hide} variant='outlined'>취소</Button>
                                <Button type="submit" className='ms-3' variant='contained'>수정</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </Box>
        </Modal>
    )
}

export default ReviewEditModal