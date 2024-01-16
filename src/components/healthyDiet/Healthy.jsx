import React, { useEffect, useState } from 'react'
import HealthyModal from './HealthyModal';
import {Backdrop, Button, CircularProgress,
} from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LuRefreshCcw } from "react-icons/lu";



const Healthy = ({pagetype}) => {
  const navi = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState('');
  const [foods, setFoods] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectTag, setSelectTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  let [text,setText] = useState({});
  

  const TextMaker =()=>{
    if(pagetype =="disease"){
      setText({"title" : "질환맞춤식단","subtitle":"재료 선정부터 조리까지 섬세하게 ","button":""})  
    }
    if(pagetype =="health"){
      setText({"title" : "건강식단","subtitle":"건강 목적과 필요에 따라 골라먹는 "})
    }
  }

  const getTags = async () => {
    try {
      const res = await axios(`/food/categories/${pagetype}`);
      setTags(res.data);
      console.log(res.data)
      const randomIndex = Math.floor(Math.random() * res.data.length);
      setSelectTag(res.data[randomIndex]);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      getFoodList();
    }
  };

  const getFoodList = async () => {
    setLoading(true);
    try {
      let res = await axios('/food/list?categoryid=' + selectTag.categoryid);
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
    navi(`/health/healthydetail/${selectTag.categoryid}`, {
      state: { initialFoods: foods },
    });

  };

  const handleTagClick = (tag) => {
    setSelectTag(tag)
  };

  const handleRefreshClick = () => {
    setRefresh(refresh + 1)
  }
  useEffect(() => {
    getTags();
    TextMaker();
  }, [pagetype])

  useEffect(() => {
    getFoodList();
  }, [selectTag, refresh,pagetype])

  return (

    <div className='healthy_wrap'>     
      <div className='healthy_main_wrap'>
        <div className={`${pagetype}_main`}>
          <div className="main_text_box">
            <p className="main_subtitle"> {text.subtitle} </p>
            <p className="main_title"> {text.title} </p>

            <p className="main_article"> 오늘의 추천메뉴 [ {selectTag.name} ] </p>
            <Button className='refresh_btn' variant="contained" size="small" onClick={() => handleRefreshClick()}> refresh </Button>
          </div>
        </div>{/* healthy_main */}

        <div className='recomm_card_wrap'>
          {/* card수정 - 아름 2024.1.10 */}

          {foods.slice(0, 3).map((food) =>
            food.categoryid == selectTag.categoryid ?
              <div className='recomm_card'>
                <div className='recomm_card_img' onClick={() => handleMenuClick(food)}>
                  <img src={food.image} alt="" />
                </div>
                <p className='recomm_card_foodname'>{food.name}</p>
                <div className='recomm_card_footer' onClick={() => handleMoreClick()}>
                  <div>
                    <div variant="h7" component="div"> 식단더알아보기 &nbsp; &nbsp; +</div>
                  </div>
                </div>
              </div>
              :
              <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
              </Backdrop>
          )}
        </div>
      </div>{/* healthy_main_wrap */}

      {/* categoryTags box  페이지따라 다르게 나열*/}
      {pagetype =="health"?
      <div className={`${pagetype}_tag_box`}>        
      {tags.map((tag) => (
        tag.categoryid == selectTag.categoryid ?
          <Button key={tag.name} variant="outlined" size="small" onClick={() => setSelectTag(tag)}>
            {tag.name}
          </Button>
          :
          <Button key={tag.categoryid} variant="contained" size="small" onClick={() => handleTagClick(tag)}>
            {tag.name}
          </Button>
      ))}
    </div>      
      :
      <>
      <div className={`${pagetype}_tag_box`}>        
        {tags.slice(0,6).map((tag) => (
          tag.categoryid == selectTag.categoryid ?
            <Button key={tag.name} variant="outlined" size="small" onClick={() => setSelectTag(tag)}>
              {tag.name}
            </Button>
            :
            <Button key={tag.categoryid} variant="contained" size="small" onClick={() => handleTagClick(tag)}>
              {tag.name}
            </Button>
        ))}
      </div>
      <div className={`${pagetype}_tag_box`}>        
      {tags.slice(6).map((tag) => (
        tag.categoryid == selectTag.categoryid ?
          <Button key={tag.name} variant="outlined" size="small" onClick={() => setSelectTag(tag)}>
            {tag.name}
          </Button>
          :
          <Button key={tag.categoryid} variant="contained" size="small" onClick={() => handleTagClick(tag)}>
            {tag.name}
          </Button>
      ))}
    </div>
    </>
      }
      
      {/* categoryTags box */}
    
      {/* 카테고리 대표식단 세부내용++  */}
      {/* 로딩되는동안 유지될 box추가해야함 */}
      <div className='healthy_tag_detail'>
        <div className='healthy_tag_detail_titlebox'>
          <p> MEALJOY </p>
        </div>
        {foods.length > 0 && foods[0].categoryid == selectTag.categoryid &&
          <div className='healthy_tag_detail_contents'>
            <p className='healthy_detail_contents_name'>{foods[0].name}</p>
            <img src={foods.length > 0 && foods[0].image} alt="" className='healthy_tag_detail_image' />
            <p className='healthy_detail_contents_article'><strong>상세설명: &nbsp;</strong>{foods[0].description}</p>
          </div>
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