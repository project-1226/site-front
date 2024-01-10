import React, { useEffect, useState } from 'react'
import { Table, Row, Col, Spinner } from 'react-bootstrap'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ReviewPage = () => {
    const navi = useNavigate();
    const [review, setReview] = useState([]);
    const [loading, setLoading] = useState(false);
    const [favoriteCnt, setFavoriteCnt] = useState(0);

    const getReviewList = () => { //review list 가져오기
        //setLoading(true)
        const res = '/';
        //setReview(res.data.list);
        

    }

    useEffect(()=> {
        getReviewList();
    }, []);


    const onClickReview = () => {
        // if(sessionStorage.getItem("uid") == null){
        //     navi('/login');
        navi('/community/review/write');
        
    }

    if(loading) return <div className='text-center my-5'><Spinner/></div>

    return (
        <div className='my-5 ms-5'>
            <Col className='justify-content-center'>
                <table width={850} className='text-center'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Writer</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead><br/>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><a href='review/comment'>회원 후기입니다.</a></td>
                            <td>nickname</td>
                            <td>2023-12-30</td>
                            <td>11</td>
                        </tr><br/>
                        <tr>
                            <td>2</td>
                            <td>일주일 식단 후기입니다.</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>5</td>
                        </tr><br/>
                        <tr>
                            <td>3</td>
                            <td>후기</td>
                            <td>24a5a319-3e17-45c7-b</td>
                            <td>2024-01-11</td>
                            <td>9</td>
                        </tr>
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