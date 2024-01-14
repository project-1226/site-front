import React, { useEffect, useState } from 'react'
import { Col, Spinner } from 'react-bootstrap'
import { Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import WriteReview from './WriteReview';


const ReviewPage = () => {
    const navi = useNavigate();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);

    //const [favoriteCnt, setFavoriteCnt] = useState(0);
    const categoryid = 102;

    const getList = async() => {
        setLoading(true)
        const res = await axios.get("/community/list_review");
        //const res = await axios.get("/community/list?categoryid=" + categoryid);
        //console.log(res.data);
        setList(res.data);
        setLoading(false);
    }

    useEffect(()=> {
        getList();
    }, []);

    const onClickList = async(postid) => {
        await axios.post("/community/update/cnt", {postid});
        setCount(count + 1);
        getList();
        console.log(count);
    }


    const onClickReview = () => {
        // if(sessionStorage.getItem("uid") == null){
        //     navi('/login');
        window.location.href= 'rwrite';
        
    }

    if(loading) return <div className='text-center my-5'><Spinner/></div>

    return (
        <div className='my-5 ms-5'>
            <Col className='justify-content-center'>
                <table width={850} className='text-center'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th colSpan={2}>Title</th>
                            <th>Writer</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead><br/>
                    <tbody>
                        {list.map((r)=>
                        <>
                            <tr key={r.categoryid}>
                                <td>{r.postid}</td>
                                <td colSpan={2}><Link to={`comment/${r.postid}`}>{r.title}</Link></td>
                                <td>{r.nickname}</td>
                                <td>{r.regdate}</td>
                                <td>{count}</td>
                            </tr><br />
                        </>    
                        )}
                    </tbody>
                </table>
            </Col>
            <div className='mt-5 text-end'>
                    <Button variant='contained' size='small' onClick={onClickReview}>후기 작성</Button>
            </div>
        </div>
    )
} 

export default ReviewPage