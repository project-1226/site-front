import { Button } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Card, Row, Col, Form } from 'react-bootstrap'

const WriteReview = () => {
    const [body, setBody] = useState('');
    const [list, setList] = useState([]);

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

    const getList = () => { //후기목록 
        const res = '/';
        //setList(res.data.list);
    }

    useEffect(()=> {
        getList();
    }, []);


    const onSave = async() => {
        if(body == ""){
            alert("후기 내용을 입력하세요!");
        }else{
            const data = {userid:sessionStorage.getItem("userid"), body};
            //후기 등록 작업
            await axios.post('/community/insert', data);
            alert("후기 등록완료!")
            setBody("");
            getList();
        }
    }

    return (
        <div className='my-4'>
            <div className='mb-3'>
                <h5> [후기등록] </h5>
            </div>
            <Row className='justify-content-center mx-3 p-3'>

                <Card className='text-center p-3' style={{width: '300%', height: 'auto'}}>
                    <div>
                        <img onClick={()=> ref_file.current.click()}
                            src={src || 'http://via.placeholder.com/300x150'} width= '50%' />
                        <input type='file' ref={ref_file} onChange={onChangeFile} style={{display:'none'}} />
                        <br/>
                        <Button onClick={onUpdatePhoto}
                            className='mt-2' variant='contained' size='small'>사진 등록</Button>
                    </div>
                    <Col className='mt-3'>
                        <Form.Control onChange={(e)=> setBody(e.target.value)} value={body}
                            as="textarea" rows={10} placeholder='내용을 입력하세요.'/>
                    </Col>
                </Card>
                <div className='text-center'>
                    <Button type="reset" className='mt-3' variant='outlined'>취소</Button>
                    <Button onClick={onSave}
                        type="submit" className='mt-3 ms-4' variant='contained'>등록</Button>
                </div>

                
            </Row>
        </div>
    )
}

export default WriteReview