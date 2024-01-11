import React, { useEffect, useState } from 'react'
import HealthyModal from './HealthyModal';
import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Healthy = () => {
  const navi = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState('');
  const [foods,setFoods] = useState([]);
  const [tags,setTags] = useState([]);
  const [selectTag,setSelectTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh,setRefresh] = useState(0);
  

  const getTags = async () => {
    try {
      const res = await axios('/food/categories/health');
      setTags(res.data);
  
      const randomIndex = Math.floor(Math.random() * res.data.length);
      setSelectTag(res.data[randomIndex]);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }finally {
      getFoodList();
    }
  };

  const getFoodList = async()=>{   
    setLoading(true);
    try {
      let res = await axios('/food/health.list?categoryid=' + selectTag.categoryid);
      setFoods(res.data);
      console.error(res.data)
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleMenuClick = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const handleMoreClick = () => {
    //navigate 함수는 두 번째 인자로 state를 받아 해당 경로로 이동할 때 상태를 전달할 수 있음
    navi(`/healthydiet/healthydetail/${selectTag.categoryid}`, {
      state: { initialFoods: foods },    
    });
    
  };

  const handleTagClick = (tag) => {
    setSelectTag(tag)
  };

  const handleRefreshClick=()=>{
    setRefresh(refresh+1)
  }
  useEffect(()=>{
    getTags();
  },[])

  useEffect(()=>{
    getFoodList();
  },[selectTag,refresh])
  
  return (
    
    <div className='healthy_wrap'>
      <div className='healthy_main_wrap'>
        <div className='healthy_main'>
          <div className="main_text_box">
            <p className="main_subtitle"> 건강 목적과 필요에 따라 골라먹는 </p>
            <p className="main_title"> 건강식단 </p>

            <p className="main_article"> 오늘의 추천메뉴 </p>
            <p className="main_article">--!!{selectTag.name}!!--</p>
          </div>
        </div>{/* healthy_main */}

        <div className='recomm_menu'>
          {/* card수정 - 아름 2024.1.10 */}
          
          {foods.slice(0, 3).map((food)=>    
            food.categoryid == selectTag.categoryid ? 
            <div className='recomm_menuimg'>
            <Card  className='recomm_menuimg_main' onClick={() => handleMenuClick(food)}>
            <CardContent>
              <Typography variant="h5" component="div">
                <h4>{food.name}</h4> 
                <img src={food.image} alt="" />
              </Typography>
            </CardContent>
          </Card>         
          <Card className='recomm_menuimg_footer' onClick={() => handleMoreClick()}>
            <CardContent>
              <Typography variant="h7" component="div"> 식단더알아보기 +++</Typography>
            </CardContent>
          </Card>
          </div>
          :
          <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
          </Backdrop>
          )}
          
          <Button
              variant="contained"
              size="small"
              onClick={() => handleRefreshClick()}
            >세가지추천메뉴 refresh버튼</Button>
        </div>

        

      </div>{/* healthy_main_wrap */}

      {/* categoryTags box */}
      <div className='healthy_tag_box'>
          {tags.map((tag) => (
            tag.categoryid === selectTag ?
              <Button
              key={tag.name}
              variant="outlined"
              size="small" 
              onClick={() => setSelectTag(tag)}             
            >
              {tag.name}
            </Button>
            :
            <Button
              key={tag.categoryid}
              variant="contained"
              size="small"
              onClick={() => handleTagClick(tag)}
            >
              {tag.name}
            </Button>   
          ))}
        </div>{/* categoryTags box */}

        {/* 카테고리 대표식단 세부내용++  */}
        {/* 로딩되는동안 유지될 box추가해야함 */}
        <div className='healthy_detail_contents'>
          카테고리식단 세부내용
          {foods.length > 0 && foods[0].categoryid == selectTag.categoryid &&
          <>
              <h1 className='text-center'>{foods[0].name}</h1>
              <img src={foods.length > 0 && foods[0].image} alt="" className='healthy_detail_image'/><div>{foods[0].description}</div>
              </>
          }  
        </div>
      <div className='healthy_contents'>
        <section className='healthy_recipe'>
          <div className="contents_title_box">
            <p className="contents_title">레시피 모아모아</p>
          </div>

          <div className='healthy_video_wrap'>
            <div className='healthy_video'>유튜브 레시피 영상 foods[0].name으로 검색한 영상</div>
            <div className='healthy_video'>유튜브 레시피 영상 foods[1].name으로 검색한 영상</div>
            <div className='healthy_video'>유튜브 레시피 영상 foods[2].name으로 검색한 영상</div>
          </div>
        </section>{/* diet_recipe */}
      </div>

      <HealthyModal show={isModalOpen} handleClose={() => setIsModalOpen(false)} selectedFood={selectedFood} />
    </div>
  )
}

export default Healthy