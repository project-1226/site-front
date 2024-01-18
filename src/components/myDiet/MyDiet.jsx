import * as React from 'react';
import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Button } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import DietModal from './DietModal';
import YouTubeSearchVideo from '../YouTubeSearchVideo';
import { useNavigate } from 'react-router-dom';


// MyDiet 컴포넌트 정의
const MyDiet = ({ setIsHeader, setIsFooter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);

  const navigate = useNavigate();

  const recipeTitle = ["연어샐러드", "포케샐러드", "닭가슴살 샐러드"];

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDayButtonClick = (day) => {
    setSelectedDay(day);
  };

  const handleCart = () => {
    navigate('/cart');
  }

  useEffect(() => {
    setIsFooter(true);
    setIsHeader(true);
  }, [])

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
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <button key={day}
                onClick={() => handleDayButtonClick(day)} className={selectedDay === day ? 'selected' : ''}>
                {`${day}일차`}
              </button>
            ))}
          </div>

          <div className='date_plan_img'>
            <div className='date_plan_imgbox'>
              {`${selectedDay}일차 음식 이미지`}
            </div>
          </div>

          <div className='date_plan_btn_wrap'>
            <button onClick={handleImageClick}> 자세히보기 </button>
            <button onClick={handleCart}> 재료담기 </button>
          </div>
        </div>{/* date_plan */}
      </div>{/* main_box */}

      <div className='diet_contents'>
        <section className='diet_recipe'>
          <div className="contents_title_box">
            <p className="contents_title">내 식단 레시피 보러가기</p>
          </div>

          <div className='recipe_video_wrap'>
            <div className='recipe_video'><YouTubeSearchVideo query={recipeTitle[0]} size={1} /></div>
            <div className='recipe_video'><YouTubeSearchVideo query={recipeTitle[1]} size={1} /></div>
            <div className='recipe_video'><YouTubeSearchVideo query={recipeTitle[2]} size={1} /></div>
          </div>
        </section>{/* diet_recipe */}

        <section className='diet_review'>
          <div className="contents_title_box">
            <p className="contents_title">리뷰 모아보기</p>
          </div>

          <div className='mydiet_review_wrap'>
            <Carousel data-bs-theme="dark" interval={null}>
              <Carousel.Item className='mydiet_carousel'>
                <div className='carousel_textwrap'>
                  <p> 리뷰1 </p>
                </div>
              </Carousel.Item>

              <Carousel.Item className='mydiet_carousel'>
                <div className='carousel_textwrap'>
                  <p> 리뷰2 </p>
                </div>
              </Carousel.Item>

              <Carousel.Item className='mydiet_carousel'>
                <div className='carousel_textwrap'>
                  <p> 리뷰3 </p>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </section>{/* diet_review */}

        <section className='diet_market'>
          <div className="contents_title_box">
            <p className="contents_title">밀조이가 추천드려요!</p>
          </div>

          <div className='diet_market_contents_wrap'>
            <div className='diet_market_contents'>
              <div className='diet_market_left'>
                <img src='/image/mydiet1.jpg' alt="" />
                <div className='diet_market_left_text'>
                  <p className='diet_market_left_title'> 등갈비 김치찜 </p>
                  <p className='diet_market_left_price'> <span>15%</span>&nbsp; <strong>21,250</strong>원 </p>
                </div>
                <div className='diet_market_left_cart_icon'>
                  <img src="/image/cart.png" alt="" />
                </div>

                <div className='diet_market_left_present_icon'>
                  <img src="/image/present.png" alt="" />
                </div>
              </div>

              <div className='diet_market_right'>
                <ul>
                  <div className='diet_market_right_box'>
                    <img src='/image/mydiet2.jpg' alt="" />

                    <div className='diet_market_right_text'>
                      <p className='diet_market_right_title'> 오스테리아밀즈 콜드파스타 </p>
                      <p className='diet_market_right_price'> <span>20%</span> <strong>10,000</strong>원 </p>
                    </div>
                  </div>
                </ul>

                <ul>
                  <div className='diet_market_right_box'>
                    <img src="/image/mydiet3.png" alt="" />

                    <div className='diet_market_right_text'>
                      <p className='diet_market_right_title'> 더 부드러운 수제고기완자 </p>
                      <p className='diet_market_right_price'> <span>10%</span> <strong>4,200</strong>원 </p>
                    </div>
                  </div>
                </ul>

                <ul>
                  <div className='diet_market_right_box'>
                    <img src="/image/mydiet4.jpg" alt="" />

                    <div className='diet_market_right_text'>
                      <p className='diet_market_right_title'> 3無 순한 짜장소스 </p>
                      <p className='diet_market_right_price'> <span>15%</span> <strong>4,250</strong>원 </p>
                    </div>
                  </div>
                </ul>
              </div>
            </div>


            <div className='diet_market_contents_bg'></div>
          </div>
        </section>
      </div>{/* diet_contents */}
      <DietModal show={isModalOpen} onHide={handleCloseModal} />
    </div>
  );
}

export default MyDiet;
