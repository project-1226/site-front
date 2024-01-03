import * as React from 'react';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Button } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import DietModal from './DietModal';

// MyDiet 컴포넌트 정의
const MyDiet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='diet_wrap'>
      <div className="main_box">
        <div className="main_calendar">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </div>{/* main_calendar */}

        <div className='date_plan'>
          <div className='date_plan_datebtn'>
            <Button variant="contained" size="small"> 1일차 </Button>
            <Button variant="contained" size="small"> 2일차 </Button>
            <Button variant="contained" size="small"> 3일차 </Button>
            <Button variant="contained" size="small"> 4일차 </Button>
            <Button variant="contained" size="small"> 5일차 </Button>
            <Button variant="contained" size="small"> 6일차 </Button>
            <Button variant="contained" size="small"> 7일차 </Button>
          </div>

          <div className='date_plan_img'>
            <div className='date_plan_imgbox' onClick={handleImageClick}> 음식이미지 </div>
          </div>

          <div className='date_plan_info'>
            <p> <strong>탄수화물</strong> 51g </p>
            <p> <strong>단백질</strong> 30g </p>
            <p> <strong>지방</strong> 9g </p>
          </div>
        </div>{/* date_plan */}
      </div>{/* main_box */}

      <div className='diet_contents'>
        <section className='diet_recipe'>
          <div className="contents_title_box">
            <p className="contents_title">내 식단 레시피 보러가기</p>
          </div>

          <div className='recipe_video_wrap'>
            <div className='recipe_video'>유튜브 레시피 영상</div>
            <div className='recipe_video'>유튜브 레시피 영상</div>
            <div className='recipe_video'>유튜브 레시피 영상</div>
          </div>
        </section>{/* diet_recipe */}

        <section className='diet_review'>
          <div className="contents_title_box">
            <p className="contents_title">리뷰 모아보기</p>
          </div>

          <div className='review_wrap'>
            <Carousel data-bs-theme="dark" interval={null}>
              <Carousel.Item>
                <div className='carousel_textwrap'>
                  <p> 리뷰1 </p>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div className='carousel_textwrap'>
                  <p> 리뷰2 </p>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div className='carousel_textwrap'>
                  <p> 리뷰3 </p>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </section>{/* diet_review */}
      </div>{/* diet_contents */}
      <DietModal show={isModalOpen} onHide={handleCloseModal} />
    </div>
  );
}

export default MyDiet;
