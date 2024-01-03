import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Button } from '@mui/material'

const CommentPage = () => {
    const [body, setBody] = useState('');
    const [total, setTotal] = useState(0);

    const getList = () => {
        const res = '';
    }

    useEffect(()=> {
        getList();
    }, []);


    return (
        <div className='text-center my-5'>
            Review 상세페이지
        
        {sessionStorage.getItem("uid") ?
            <div>
                <Form.Control as="textarea" rows={5} placeholder='리뷰 내용을 입력하세요.'/>
                <div>
                    <Button>등록</Button>
                </div>
            </div>
        :
        <div><Button>로그인</Button></div>
        }
    </div>
    )
}

export default CommentPage