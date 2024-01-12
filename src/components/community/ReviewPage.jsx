import React, { useEffect, useState } from 'react'
import { Col, Spinner } from 'react-bootstrap'
import { Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';


const ReviewPage = () => {
    const navi = useNavigate();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    //const [favoriteCnt, setFavoriteCnt] = useState(0);
    const categoryid = 102;

    const getList = async() => { //review list 가져오기
        setLoading(true)
        const res = await axios.get("/community/list?categoryid=" + categoryid);
        // , {
        //     params: {categoryid}
        // });
        console.log(res.data);
        setList(res.data);
        setLoading(false);
    }

    useEffect(()=> {
        getList();
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
                        {list.map((r)=>
                        <>
                            <tr key={r.categoryid}>
                                <td>{r.postid}</td>
                                <td><Link to={`comment/${r.postid}`}>{r.title}</Link></td>
                                <td>{r.userid}</td>
                                <td>{r.regdate}</td>
                                <td>11</td>
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