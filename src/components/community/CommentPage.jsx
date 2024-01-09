import React, { useEffect, useState } from 'react'
import { Card, Col, Row, CardBody, CardTitle, CardText } from 'react-bootstrap'
import { Button, List, ListItem, ListItemText, ListItemAvatar,
         Avatar, Typography, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useParams } from 'react-router-dom';


const CommentPage = () => {
    const {commentid} = useParams();
    const [body, setBody] = useState('');
    const [total, setTotal] = useState(0);

    //댓글 목록 가져오기
    const getCommentList = () => {
        const res = '/';
        
    }

    useEffect(() => {
        getCommentList();
    }, []);

    const onClickWrite = () => {
        window.location.href='/login';
    }

    const onCommentSave = () => {
        if(body == ""){
            alert("댓글 내용을 입력하세요.");
            
        }else{
            //댓글 등록 작업
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
            <Row className='justify-content-center p-3'>
                <div className='my-3'>Review 상세페이지</div>
                <Card style={{width: '250%', height: 'auto'}}>
                    <CardBody>
                        <div className='mb-3 ms-3'>
                        <CardTitle className='text-center'>title</CardTitle>
                        <Card.Subtitle className='text-end'>(userid) / (regdate)</Card.Subtitle><hr/>
                        <CardText>review 읽어오기 <br/>
                            .....review
                        </CardText>
                        </div>
                    </CardBody>
                </Card>

                {!sessionStorage.getItem("uid") ?
                    <div className='mt-5 text-end'><Button onClick={onClickWrite} variant='contained'>댓글 작성</Button></div>
                    :
                    <div className='mt-5' style={{width: '200%'}}>
                        <label>댓글쓰기</label>
                        <textarea className='form-control mt-2'
                            rows={3} placeholder='댓글 내용을 입력하세요.' />

                        <div className='text-end mt-2'>
                            <Button onClick={onCommentSave}
                                className='btn_comment_save' variant='contained' size='small'>등록</Button>
                        </div>
                    </div>
                }
                <div className='comment_list mt-5'>
                    <p>댓글 {total}</p>
                    <List sx={{ width: '200%', maxWidth: 360, bgcolor: 'Background.paper' }}>
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
                                            (userid) / (regdate) 
                                            <span className='text-end ms-2'>
                                                <FavoriteIcon onClick={()=> onClickFavorite()} fontSize='small'/>10</span>
                                        </Typography><br/>
                                        {" — I'll be in your neighborhood doing errands this…"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="user2" src="/static/images/avatar/2.jpg" />
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
                                            (userid) / (regdate)
                                            <span className='text-end ms-2'><FavoriteBorderOutlinedIcon fontSize='small'/> 0</span>
                                        </Typography><br/>
                                        {" — Wish I could come, but I'm out of town this…"}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="user3" src="/static/images/avatar/3.jpg" />
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
                                            (userid) / (regdate)
                                        </Typography><br/>
                                        {' — Do you have Paris recommendations? Have you ever…'}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </List>
                </div>
            </Row >
        </div>
    )
}

export default CommentPage