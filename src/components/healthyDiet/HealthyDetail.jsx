
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useParams,useLocation } from 'react-router-dom';
import HealthyDetailModal from './HealthyDetailModal';
import RecipeModal from '../myDiet/RecipeModal';

//useNavigate두번째 인자로 getFoodList()함수도 props로 전달가능하면 이후 수정
const HealthyDetail = ({ initialFoods }) => {
  const { tag } = useParams;
  const location = useLocation();
  const [foods, setFoods] = useState(location.state?.initialFoods || []);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood,setSelectedFood] = useState("");

  const getFoodList = async () => {
    setLoading(true);
    try {
      let res = await axios("/food/list?categoryid=" + tag);
      setFoods(res.data);
      console.error(res.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initialFoods가 없는 경우에만 데이터를 새로 불러옴
    if (!location.state?.initialFoods) {
      getFoodList();
    }
    console.log(foods);
  }, [location.state?.initialFoods]);

  const handleDetailClick = (food) => {
    setIsModalOpen(true);
    setSelectedFood(food)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="healthyDetail_wrap">
      {/* 로딩 */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {foods.map((food, index) => (
        <section key={index} className="healthyDetail_section">
          {index % 2 == 0 ? (
            <div className="hd_img">
              <img src={food.image} alt="" />
            </div>
          ) : null}
          <div className="hd_text_box">
            <p className="hd_title">홈메이드 레시피</p>
            <p className="hd_name">{food.name} 재료</p>
            <p className="hd_material">{food.ingredients}</p>
            <p className="hd_recipe" dangerouslySetInnerHTML={{ __html: `${food.recipe}` }}></p>
            <Button variant="contained" size="small"  onClick={()=>handleDetailClick(food)}>
              {" "}
              레시피 보러가기{" "}
            </Button>
          </div>

          {index % 2 == 1 ? (
            <div className="hd_img">
              <img src={food.image} alt="" />
            </div>
          ) : null}
        </section>
      ))}
      {/* <HealthyDetailModal show={isModalOpen} onHide={handleCloseModal}/> */}
      <RecipeModal show={isModalOpen} setIsRecipeModalOpen ={handleCloseModal} selectedDay={0} selectedMyFood={selectedFood} />
    </div>
  );
};

export default HealthyDetail;
