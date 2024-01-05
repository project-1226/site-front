import React, { useEffect, useState } from 'react'
import { Card, Col, Row, CardBody, CardTitle, CardText } from 'react-bootstrap'
import { Button, List, ListItem, ListItemText, ListItemAvatar,
         Avatar, Typography, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


const CommentPage = () => {
    const [body, setBody] = useState('');
    const [total, setTotal] = useState(0);

    const getList = () => {
        const res = '';
    }

    useEffect(() => {
        getList();
    }, []);


    return (
        <>
            <div className='my-3 text-center'>Review 상세페이지</div>
            <Row className='justify-content-center'>
                <Col xs={6} md={5} >
                    <Card>
                        <CardBody>
                            <CardTitle>title</CardTitle>
                            <Card.Subtitle className='ms-2 mb-1 text-end'>userid</Card.Subtitle>
                            <CardText>Review.........................</CardText>
                        </CardBody>
                    </Card>
                    <div className='mt-5'>
                        <label>댓글쓰기</label>
                        <textarea className='form-control mt-2'
                            rows={3} placeholder='댓글 내용을 입력하세요.' />

                        <div className='text-end mt-2'>
                            <Button className='btn_review_save' variant='contained' size='small'>등록</Button>
                        </div>
                    </div>
                    <div className='comment_list mt-3'>
                        <p>댓글 {}</p>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'Background.paper' }}>
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
                                                <span className='text-end ms-2'><FavoriteIcon fontSize='small'/>10</span>
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
                </Col >
            </Row >
        </>
    )
}

export default CommentPage