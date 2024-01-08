import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Row } from 'react-bootstrap'
import { Button } from '@mui/material'

const AdminNotice = () => {
    const [list, setList] = useState([]);

    const getList = () => { //공지사항 목록 가져오기
        const res='/';

    }

    useEffect(()=> {
        getList();
    }, []);
    
    const onClickSave = () => {
        if(window.confirm("등록할까요?")){
            //
            alert("등록 완료!");
        }
    }
    return (
        <div className='my-5'>
            <Row>
                <div className='mb-3'>[공지 등록]</div>
                <form>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>제목</InputGroup.Text>
                        <Form.Control  />
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>작성자</InputGroup.Text>
                        <Form.Control  />
                    </InputGroup>
                    <textarea className='form-control mt-2'
                        rows={7} placeholder='내용을 입력하세요.' />
                </form>
                <div className='text-center mt-3'>
                    <Button variant='outlined' color='error'>삭제</Button>
                    <Button className='ms-2' variant='outlined' color='success'>수정</Button>
                    <Button onClick={onClickSave} className='ms-2' variant='contained'>등록</Button>
                </div>
            </Row>
        </div>
    )
}

export default AdminNotice