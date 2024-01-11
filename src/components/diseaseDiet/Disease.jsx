import React, { useState, useEffect } from 'react'
import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import Carousel from 'react-bootstrap/Carousel';

import axios from 'axios';
import DiseaseModal from './DiseaseModal';

const Disease = () => {
  const [tags, setTags] = useState([]);
  const [selectTag, setSelectTag] = useState("");
  const [foods, setfoods] = useState("");
  const [selectedFoods, setSelectedFoods] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //예시데이터
  //선택한 태그(where절조건으로)로 필터링한데이터중 랜덤으로 하나만 가져오는 예시데이터
  const data = {
    "신장실환": { image: "신장실환 신장실환", ingredients: '신장실환 신장실환, 신장실환,....신장실환' },
    "위암식단": { image: "위암식단 사진이미지이이이이", ingredients: '잡곡 100g, 양배추40g,....etc' }
  }
  const getDiseaseFoodList = async () => {
    setLoading(true);
    try {
      let res = await axios('/food/list?categoryid=' + selectTag.categoryid);
      setfoods(res.data);
      console.error(res.data)
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  }
  //질환식단 카테고리 
  const getTags = async () => {
    try {
      const res = await axios('/food/categories/disease');
      setTags(res.data);
      console.log(res.data)

      const randomIndex = Math.floor(Math.random() * res.data.length);
      setSelectTag(res.data[randomIndex]);
      console.log(res.data[randomIndex])
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      //getFoodList();
    }
  };

  const handleMenuClick = (food) => {
    setSelectedFoods(food);
    setIsModalOpen(true);
  };
  const handleMoreClick = () => {
    window.location.href = `disease/diseasedetail/${selectTag.categoryid}`;
  }

  //페이지 첫랜더링시 tags가져와서 selectTag 램덤으로지정 
  useEffect(() => {
    getTags();
  }, [])
  useEffect(() => {
    getDiseaseFoodList();
  }, [selectTag])



  return (
    <div className='disease_wrap'>
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

          {foods.slice(0, 3).map((food) =>
            food.categoryid == selectTag.categoryid ?
              <div className='recomm_menuimg'>
                <Card className='recomm_menuimg_main' onClick={() => handleMenuClick(food)}>
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
      <DiseaseModal show={isModalOpen} handleClose={() => setIsModalOpen(false)} selectedFoods={selectedFoods} />
    </div>
  )
}

export default Disease