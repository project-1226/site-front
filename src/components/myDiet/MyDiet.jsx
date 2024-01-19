import React, { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Backdrop, CircularProgress } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel';
import DietModal from './DietModal';
import { MdChevronRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//함수(IngredientArrayMaker:하나의인수만,IngredientsArraytMaker2개 이상인수 가능)
import { IngredientArrayMaker, IngredientsArraytMaker } from './IngredientArrayMaker'


// MyDiet 컴포넌트 정의
const MyDiet = ({ setIsHeader, setIsFooter }) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const navigate = useNavigate();

  const [myFoods, setMyFoods] = useState([]);
  const [selectedMyFood, setSelectedMyFood] = useState("");
  // const [ingredientList, SetIngredientList] = useState([]);

  const getMyList = async () => {
    setLoading(true);
    const res = await axios("/food/my_food_list?userid=" + sessionStorage.getItem("userid"));
    setMyFoods(res.data);
    setSelectedMyFood(res.data[0]); //myFoods[0]안됨
    setLoading(false);
  }

  useEffect(() => {
    getMyList();
  }, [])

  //myFoods(0,3)의 name뽑아서?
  const recipeTitle = ["연어샐러드", "포케샐러드", "닭가슴살 샐러드"];


  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDayButtonClick = (day) => {
    setSelectedDay(day);
    setSelectedMyFood(myFoods[day - 1]);
    //console.log(selectedMyFood);
  };

  const handleCart = async () => {  
      let ingreList = IngredientArrayMaker(selectedMyFood?.ingredients);
      if(ingreList.length > 0){
        alert(ingreList)
      //ingredint배열과 userid를 묶어서보내면 받기어려워서 그냥 한 배열에 합쳐서보냄
      ingreList.push(sessionStorage.getItem("userid"))
      const res = await axios.post("/cart/insert-list",ingreList);
      
      const notice = window.confirm(`${res.data}개의 상품이 등록되었습니다.\n 장바구니로 이동하시겠습니까?`)
      if(res.data > 0 ){
        if(notice){
          navigate("/cart")
        }
      }else if(res.data = 0){
        alert("식단에 해당하는 재료의 상품이 없습니다.")
      }else {
        console.error("insert ingredients error."); // 이경우..흠 try catch?
      }          
    } else {
      console.error("No ingreList.");
    }
  };

  return (
    <div className='diet_wrap'>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="main_box">
        <div className="main_calendar">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </div>{/* main_calendar */}

        <div className='date_plan'>
          <div className='date_plan_datebtn'>
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <button key={day} onClick={() => {
                handleDayButtonClick(day);
              }}
                className={selectedDay === day ? 'selected' : ''}>
                {`${day}일차`}
              </button>
            ))}
          </div>

          <div className='date_plan_img'>
            {/* 아름 -제목한번추가해봄 
          <div className='text-center'><h3>{selectedMyFood.name}</h3> </div> */}

            <div className='date_plan_imgbox'>
              <div className='date_plan_title'>
                <p>{selectedMyFood.name}</p>
              </div>
              <img src={selectedMyFood.image} />
            </div>
          </div>

          <div className='date_plan_btn_wrap'>
            <button onClick={handleImageClick}> 자세히보기 <MdChevronRight /></button>
            <button onClick={handleCart}> 재료담기 <MdChevronRight /></button>
          </div>
        </div>{/* date_plan */}
      </div>{/* main_box */}

      <div className='diet_contents'>
        <section className='diet_recipe'>
          <div className="contents_title_box">
            <p className="contents_title">내 식단 레시피 보러가기</p>
          </div>

          <div className='recipe_video_wrap'>
            {/*  map이 함수 내에서 JSX를 반환할 때 중괄호 {} 대신 괄호 ()를 사용해야함..!!!!*/}
            {/* iframe으로할지 react-youtube사용할지 결정해야함 */}
            {myFoods.slice(0, 3).map((food) => (
              <iframe key={food?.vidioid} className='recipe_video' width="400" height="315" src={`https://www.youtube.com/embed/${food?.vidioid}`} title={food?.name} frameBorder="0" allowFullScreen />
            ))}
          </div>

          <div className='diet_market_contents_bg'></div>
        </section>{/* diet_recipe */}

        <section className='diet_review'>
          <div className="contents_title_box">
            <p className="contents_title">리뷰 모아보기</p>
          </div>

          <div className='mydiet_review_wrap'>
            <Carousel data-bs-theme="dark" interval={null}>
              <Carousel.Item className='mydiet_carousel'>
                <div className='carousel_textwrap'>
                  <div className='carousel_text_top'>
                    <div className='carousel_text_top_user'>
                      <img src="/image/user_icon.png" alt="" />
                      <p> 고**님 </p>
                    </div>

                    <p className='carousel_text_star'> ★★★★★ </p>
                  </div>

                  <div className='carousel_text_btm'>
                    <p>
                      <strong>식당구성이 너무 좋아요!</strong>질리지 않은데다 조리법도 알려줘서 너무 좋아요.<br />
                      특히나 제가 무릎이 안좋아서 과한 운동을 하지 못하는데, 일주일도 안되어 6kg이 빠졌어요!!!
                    </p>
                  </div>
                </div>
              </Carousel.Item>

              <Carousel.Item className='mydiet_carousel'>
                <div className='carousel_textwrap'>
                  <div className='carousel_text_top'>
                    <div className='carousel_text_top_user'>
                      <img src="/image/user_icon.png" alt="" />
                      <p> 유**님 </p>
                    </div>

                    <p className='carousel_text_star'> ★★★★★ </p>
                  </div>

                  <div className='carousel_text_btm'>
                    <p>
                      <strong>식당구성이 너무 좋아요!</strong>질리지 않은데다 조리법도 알려줘서 너무 좋아요.<br />
                      특히나 제가 무릎이 안좋아서 과한 운동을 하지 못하는데, 일주일도 안되어 6kg이 빠졌어요!!!
                    </p>
                  </div>
                </div>
              </Carousel.Item>

              <Carousel.Item className='mydiet_carousel'>
                <div className='carousel_textwrap'>
                  <div className='carousel_text_top'>
                    <div className='carousel_text_top_user'>
                      <img src="/image/user_icon.png" alt="" />
                      <p> 김**님 </p>
                    </div>

                    <p className='carousel_text_star'> ★★★★★ </p>
                  </div>

                  <div className='carousel_text_btm'>
                    <p>
                      <strong>식당구성이 너무 좋아요!</strong>질리지 않은데다 조리법도 알려줘서 너무 좋아요.<br />
                      특히나 제가 무릎이 안좋아서 과한 운동을 하지 못하는데, 일주일도 안되어 6kg이 빠졌어요!!!
                    </p>
                  </div>
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
                <ul className='diet_market_right_ul'>
                  <div className='diet_market_right_box'>
                    <img src='/image/mydiet2.jpg' alt="" />

                    <div className='diet_market_right_text'>
                      <p className='diet_market_right_title'> 오스테리아밀즈 콜드파스타 </p>
                      <p className='diet_market_right_price'> <span>20%</span> <strong>10,000</strong>원 </p>
                    </div>
                  </div>

                  <div className='diet_market_right_cart_icon'>
                    <img src="/image/cart.png" alt="" />
                  </div>

                  <div className='diet_market_right_present_icon'>
                    <img src="/image/present.png" alt="" />
                  </div>
                </ul>

                <ul className='diet_market_right_ul'>
                  <div className='diet_market_right_box'>
                    <img src="/image/mydiet3.png" alt="" />

                    <div className='diet_market_right_text'>
                      <p className='diet_market_right_title'> 더 부드러운 수제고기완자 </p>
                      <p className='diet_market_right_price'> <span>10%</span> <strong>4,200</strong>원 </p>
                    </div>
                  </div>

                  <div className='diet_market_right_cart_icon'>
                    <img src="/image/cart.png" alt="" />
                  </div>

                  <div className='diet_market_right_present_icon'>
                    <img src="/image/present.png" alt="" />
                  </div>
                </ul>

                <ul className='diet_market_right_ul'>
                  <div className='diet_market_right_box'>
                    <img src="/image/mydiet4.jpg" alt="" />

                    <div className='diet_market_right_text'>
                      <p className='diet_market_right_title'> 3無 순한 짜장소스 </p>
                      <p className='diet_market_right_price'> <span>15%</span> <strong>4,250</strong>원 </p>
                    </div>
                  </div>

                  <div className='diet_market_right_cart_icon'>
                    <img src="/image/cart.png" alt="" />
                  </div>

                  <div className='diet_market_right_present_icon'>
                    <img src="/image/present.png" alt="" />
                  </div>
                </ul>

                <ul className='diet_market_right_ul'>
                  <div className='diet_market_right_box'>
                    <img src="/image/mydiet5.jpg" alt="" />

                    <div className='diet_market_right_text'>
                      <p className='diet_market_right_title'> 궁중 떡볶이 </p>
                      <p className='diet_market_right_price'> <span>10%</span> <strong>7,110</strong>원 </p>
                    </div>
                  </div>

                  <div className='diet_market_right_cart_icon'>
                    <img src="/image/cart.png" alt="" />
                  </div>

                  <div className='diet_market_right_present_icon'>
                    <img src="/image/present.png" alt="" />
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>{/* diet_contents */}
      <DietModal show={isModalOpen} onHide={handleCloseModal} selectedMyFood={selectedMyFood} selectedDay={selectedDay} />
    </div>
  );
}

export default MyDiet;