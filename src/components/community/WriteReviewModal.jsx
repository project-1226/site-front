import React, { useRef, useState } from 'react'
import { Modal, Button, Box } from '@mui/material';
import { Card, Form, InputGroup } from 'react-bootstrap'
import axios from 'axios';
import ImageUploader from './ImageUploader'


const WriteReviewModal = ({ show, hide, updateReviewList }) => {
    const [loading, setLoading] = useState(false);

    let [form, setForm] = useState({
        categoryid: '102',
        userid: sessionStorage.getItem("userid"),
        title: '',
        content: ''
    });

    const { categoryid, userid, title, content } = form;


    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    // 자식 컴포넌트 함수 호출!!!
    const uploaderRef = useRef(null);
    const onSubmit = async () => {
        setLoading(true);

        try {
            const [imageNames, uploadedURLs] = await uploaderRef.current.onUpload();
            // console.log(uploadedURLs);

            if (uploadedURLs) {
                form = {
                    userid: sessionStorage.getItem("userid"),
                    title,
                    content,
                    image_names: imageNames.join(","),
                    image_urls: uploadedURLs.join(","),
                };
                console.log(form);
            }
            if(content === ""){
                alert("내용을 입력하세요!");
            }else{
                await axios.post("/community/insert/review", form);
                setLoading(false);
                alert("후기가 등록되었습니다.");
                hide();
                updateReviewList();
            }
        }catch (error) {
            setLoading(false);
            console.log("insert review:", error);
            alert("리뷰 등록이 실패하였습니다.\n관리자에게 문의해주세요.");
        }
    };
            

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
                    <h6>[후기등록]</h6>
                    <Card className='text-center p-3' style={{ width: '100%' }}>
                        <form onSubmit={onSubmit}>
                            <div style={{ width: '100%' }}>
                                <ImageUploader ref={uploaderRef} />
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
                            <div className='text-center mt-2'>
                                <Button type="reset" onClick={hide} variant='outlined'>취소</Button>
                                <Button type="submit" className='ms-3' variant='contained'>등록</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </Box>
        </Modal>
    )
}

export default WriteReviewModal