import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { Button } from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../css/adminnotice.css"

const AdminNotice = () => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: '',
        userid: '',
        content: ''
    });

    const {title, userid, content} = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }


    const onSubmit = async(e) => {
        e.preventDefault();
        if(window.confirm("등록할까요?")){
            await axios.post('/admin/insert', form);
            alert("등록 완료!");
            navi('/community');
        }
    }

    if(loading) return <div className='my-5'>loading...</div>

    return (
        <div className='notice_register my-5'>
            <div className='mb-3'>[공지 등록]</div>
                <form onSubmit={onSubmit} className='mt-4'>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>제목</InputGroup.Text>
                        <Form.Control name='title' value={title} onChange={onChange}/>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputGroup.Text>작성자</InputGroup.Text>
                        <Form.Control name='userid' value={userid} onChange={onChange} />
                    </InputGroup>
                    <textarea className='form-control mt-3' name='content' value={content}
                        onChange={onChange} rows={7} placeholder='내용을 입력하세요.' />
                    <div className='text-center mt-5'>
                        <Button type="reset" variant='outlined' color='error'>취소</Button>
                        <Button type="submit" className='ms-3' variant='contained'>등록</Button>
                    </div>
                </form>
        </div>
    )
}

export default AdminNotice