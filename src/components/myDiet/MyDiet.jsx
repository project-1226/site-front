import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Backdrop, CircularProgress } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import DietModal from "./DietModal";
import YouTubeSearchVideo from "../YouTubeSearchVideo";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//함수(IngredientArrayMaker:하나의인수만,IngredientsArraytMaker2개 이상인수 가능)
import {
  IngredientArrayMaker,
  IngredientsArraytMaker,
} from "./IngredientArrayMaker";

// MyDiet 컴포넌트 정의
const MyDiet = ({ setIsHeader, setIsFooter }) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);
  const navigate = useNavigate();

  const [myFoods, setMyFoods] = useState("");
  const [selectedMyFood, setSelectedMyFood] = useState("");
  const [ingredientList, SetIngredientList] = useState("");

  const getMyList = async () => {
    setLoading(true);
    const res = await axios(
      "/food/my_food_list?userid=" + sessionStorage.getItem("userid")
    );
    setMyFoods(res.data);
    if (res.data.length > 0) {
      setSelectedMyFood(res.data[0]); //myFoods[0]안됨
    }
    setLoading(false);
    console.log(res.data);
    console.log(res.data[0]);
  };

  useEffect(() => {
    setIsFooter(true);
    setIsHeader(true);
    getMyList();
  }, []);

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
    console.log(selectedMyFood);
  };

  const handleCart = async () => {
    if (selectedMyFood) {
      let ingreList = IngredientArrayMaker(selectedMyFood.ingredients);
      // 2024.1.17-아름
      // 1. {ingreList(배열), userid}? -> post로 어떻게 보내고 받을지(자료형)
      // 2. cart에 insert할때 필요한데이터, 어떤 api? ,api날릴때 필요한 파라미터?
      // 3. 2번 선행이후 ingreList로 어떻게 select해올지 쿼리작성(mapper)
      // 4. cart에 insert할때 필요한 VO 수정 or 생성

      //5. 1.과 2. service로 묶기(재료담기 click -> 재료에해당하는 product검색 + cart insert)
      //6 endpoint : navigate('/cart');
      const res = await axios.post("/??????");

      //
    } else {
      // 선택된 음식이 없을 때의 처리
      console.error("No selectedMyFood available.");
    }

    //navigate('/cart');
  };

  return (
    <div className="diet_wrap">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="main_box">
        <div className="main_calendar">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </div>
        {/* main_calendar */}

        <div className="date_plan">
          <div className="date_plan_datebtn">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <button
                key={day}
                onClick={() => handleDayButtonClick(day)}
                className={selectedDay === day ? "selected" : ""}
              >
                {`${day}일차`}
              </button>
            ))}
          </div>

          <div className="date_plan_img">
            {/*아름 -제목한번추가해봄  */}
            {selectedMyFood ? (
              <>
                <div className="text-center">
                  <h3>{selectedMyFood.name}</h3>{" "}
                </div>

                <div className="date_plan_imgbox">
                  <img src={selectedMyFood.image} />
                </div>
              </>
            ) : (
              //원래는 내식단이 없는경우(insert하는 과정이후 페이지 랜더링  -> 수정예정)
              <div className="date_plan_imgbox"></div>
            )}
          </div>

          <div className="date_plan_btn_wrap">
            <button onClick={handleImageClick}> 자세히보기 </button>
            <button onClick={handleCart}> 재료담기 </button>
          </div>
        </div>
        {/* date_plan */}
      </div>
      {/* main_box */}

      <div className="diet_contents">
        <section className="diet_recipe">
          <div className="contents_title_box">
            <p className="contents_title">내 식단 레시피 보러가기</p>
          </div>

          <div className="recipe_video_wrap">
            {/*  map이 함수 내에서 JSX를 반환할 때 중괄호 {} 대신 괄호 ()를 사용해야함..!!!!*/}
            {/* iframe으로할지 react-youtube사용할지 결정해야함 */}
            {myFoods.length != 0 &&
              myFoods
                .slice(0, 3)
                .map((food) => (
                  <iframe
                    key={food?.vidioid}
                    className="recipe_video"
                    width="400"
                    height="315"
                    src={`https://www.youtube.com/embed/${food?.vidioid}`}
                    Title={food?.name}
                    frameBorder="0"
                    allowFullScreen
                  />
                ))}
          </div>
        </section>
        {/* diet_recipe */}

        <section className="diet_review">
          <div className="contents_title_box">
            <p className="contents_title">리뷰 모아보기</p>
          </div>

          <div className="mydiet_review_wrap">
            <Carousel data-bs-theme="dark" interval={null}>
              <Carousel.Item className="mydiet_carousel">
                <div className="carousel_textwrap">
                  <p> 리뷰1 </p>
                </div>
              </Carousel.Item>

              <Carousel.Item className="mydiet_carousel">
                <div className="carousel_textwrap">
                  <p> 리뷰2 </p>
                </div>
              </Carousel.Item>

              <Carousel.Item className="mydiet_carousel">
                <div className="carousel_textwrap">
                  <p> 리뷰3 </p>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </section>
        {/* diet_review */}

        <section className="diet_market">
          <div className="contents_title_box">
            <p className="contents_title">밀조이가 추천드려요!</p>
          </div>

          <div className="diet_market_contents_wrap">
            <div className="diet_market_contents">
              <div className="diet_market_left">
                <img src="/image/mydiet1.jpg" alt="" />
                <div className="diet_market_left_text">
                  <p className="diet_market_left_title"> 등갈비 김치찜 </p>
                  <p className="diet_market_left_price">
                    {" "}
                    <span>15%</span>&nbsp; <strong>21,250</strong>원{" "}
                  </p>
                </div>
                <div className="diet_market_left_cart_icon">
                  <img src="/image/cart.png" alt="" />
                </div>

                <div className="diet_market_left_present_icon">
                  <img src="/image/present.png" alt="" />
                </div>
              </div>

              <div className="diet_market_right">
                <ul>
                  <div className="diet_market_right_box">
                    <img src="/image/mydiet2.jpg" alt="" />

                    <div className="diet_market_right_text">
                      <p className="diet_market_right_title">
                        {" "}
                        오스테리아밀즈 콜드파스타{" "}
                      </p>
                      <p className="diet_market_right_price">
                        {" "}
                        <span>20%</span> <strong>10,000</strong>원{" "}
                      </p>
                    </div>
                  </div>
                </ul>

                <ul>
                  <div className="diet_market_right_box">
                    <img src="/image/mydiet3.png" alt="" />

                    <div className="diet_market_right_text">
                      <p className="diet_market_right_title">
                        {" "}
                        더 부드러운 수제고기완자{" "}
                      </p>
                      <p className="diet_market_right_price">
                        {" "}
                        <span>10%</span> <strong>4,200</strong>원{" "}
                      </p>
                    </div>
                  </div>
                </ul>

                <ul>
                  <div className="diet_market_right_box">
                    <img src="/image/mydiet4.jpg" alt="" />

                    <div className="diet_market_right_text">
                      <p className="diet_market_right_title">
                        {" "}
                        3無 순한 짜장소스{" "}
                      </p>
                      <p className="diet_market_right_price">
                        {" "}
                        <span>15%</span> <strong>4,250</strong>원{" "}
                      </p>
                    </div>
                  </div>
                </ul>
              </div>
            </div>

            <div className="diet_market_contents_bg"></div>
          </div>
        </section>
      </div>
      {/* diet_contents */}
      <DietModal
        show={isModalOpen}
        onHide={handleCloseModal}
        selectedMyFood={1}
      />
    </div>
  );
};

export default MyDiet;
