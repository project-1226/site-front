import React, { useState } from 'react';

import ai1 from '../../images/aia001.png'
import ai2 from '../../images/aia002.png'
import ai3 from '../../images/aia003.png'
import ai4 from '../../images/aia004.png'
import ai5 from '../../images/aia005.png'
import ai6 from '../../images/aia006.png'
import ai7 from '../../images/aia007.png'
import ai8 from '../../images/aiex001.png'
import ai9 from '../../images/aiex002.png'
import ai10 from '../../images/aiex003.png'
import Chatbot from '../chatbot/Chatbot';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Paper, TextField, Stack, ImageList, Box, Item } from '@mui/material';


const AiList = () => {
  const navigate = useNavigate(); // 수정된 위치
  const [books, setBooks] = useState([
    { bid: 1, title: '스쿼트', image: 'http://via.placeholder.com/170x250', rcnt: 10 },
    { bid: 2, title: '플랭크', image: 'http://via.placeholder.com/170x250', rcnt: 5 },
    { bid: 3, title: '등등', image: 'http://via.placeholder.com/170x250', rcnt: 5 },
    { bid: 4, title: '머머', image: 'http://via.placeholder.com/170x250', rcnt: 5 },

    // 추가 도서 정보...
  ]);



  const handleRestartClick = () => {
    // excount 상태를 1 증가시킨 후 업데이트
    navigate('/aisquat')
  };

  return (
    <div className='ak_wrap'>
      <div className='ak_aicontents'>
        <div className='text-center'>
          <div className='ak_img_contents'>
            <img src={ai1} alt="이미지 설명" />
            <img src={ai2} alt="이미지 설명" />
            <img src={ai3} alt="이미지 설명" />
            <img src={ai4} alt="이미지 설명" />
            <img src={ai5} alt="이미지 설명" />
            <img src={ai6} alt="이미지 설명" />
            <img src={ai7} alt="이미지 설명" />
          </div>

          <Stack direction="row" spacing={0} className='ak_grid_img_wrap'>
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <img src={ai8} alt="이미지 설명" onClick={handleRestartClick} className='ak_grid_img'/>
              </Grid>
              <Grid item xs={6} md={4}>
                <img src={ai9} alt="이미지 설명" className='ak_grid_img'/>
              </Grid>
              <Grid item xs={6} md={4}>
                <img src={ai10} alt="이미지 설명" className='ak_grid_img'/>
              </Grid>
            </Grid>
          </Stack>
          <Chatbot />
        </div>
      </div>
    </div>
  )
}

export default AiList