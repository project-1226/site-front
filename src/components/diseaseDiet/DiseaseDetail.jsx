import React from 'react'
import { Button } from '@mui/material';
import Carousel from 'react-bootstrap/Carousel'; 
import { useState } from 'react';
import DiseaseModal from './DiseaseModal';
import { useParams } from 'react-router-dom';

const DiseaseDetail = () => {
  const {tag} = useParams();

  //예시데이터
  const recipes = [
    {
      title: '유자연어조림',
      ingredients: '연어 120g',
      recipe: 'ㅇ나ㅣ럼나ㅣㅇ리;나ㅓ린아',
    },
    {
      title: '채소쌈건강롤',
      ingredients: '잡곡 100g,양배추40g,....etc',
      recipe: 'sdfasddfsa;sdfasfdsafasfa',
    },{
      title: '녹차수제비전골',
      ingredients: '유부 30,시ㄹ파30,....etc',
      recipe: 'ㄴㄻㅁㄴㄴㄴㄴㄴㄴㄴㅇㅇㅇㅇㅇㅇㄹㄹㄹ;ㅓㅣ;ㅈ러ㅣ너',
    }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalQuery, setModalQuery] = useState('');
  const handleClickBtn = (query) => {
    setModalQuery(query);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='disease_wrap'>
      {recipes.map((recipe, index) => (
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
              <Button variant="contained" size="small" onClick={() => handleClickBtn(recipe.title)}>
                자세히보기
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
      <DiseaseModal show={isModalOpen} onHide={handleCloseModal} query={modalQuery} />
    </div>
  )
}

export default DiseaseDetail