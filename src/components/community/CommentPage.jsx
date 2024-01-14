import React, { useEffect, useState } from 'react'
import { Card, Row, Spinner } from 'react-bootstrap'
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import axios from 'axios';
import { useParams } from 'react-router-dom'


const CommentPage = () => {
    const {pid} = useParams();
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(false);
    const [commentList, setCommentList] = useState([]);

    const [content, setContent] = useState('');
    const [total, setTotal] = useState(0);
    
    const {postid, nickname, title, content: reviewContent, image, regdate} = review;

    const getReview = async() => {
        setLoading(true);
        const res = await axios(`/community/read/review?postid=${pid}`);
        //console.log(res.data);
        setReview(res.data);
        setLoading(false);

        const totalRes = await axios(`/community/total/comment?postid=${pid}`);
        setTotal(totalRes.data);
        //console.log(totalRes.data);
    }
    
    // const updatePostCnt = async() => {
    //     const data = {postid, content, userid:sessionStorage.getItem("userid")};
    //     console.log(data);
    //     await axios.post('/community/update/cnt', data);
    // }

    useEffect(()=> {
        getReview();
    }, []);


    //댓글 목록 가져오기
    const getCommentList = async() => {
        const res = await axios(`/community/read/comment?postid=${pid}`);
        console.log(res.data);
        setCommentList(res.data);
    }

   

    useEffect(() => {
        getCommentList();
        //updatePostCnt();
    }, []);


    // const onClickWrite = () => {
    //     if(!sessionStorage.getItem("uid")){
    //         window.location.href='/login';
    //     }else{

    //     }
        
    // }

    const onCommentSave = async() => {
        if(content === ""){
            alert("댓글 내용을 입력하세요.");
        }else{
            const data = {postid, content, userid:sessionStorage.getItem("userid")};
            //console.log(data);
            await axios.post('/community/insert/comment', data);
            alert("댓글 등록!");
            getCommentList();
        }
    }

    const onClickFavorite = async() => {
        if(!sessionStorage.getItem("userid")){
            sessionStorage.setItem("target", `/community/read/comment/${pid}`);
            window.location.href='/login';
        }else{
            //좋아요 추가 작업
            await axios.get(`/`);
            alert("좋아요 추가!");
            getCommentList();
        }
    }

    //좋아요 취소
    const onClickHeart = async() => {
        await axios.get(`/`);
        alert("좋아요 취소!");
        getCommentList();
    }


    if(loading) return <div className='text-center my-5'><Spinner/></div>

    return (
        <div className='my-5'>
            <Row className='p-3'>
                <Card className='p-3' style={{width: '80%', height: '80%'}}>
                    <div>
                        <p className='text-center'>{title}</p>
                        <div className='text-end ms-3'>
                            <small>작성자 : {nickname}</small><br/>
                            <small>({regdate})</small>
                        </div>
                        <br/>
                    </div>
                    <div>
                        <div>{image}</div>
                        <div>{reviewContent}</div>
                    </div>
                </Card>
                
 
                {/* {!sessionStorage.getItem("uid") ?
                    <div className='mt-5 text-end'><Button onClick={onClickWrite} variant='contained'>댓글 작성</Button></div>
                    : */}
                    <div className='mt-5' style={{width: '80%'}}>
                        <label>댓글쓰기</label>
                        <textarea className='form-control mt-3' onChange={(e)=> setContent(e.target.value)} 
                            rows={3} placeholder='댓글 내용을 입력하세요.' value={content} />

                        <div className='text-end mt-2'>
                            <Button onClick={onCommentSave}
                                className='btn_comment_save' variant='contained' size='small'>등록</Button>
                        </div>
                    </div>
                {/* } */}
                <div className='comment_list mt-5'>
                    <p>댓글 {total}</p>
                    <div>
                        {commentList.map((r)=>
                            <div key={r.commentid}>
                                <div>
                                    <small>{r.nickname}  ({r.regdate})</small>
                                    <span className='heart'>
                                        
                                        <small className='ms-2'>
                                            <FavoriteBorderOutlinedIcon onClick={()=> onClickFavorite()} fontSize='small'/> 0 </small>
                                    </span>
                                    <div>{r.content}</div>
                                </div>
                                <br/>
                            </div>
                        )}
                    </div>
                </div>
            </Row>
        </div>
    )
}

export default CommentPage