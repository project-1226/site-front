import React, { useState,useEffect } from 'react'
import { Button } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel'; 
import YouTubeSearchVideo from "../YouTubeSearchVideo"
import axios from 'axios';

const Disease = () => {
  const [tags,setTags] = useState([]);
  const [selectTag,setSelectTag] = useState("");
  const [diseaseFoods,setDiseaseFoods] = useState("");
  const [loading, setLoading] = useState(false);
  //예시데이터
  //선택한 태그(where절조건으로)로 필터링한데이터중 랜덤으로 하나만 가져오는 예시데이터
  const data = {
    "신장실환": { image: "신장실환 신장실환", ingredients: '신장실환 신장실환, 신장실환,....신장실환' },
    "위암식단": { image: "위암식단 사진이미지이이이이", ingredients: '잡곡 100g, 양배추40g,....etc' }
  }
  const getDiseaseFoodList =()=>{

  }
  //질환식단 카테고리 
  const getTags = async () => {
    try {
      const res = await axios('/food/categories/disease');
      setTags(res.data);
      // console.log(res.data)

      const randomIndex = Math.floor(Math.random() * res.data.length);
      setSelectTag(res.data[randomIndex]);
      console.log(res.data[randomIndex])
    } catch (error) {
      console.error("Error fetching tags:", error);
    }finally {
      //getFoodList();
    }
  };
  

  //페이지 첫랜더링시 기본 세팅 위암식단
  useEffect(()=>{
    getTags();
  },[])


  const handleClickMore = ()=>{
    window.location.href = `disease/diseasedetail/${selectTag}`;
  }

  return (
    <div className='disease_wrap'>
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
              <Button variant="contained" size="small" onClick={handleClickMore}> 자세히보기 </Button>               
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
    </div>
  )
}

export default Disease