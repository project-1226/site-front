import React, { useState } from 'react';

import ai1 from '../../images/ai007.jpg'
import ai2 from '../../images/ai008.jpg'
import ai3 from '../../images/ai009.jpg'
import ai4 from '../../images/ai010.jpg'
import ai5 from '../../images/ai011.jpg'
import ai6 from '../../images/ai012.jpg'
import ai7 from '../../images/ai013.jpg'
import { NavLink } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Paper, TextField, Stack } from '@mui/material';


const AiList = () => {

    const [books, setBooks] = useState([
        { bid: 1, title: '스쿼트', image: 'http://via.placeholder.com/170x250', rcnt: 10 },
        { bid: 2, title: '플랭크', image: 'http://via.placeholder.com/170x250', rcnt: 5 },
        { bid: 3, title: '등등', image: 'http://via.placeholder.com/170x250', rcnt: 5 },
        { bid: 4, title: '머머', image: 'http://via.placeholder.com/170x250', rcnt: 5 },

        // 추가 도서 정보...
      ]);




  return (


    <div className='ak_wrap'>
  <div className='ak_aicontents'>
        <h1>AI 트레이너</h1>
        <hr></hr>
        <h2>목록</h2>
        <div>
        <CardMedia component="img" width="100px" height="500" image={ai1} alt="오운완" />
        </div>
        <CardMedia component="img" width="900" height="500" image={ai2} alt="오운완" />
        <CardMedia component="img" width="900" height="500" image={ai3} alt="오운완" />
        <CardMedia component="img" width="900" height="500" image={ai4} alt="오운완" />
        <CardMedia component="img" width="900" height="500" image={ai5} alt="오운완" />
        <CardMedia component="img" width="900" height="500" image={ai6} alt="오운완" />
        <CardMedia component="img" width="900" height="500" image={ai7} alt="오운완" />
      
 
             </div>
    </div>
  )
}

export default AiList