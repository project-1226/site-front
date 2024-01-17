import React, { useState, useEffect } from 'react'
import {
  Backdrop,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DiseaseModal from './DiseaseModal';
import { Carousel } from 'react-bootstrap';

const Disease = () => {
  const navi = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState('');
  const [foods, setFoods] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectTag, setSelectTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);
  
  
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
  const getTags = async () => {
    try {
      const res = await axios('/food/categories/disease');
      setTags(res.data);

      const randomIndex = Math.floor(Math.random() * res.data.length);
      setSelectTag(res.data[randomIndex]);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      getFoodList();
    }
  };


  const handleMenuClick = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const handleMoreClick = () => {
    //navigate 함수는 두 번째 인자로 state를 받아 해당 경로로 이동할 때 상태를 전달할 수 있음
    navi(`/disease/diseasedetail/${selectTag.categoryid}`, {
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
  }, [])

  useEffect(() => {
    getFoodList();
  }, [selectTag, refresh])



  return (
    <>
<div className='healthy_wrap'>
      <div className='healthy_main_wrap'>
        <div className='healthy_main'>
          <div className="main_text_box">
            <p className="main_subtitle"> 신재료 선정부터 조리까지 섬세하게 </p>
            <p className="main_title"> 질환 맞춤 식단 </p>

            <p className="main_article"> 오늘의 추천메뉴 </p>
            <p className="main_article">--!!{selectTag.name}!!--</p>
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
          tag.categoryid == selectTag.categoryid ?
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
      <div className='healthy_tag_detail'>
        <div className='healthy_tag_detail_titlebox'>
          <p> MEALJOY </p>
        </div>
        {foods.length > 0 && foods[0].categoryid == selectTag.categoryid &&
          <div className='healthy_tag_detail_contents'>
            <p className='healthy_detail_contents_name'>{foods[0].name}</p>
            <img src={foods.length > 0 && foods[0].image} alt="" className='healthy_tag_detail_image' />
            <p className='healthy_detail_contents_article'>{foods[0].description}</p>
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
    </div>






    <div className='disease_wrap'>
      <div className='healthy_main_wrap'>
        <div className='healthy_main'>
          <div className="main_text_box">
            <p className="main_subtitle"> 신재료 선정부터 조리까지 섬세하게 </p>
            <p className="main_title"> 질환맞춤식단 </p>

            <p className="main_article"> 오늘의 추천메뉴 </p>
            <p className="main_article">--!!{selectTag.name}!!--</p>
          </div>
        </div>{/* healthy_main */}

        <div className='recomm_menu'>
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
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
          )}

        </div>



      </div>{/* healthy_main_wrap */}















      <div className='disease_main_box'>
        <div className='text-center'>
          <h3 className='t1'>신재료 선정부터 조리까지 섬세하게</h3>
          <h1 className='t2'>질환맞춤식단</h1>
          <h5 className='t3'>오늘의 추천메뉴</h5>
        </div>
        <div className='disease_main_plan'>
          <div className='main_plan_box'></div>
          <div className='main_plan_box'></div>
          <div className='main_plan_box'></div>
        </div>
      </div>{/* main_box */}
      <div className='disease_contents'>


        {/* 첫 번째 행의 버튼 */}
        <div className='disease_tag_box'>
          {tags.slice(0, 6).map((tag, index) => (
            <Button
              key={index}
              variant="contained"
              size="small"
              onClick={() => setSelectTag(tag)}
            >
              {tag.name}
            </Button>
          ))}
        </div>
        {/* 두 번째 행의 버튼 */}
        <div className='disease_tag_box'>
          {tags.slice(6, -1).map((tag, index) => (
            <Button
              key={index}
              variant="contained"
              size="small"
              onClick={() => setSelectTag(tag.name)}
            >
              {tag.name}
            </Button>
          ))}
        </div>

        <div className='disease_detail_wrap'>
          <div className='disease_detail_plan'>
            <div className='disease_detail_img'>data[selectTag].image</div>
            <div className='disease_detail_contents'>
              <div className='disease_detail_text'>
                <p>data[selectTag]?.ingredients</p>
              </div>
              <Button variant="contained" size="small" onClick={handleMoreClick}> 자세히보기 </Button>
            </div>
          </div>
        </div>
      </div> {/* disease_contents */}
      <div className='diet_contents'>
        <section className='diet_recipe'>
          <div className="contents_title_box">
            <p className="contents_title">질환별 식단 </p>
          </div>
          {/* YouTubeSearchVideo내에서 iframe에 video관련 className적용 함 */}
          {/* <YouTubeSearchVideo query={selectTag} size={3}/>      */}
        </section>{/* diet_recipe */}

        <section className='diet_review'>
          <div className="contents_title_box">
            {/* 리뷰는 어떻게 샐랙해올거죠? 샐랙해와서 map으로 돌릴것*/}
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
      <DiseaseModal show={isModalOpen} handleClose={() => setIsModalOpen(false)} selectedFood={selectedFood} />
    </div>
    </>
  )
}

export default Disease