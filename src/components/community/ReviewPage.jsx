import React, { useEffect, useState } from 'react'
import SideMenu from './SideMenu'
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
        if(sessionStorage.getItem("uid") == null){
            navi('/login');
        }else{
            navi('/community/review/write');
        }
    }

    if(loading) return <div className='text-center my-5'><Spinner/></div>

    return (
        <div>
            <Row>
                <Col md={3}>
                    <SideMenu />
                </Col>
                <Col className='my-5 justify-content-center'>
                    <Table size="sm" width="80%" className='text-center mb-3'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Title</th>
                                <th>Writer</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td><a href='/community/comment'>회원 후기입니다.</a></td>
                                <td>userid</td>
                                <td>2023-12-30</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>no.</td>
                                <td>title</td>
                                <td>wirter</td>
                                <td>regdate</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className='ms-5 text-end'>
                        <Button variant='contained' onClick={onClickReview}>후기 작성</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ReviewPage