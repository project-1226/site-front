// Healthcare.jsx
import React, { useState,useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import HealthcareModal from './HealthcareModal';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import healthcareImage from '../../images/healthcare_img.jpg';
import healthcareImage2 from '../../images/healthcare_img2.jpg';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';

const Healthcare = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [categories,setCategories] = useState([]);
  
  
  const getCategories = async () => {
    try {
      //food페이지에서 카테고리가져오는 api공유
      const res = await axios(`/food/categories/exercise`);
      setCategories(res.data);
      console.log(res.data)
      // const randomIndex = Math.floor(Math.random() * res.data.length);
      // setSelectTag(res.data[randomIndex]);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      //카테고리들고와서 하는 내용
    }
  };
  
  useEffect(() => {
    getCategories();
  }, [])
  
  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='healthcare_wrap'>
      <div className="healthcare_main">
        <div className="h_main_title_wrap">
          <p>IT DOESN'T GET EASIER.</p>
          <p>TOU GET BETTER.</p>
        </div>
      </div>
      <div className='healthcare_submain'>
        {categories.slice(0,5).map((category)=>        
          <div className='challenge_box' onClick={() => handleChallengeClick('푸시업 챌린지')}> {category.name} </div>       
        )}      
      </div>

      <div className='healthcare_contents'>
        <section>
          <div className="contents_title_box">
            <p className="contents_title">HOME TRAINING</p>
          </div>

          <div className='healthcare_video_wrap'>
            <div className='healthcare_video'>운동 영상</div>
            <div className='healthcare_video'>운동 영상</div>
            <div className='healthcare_video'>운동 영상</div>
          </div>
        </section>

        <section className='healthcare_review_wrap'>
          <div className="contents_title_box">
            <p className="contents_title"> 오운완 챌린지 </p>
            <p className="contents_subtitle"> 챌린지를 도전해 1등을 차지해보세요! </p>
          </div>

          <div className='healthcare_review'>
            <Carousel data-bs-theme="dark" interval={null}>
              <Carousel.Item>
                <div className='carousel_imgwrap'>
                  <Card sx={{ maxWidth: 345 }} className='healthcare_card'>
                    <CardMedia component="img" height="194" image={healthcareImage} alt="오운완" />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary"> #오운완 </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>

                  <Card sx={{ maxWidth: 345 }} className='healthcare_card'>
                    <CardMedia component="img" height="194" image={healthcareImage} alt="오운완" />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary"> #오운완 </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>

                  <Card sx={{ maxWidth: 345 }} className='healthcare_card'>
                    <CardMedia component="img" height="194" image={healthcareImage} alt="오운완" />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary"> #오운완 </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>

                  <Card sx={{ maxWidth: 345 }} className='healthcare_card'>
                    <CardMedia component="img" height="194" image={healthcareImage} alt="오운완" />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary"> #오운완 </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div className='carousel_imgwrap'>
                  <Card sx={{ maxWidth: 345 }} className='healthcare_card'>
                    <CardMedia component="img" height="194" image={healthcareImage2} alt="오운완" />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary"> #오운완 </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>

                  <Card sx={{ maxWidth: 345 }} className='healthcare_card'>
                    <CardMedia component="img" height="194" image={healthcareImage2} alt="오운완" />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary"> #오운완 </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>

                  <Card sx={{ maxWidth: 345 }} className='healthcare_card'>
                    <CardMedia component="img" height="194" image={healthcareImage2} alt="오운완" />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary"> #오운완 </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>

                  <Card sx={{ maxWidth: 345 }} className='healthcare_card'>
                    <CardMedia component="img" height="194" image={healthcareImage2} alt="오운완" />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary"> #오운완 </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </section>
      </div>
      <HealthcareModal show={isModalOpen} handleClose={handleCloseModal} selectedChall={selectedChallenge} />
    </div>
  );
}

export default Healthcare;
