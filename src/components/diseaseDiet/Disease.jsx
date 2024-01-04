import React from 'react'
import { Button } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel'; 

const Disease = () => {
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
        <div className='disease_tag_box'>
          <Button variant="contained" size="small" > 신장실환 </Button>
          <Button variant="contained" size="small"> 신장실환 </Button>
          <Button variant="contained" size="small" > 신장실환 </Button>
          <Button variant="contained" size="small" > 신장실환 </Button>
          <Button variant="contained" size="small"> 신장실환 </Button>
          <Button variant="contained" size="small"> 신장실환 </Button>               
        </div>
        <div className='disease_tag_box'>         
          <Button variant="contained" size="small"> 신장실환 </Button>
          <Button variant="contained" size="small"> 신장실환 </Button>
          <Button variant="contained" size="small"> 신장실환 </Button>
          <Button variant="contained" size="small"> 신장실환 </Button>
          <Button variant="contained" size="small"> 신장실환 </Button>               
        </div>

        <div className='disease_detail_wrap'>
          <div className='disease_detail_plan'>
            <div className='disease_detail_img'>이미지</div>
            <div className='disease_detail_contents'>
              <div className='disease_detail_text'>
                <p>dklsfahjklsjflksdjflksajfsFdklsfahjklsjflksddklsfahjklsjflksdjflksajfsFdklsfahjklsjflksddklsfahjklsjflksdjflksajfsFdklsfahjklsjflksddklsfahjklsjflksdjflksajfsFdklsfahjklsjflksd </p>       
              </div>
              <Button variant="contained" size="small"> 자세히보기 </Button>               
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