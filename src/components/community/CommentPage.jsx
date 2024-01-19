import React, { useEffect, useState } from 'react'
import { Card, Row, Spinner } from 'react-bootstrap'
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import ReviewEditModal from './ReviewEditModal';


const CommentPage = () => {
    const {pid} = useParams();
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [content, setContent] = useState('');
    const [total, setTotal] = useState(0);
    const [updateContent, setUpdateContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const categoryid = '102';
    
    const [imageList, setImageList] = useState([]);
    
    const {postid, nickname, title, content: reviewContent, regdate} = review;

    const getReview = async() => {
        setLoading(true);
        const res = await axios(`/community/read/review?postid=${pid}&categoryid=${categoryid}`);
        //console.log(res.data);
        setReview(res.data);
        setLoading(false);

        const totalRes = await axios(`/community/total/comment?postid=${pid}`);
        setTotal(totalRes.data);
        //console.log(totalRes.data);

        const imageRes = await axios(`/community/image_list?postid=${pid}`);
        setImageList(imageRes.data);
        //console.log(imageRes.data);
    }
    
    const updatePostCnt = async() => {
        await axios(`/community/update/cnt?postid=${pid}`);
    }

    useEffect(()=> {
        getReview();
    }, []);


    //후기 수정 모달창 open
    const onClickEditReview = () => {
        setIsModalOpen(true);
    }

    const closeEditReview = () => {
        setIsModalOpen(false);
        getReview();
    }


    //후기 삭제
    const onClickDeleteReview = async(postid) => {
        if(window.confirm(`${postid}번 후기를 삭제할까요?`)){
            await axios.post(`/community/delete?postid=` + postid);
            alert("삭제완료!");
            window.location.href='/community/review';
        }
    }

    //댓글 목록 가져오기
    const getCommentList = async() => {
        const res = await axios(`/community/read/comment?userid=${sessionStorage.getItem("userid")}&postid=${pid}`);
        //console.log(res.data);
        //setCommentList(res.data);

        let data = res.data.map(r=> r && {...r, view: true, text: r.content});
        setCommentList(data);
        
    }

    useEffect(() => {
        getCommentList();
        updatePostCnt();
    }, []);


    const onCommentSave = async() => {
        if(content === ""){
            alert("댓글 내용을 입력하세요.");
        }else{
            const data = {postid, content, userid:sessionStorage.getItem("userid")};
            //console.log(data);
            await axios.post('/community/insert/comment', data);
            alert("댓글 등록!");
            getCommentList();
            setContent('');
        }
    }

    const onClickFavorite = async(commentid) => {
        if(!sessionStorage.getItem("userid")){
            sessionStorage.setItem("target", `/community/read/comment/${pid}`);
            window.location.href='/login';
        }else{
            //좋아요 추가 작업
            await axios.get(`/community/insert/commentFavorite?commentid=${commentid}&userid=${sessionStorage.getItem("userid")}`);
            alert("좋아요 추가!");
            getCommentList();
            //console.log(commentid);
        }
    }

    //좋아요 취소
    const onClickHeart = async(commentid) => {
        await axios.get(`/community/delete/commentFavorite?userid=${sessionStorage.getItem("userid")}&commentid=${commentid}`);
        alert("좋아요 취소!");
        getCommentList();
    }

    const onClickBody = (commentid) => {
        const result = commentList.map(r=> r.commentid === commentid ? {...r, ellipsis:!r.ellipsis} : r);
        setCommentList(result);
    }
    
    //댓글 수정
    const onClickUpdate = (commentid, content) => {
        //수정할려는 텍스트 기존값 저장
        setUpdateContent(content);

        const data = commentList.map(r=> r.commentid === commentid ? {...r, view:false} : r);
        setCommentList(data);
    }

    const onDelete = async(commentid) => {
        if(window.confirm(`${commentid}번 댓글을 삭제할까요?`)){
            //console.log(commentid);
            await axios.post("/community/delete/comment?commentid=" + commentid);
            getCommentList();
        }
    }

    //댓글 수정 저장
    const onClickSave = async(commentid, text) => {
        if(text === updateContent){
            onClickCancel(commentid);
        }else{
            if(window.confirm(`${commentid}번 댓글을 수정할까요?`)){
                try{
                    await axios.post("/community/update/comment", {commentid, updateContent});
                    alert("수정완료!");
                    //console.log(commentid);
                    //console.log(updateContent);

                    const updateCommentList = commentList.map(r=> r.commentid === commentid ? {...r, view: true, text: updateContent} : r);
                    setCommentList(updateCommentList);
                }catch (error){
                    console.log("댓글 수정시 에러:", error);
                    alert("댓글 수정 중 에러 발생");
                }
            }
        }
    }
    
    const onClickCancel = (commentid) => {
        const data = commentList.map(r=> r.commentid === commentid ? {...r, view:true, content:r.text} : r);
        setCommentList(data);
    }

    if(loading) return <div className='text-center my-5'><Spinner/></div>

    return (
        <div className='my-5'>
            <Row className='p-3'>
                <Card className='p-3' style={{width: '900px', height: 'auto'}}>
                    <div>
                        <p className='text-center'>{title}</p>
                        <div className='text-end ms-3'>
                            <small>작성자 : {nickname}</small><br/>
                            <small>({regdate})</small>
                        </div>
                        <br/>
                    </div>
                    <div className='text-center'>
                        {imageList.map((i)=>
                            <img src={i.image_url} style={{width: '200px', height: '130px', paddingRight:'10px'}} />
                        )}
                        <div className='mt-5'>{reviewContent}</div><br/>
                    </div>
                </Card>

                {sessionStorage.getItem("userid") === review.userid &&
                    <div className='text-end mt-4' style={{width: '80%'}}>
                        <Button onClick={()=> onClickEditReview(postid)} variant='contained' size='small'>수정</Button>
                        <Button onClick={()=> onClickDeleteReview(postid)}
                            className='ms-2' variant='contained' size='small' color='error'>삭제</Button>
                    </div>
                }

                {isModalOpen &&
                    <ReviewEditModal show={isModalOpen} hide={()=> setIsModalOpen(false)} reviewData={review} postid={postid} 
                    getReview={getReview} imageList={imageList} />
                }

                <div className='mt-5' style={{width: '80%'}}>
                    <label>댓글쓰기</label>
                    <textarea className='form-control mt-3' onChange={(e)=> setContent(e.target.value)} 
                        rows={3} placeholder='댓글 내용을 입력하세요.' value={content} />

                    <div className='text-end mt-2'>
                        <Button onClick={onCommentSave}
                            className='btn_comment_save' variant='contained' size='small'>등록</Button>
                    </div>
                </div>

                <div className='comment_list mt-5'>
                    <p>댓글 {total}</p>
                    <div>
                        {commentList.map((r)=>
                            <div key={r.commentid}>
                                <div>
                                    <small>{r.nickname}  ({r.regdate}) / {r.fcnt}</small>
                                    <span className='heart ms-2'>
                                        {r.ucnt < 1 ? 
                                        <FavoriteBorderOutlinedIcon onClick={()=> onClickFavorite(r.commentid)} fontSize='small'/>
                                        : <FavoriteIcon onClick={()=> onClickHeart(r.commentid)} />}
                                    </span>

                                    {r.view ?
                                    <>
                                        <div onClick={()=> onClickBody(r.commentid)} style={{cursor:'pointer'}}>
                                            [{r.commentid}] {r.text}
                                        </div>
                                        {sessionStorage.getItem("userid") === r.userid &&
                                            <div className='text-end' style={{marginRight: '20%'}}>
                                                <Button onClick={()=> onClickUpdate(r.commentid, r.text)} color='success' >수정</Button>
                                                <Button onClick={()=> onDelete(r.commentid)} color='error'>삭제</Button>
                                            </div>
                                        }
                                    </>
                                    :
                                    <div style={{width: '80%'}}>
                                        <textarea className='form-control mt-3' onChange={(e)=> setUpdateContent(e.target.value)} 
                                            rows={3} placeholder='댓글 내용을 입력하세요.' value={updateContent} />
                                        <div className='text-end'>
                                            <Button onClick={()=> onClickSave(r.commentid, r.text)} color='error'>저장</Button>
                                            <Button onClick={()=> onClickCancel(r.commentid)}>취소</Button>
                                        </div>
                                    </div>
                                    }
                                    
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