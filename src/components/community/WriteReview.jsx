import { Button } from '@mui/material'
import React, { useRef, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'

const WriteReview = () => {
    const [body, setBody] = useState('');

    //사진 선택
    const ref_file = useRef(null); 

    //실제 업로드할 파일
    const file = null; 

    //파일 이름
    const photo = ''; 

    const onChangeFile = (e) => {
        //photo: URL.createObjectURL(e.target.files[0])
        //file: e.target.files[0] 
    }

    const onUpdatePhoto = () => {
        if(!file){
            alert("사진을 선택하세요!");
        }
    }

    const onSave = () => {
        if(body == ""){
            alert("후기 내용을 입력하세요!");
        }else{
            //후기 등록 작업
            const res = '/';

        }
    }

    return (
        <div className='my-5'>
            <h5 className='text-center mb-3'>후기 등록 페이지</h5>
            <Row className='justify-content-center mx-3'>
                <Col md={6}>
                    <Card className='text-center p-3'>
                        <div>
                            <img onClick={()=> ref_file.current.click()}
                                src='http://via.placeholder.com/300x150' />
                            <input type='file' ref={ref_file} onChange={onChangeFile} style={{display:'none'}} />
                            <br/>
                            <Button onClick={onUpdatePhoto}
                                className='mt-2' variant='contained' size='small'>사진 등록</Button>
                        </div>
                        <Col className='mt-3'>
                            <textarea className='form-control' rows={10} placeholder='내용을 입력하세요.' />
                        </Col>
                    </Card>
                    <div className='text-center'>
                        <Button type='reset' className='mt-3' variant='outlined'>취소</Button>
                        <Button onClick={onSave}
                            type='submit' className='mt-3 ms-4' variant='contained'>등록</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default WriteReview