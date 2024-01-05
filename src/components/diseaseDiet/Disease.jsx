import React, { useState } from 'react'
import { Button } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel'; 

const Disease = () => {
  //예시데이터
  const data = {
    "신장실환": { image: "신장실환 신장실환", ingredients: '신장실환 신장실환, 신장실환,....신장실환' },
    "위암식단": { image: "위암식단 사진이미지이이이이", ingredients: '잡곡 100g, 양배추40g,....etc' }
  }
  const tagData = ["신장실환","간질환","폐암식단","위암식단","심장실환","유방암식단","대장암식단","간암식단","당뇨실환","고혈압식단","고지혈증식단"];

  const [selectTag,setSelectTag] = useState("위암식단");


  const handleClickMore = ()=>{
    window.location.href = `/diseasedetail/${selectTag}`;
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
          {tagData.slice(0, 6).map((tag, index) => (
            <Button
              key={index}
              variant="contained"
              size="small"
              onClick={() => setSelectTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
        {/* 두 번째 행의 버튼 */}
        <div className='disease_tag_box'>
          {tagData.slice(6, 11).map((tag, index) => (
            <Button
              key={index}
              variant="contained"
              size="small"
              onClick={() => setSelectTag(tag)}
            >
              {tag}
            </Button>
          ))}              
        </div>

        <div className='disease_detail_wrap'>
          <div className='disease_detail_plan'>
            <div className='disease_detail_img'>{data[selectTag].image}</div>
            <div className='disease_detail_contents'>
              <div className='disease_detail_text'>
                <p>{data[selectTag]?.ingredients}</p>       
              </div>
              <Button variant="contained" size="small" onClick={handleClickMore}> 자세히보기 </Button>               
            </div>
          </div>
        </div>
      </div> {/* disease_contents */}
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
    </div>
  )
}

export default Disease