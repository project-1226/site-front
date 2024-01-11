import React, { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap'
import { Button, List, ListItem, ListItemText, ListItemAvatar,
         Avatar, Typography, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import axios from 'axios';
import { useParams } from 'react-router-dom'


const CommentPage = () => {
    const [body, setBody] = useState('');
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [commentList, setCommentList] = useState([]);

    const {pid} = useParams();

    const [review, setReview] = useState('');

    const {postid, userid, title, content, image, regdate} = review;

    const getReview = async() => {
        setLoading(true);
        const res = await axios(`/community/read?postid=${pid}`);
        console.log(res.data);
        setReview(res.data);
        setLoading(false);
    }


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
    }, []);

    const onClickWrite = () => {
        window.location.href='/login';
    }

    const onCommentSave = async() => {
        if(body === ""){
            alert("댓글 내용을 입력하세요.");
        }else{
            //댓글 등록 작업
            const data = {postid, body, userid:sessionStorage.getItem("userid")};
            await axios.post('/community/insert/comment', data);
            alert("댓글 등록!");
            getCommentList();
        }
    }

    const onClickFavorite = (commentid) => {
        if(sessionStorage.getItem("uid")){
            //좋아요 작업
        }else{
            //sessionStorage.getItem("uid") == "null"
            //window.location.href="/login";
        }
    }
    return (
        <div>
            <div className='my-3'>Review 상세페이지</div>
            <Row className='justify-content-center p-3'>
                <Card className='p-3' style={{width: '80%', height: '70%'}}>
                    <div>
                        <p className='text-center'>{title}</p>
                        <div className='text-end'>([{userid}] / [{regdate}])</div>
                        <br/>
                    </div>
                    <div>
                        <div>{image}</div>
                        <div>{content}</div>
                    </div>
                </Card>
                
 
                {!sessionStorage.getItem("uid") ?
                    <div className='mt-5 text-end'><Button onClick={onClickWrite} variant='contained'>댓글 작성</Button></div>
                    :
                    <div className='mt-5' style={{width: '150%'}}>
                        <label>댓글쓰기</label>
                        <textarea className='form-control mt-3' onChange={(e)=> setBody(e.target.value)} 
                            rows={3} placeholder='댓글 내용을 입력하세요.' value={body} />

                        <div className='text-end mt-2'>
                            <Button onClick={onCommentSave}
                                className='btn_comment_save' variant='contained' size='small'>등록</Button>
                        </div>
                    </div>
                }
                <div className='comment_list mt-5'>
                    <p>댓글 {total}</p>
                    <List sx={{ width: '200%', maxWidth: 360, bgcolor: 'Background.paper' }}>

                    {commentList.map((r)=>
                    <>
                        <ListItem alignItems='flex-start'>
                                <ListItemAvatar>
                                    <Avatar alt="user1" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {r.userid} / {r.regdate}
                                                <span className='text-end ms-2'>
                                                    <FavoriteIcon onClick={()=> onClickFavorite()} fontSize='small'/>10</span>
                                            </Typography><br/>
                                            {r.content}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                    </>    
                    )}
                        
                    </List> 
                </div>
            </Row>
        </div>
    )
}

export default CommentPage