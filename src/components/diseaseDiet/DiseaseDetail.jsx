import React from 'react'
import { Button } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel'; 
import { useState } from 'react';
import DiseaseModal from './DiseaseModal';
import { useParams } from 'react-router-dom';
import YouTubeSearchVideo from '../YouTubeSearchVideo';

const DiseaseDetail = () => {
  //선택환 질환에대한 data를 useParams으로 받아옴
  const {tag} = useParams();
  //첫 페이지 랜더링 시 선택환 질환에대한 data랜덤으로 3개 selct해서 넣음
  const recipeList = [{title:"녹차 수제비 전골",image:"이미지",ingredients:"유부 30,시ㄹ파30,....etc",recipe:"ㅇ나ㅣ럼나ㅣㅇ리"},{title:"채소쌈건강롤",image:"이미지",ingredients:"잡곡 100g,양배추40g,....etc",recipe:"sdfasddfsa;sdfasfdsafasfa"},{title:"유자 연어 조림",image:"이미지",ingredients:"연어 120g", :"ㄴㄻㅁㄴㄴㄴㄴㄴㄴㄴㅇㅇㅇㅇㅇㅇㄹㄹㄹ;ㅓㅣ;ㅈ러ㅣ너ㄴㄻㅁㄴㄴㄴㄴㄴㄴㄴㅇㅇㅇㅇㅇㅇㄹㄹㄹ;ㅓㅣ;ㅈ러ㅣ너ㄴㄻㅁㄴㄴㄴㄴㄴㄴㄴㅇㅇㅇㅇㅇㅇㄹㄹㄹ;ㅓㅣ;ㅈ러ㅣ너ㄴㄻㅁㄴㄴㄴㄴㄴㄴㄴㅇㅇㅇㅇㅇㅇㄹㄹㄹ;ㅓㅣ;ㅈ러ㅣ너ㄴㄻㅁㄴㄴㄴㄴㄴㄴㄴㅇㅇㅇㅇㅇㅇㄹㄹㄹ;ㅓㅣ;ㅈ러ㅣ너ㄴㄻㅁㄴㄴㄴㄴㄴㄴㄴㅇㅇㅇㅇㅇㅇㄹㄹㄹ;ㅓㅣ;ㅈ러ㅣ너"}];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalRecipe, setModalRecipe] = useState('');
  const handleClickBtn = (recipe) => {
    setModalRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='disease_wrap'>
      {recipeList.map((recipe, index) => (
        <div key={index} className='disease_sub_wrap'>
          <h1>{tag}식단!!!</h1>
          <div className='disease_sub_plan'>
            {index % 2 === 0 ? <div className='disease_sub_img'></div> : null}
            <div className='disease_sub_contents'>
              <div className='disease_detail_text'>
                <h2>{recipe.title}</h2>           
                <h5>재료</h5>
                <p>{recipe.ingredients}</p>
              </div>
              <Button variant="contained" size="small" onClick={() => handleClickBtn(recipe)}>
                레시피 - 더보기 & 영상
              </Button>
              
            </div>
            {index % 2 === 1 ? <div className='disease_sub_img'></div> : null}
          </div>
        </div>
      ))}

      <div className='diet_contents'>
        <section className='diet_recipe'>
          <div className="contents_title_box">
            <p className="contents_title">내 식단 레시피 보러가기</p>
          </div>
          <div className='recipe_video_wrap'>
            <div className='recipe_video'><YouTubeSearchVideo query={recipeList[0].title}size={1}/></div>
            <div className='recipe_video'><YouTubeSearchVideo query={recipeList[1].title}size={1}/></div>
            <div className='recipe_video'><YouTubeSearchVideo query={recipeList[2].title}size={1}/></div>
            
          </div>

          <div className='disease_detail_vidio_wrap'>
            <YouTubeSearchVideo query={recipeList[0].title}size={1}/>
            <YouTubeSearchVideo query={recipeList[1].title}size={1}/>
            <YouTubeSearchVideo query={recipeList[2].title}size={1}/>
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
      <DiseaseModal show={isModalOpen} onHide={handleCloseModal} recipe={modalRecipe} />
    </div>
  )
}

export default DiseaseDetail