import Modal from 'react-bootstrap/Modal';
import { Button } from '@mui/material';
import { useState } from 'react';
import { CiCircleMore } from 'react-icons/ci';
import React, { useEffect } from 'react'
import axios from 'axios';
import { MdChevronRight } from "react-icons/md";

function DietModal({ show, onHide, selectedMyFood, selectedDay }) {
  const [changeProdVisible, setChangeProdVisible] = useState(false);
  // const [currentImages, setCurrentImages] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [randomFoods, setRandomFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImageToChange, setSelectedImageToChange] = useState({});
  const [imageTextOpacity, setImageTextOpacity] = useState({});


  const handleClose = () => {
    setChangeProdVisible(false);
    onHide();
  };

  const handleToggleChangeProd = () => {
    console.log(selectedMyFood);
    setChangeProdVisible(!changeProdVisible);
    handleUpdateMyFood();

  };

  const handleCancelChangeProd = () => {
    setChangeProdVisible(false);
  };

  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleConfirmChange = () => {
    window.alert("식단을 변경하시겠습니까?");
  };

  //랜덤으로 식단 뽑아오기
  const handleUpdateMyFood = async () => {
    setLoading(true);
    const response = await axios(`/food/random-my-food?categoryid=${selectedMyFood?.categoryid}&foodid=${selectedMyFood?.foodid}`)
    setRandomFoods(response.data);
    console.log(response.data)
    setLoading(false);
  };

  const handleImageClick = (imageUrl) => {
    // 클릭한 이미지 opacity를 1로 설정
    // 나머지 이미지 opacity는 0으로 설정
    setSelectedImageToChange((prevOpacity) => {
      const updatedOpacity = {};

      // 모든 이미지 opacity를 0으로 설정
      randomFoods.forEach((food) => {
        updatedOpacity[food.image] = 0;
      });

      // 클릭된 이미지 opacity를 1로 설정
      updatedOpacity[imageUrl] = 1;

      return updatedOpacity;
    });

    // 클릭된 이미지에 해당하는 .image_text의 opacity도 설정
    const textOpacity = {};
    randomFoods.forEach((food) => {
      textOpacity[food.image] = food.image === imageUrl ? 1 : 0;
    });
    setImageTextOpacity(textOpacity);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton variant="white">
          <Modal.Title>상세보기</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="modal_wrap">
            <section className="modal_top">
              <div className="modal_contents">
                <div className="imgbox"><img src={selectedMyFood.image} /></div>
                <div className="modal_date">
                  <button>{`${selectedDay}일차`}</button>
                </div>

                <div className="modal_article_wrap">
                  <div className="modal_article">
                    <div className="modal_foodname">
                      <p>{selectedMyFood.name}</p>
                      <p>{selectedMyFood.ingredients}</p>
                    </div>
                  </div>

                  <div className="modal_btnwrap1">
                    <button onClick={handleToggleChangeProd}>
                      식단변경하기 <MdChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className='modal_btm'>
              <p>[{selectedMyFood.cname}]</p>
              <p>{selectedMyFood.description}</p>
            </section>

            <section className="change_prod_wrap" style={{ display: changeProdVisible ? 'block' : 'none' }}>
              <div className="similar_prod_title">
                <p>비슷한 식단</p>
              </div>

              <div className="similar_prod_img">
                <div className="randombox">
                  {randomFoods.slice(0, 2).map((food, index) => (
                    <div key={index} className="image_container">
                      <img src={food.image} alt="" />
                      <div className="image_text" style={{ opacity: imageTextOpacity[food.image] || 0 }}
                        onClick={() => handleImageClick(food.image)}>
                        {food.name}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="modal_more" onClick={handleUpdateMyFood}>
                  <CiCircleMore style={{ cursor: 'pointer' }} />
                </div>
              </div>



              <div className="modal_btnwrap2">
                <Button variant="contained" size="small"
                  style={{ background: '#ccc', color: 'black', fontWeight: 'bold' }}
                  onClick={handleCancelChangeProd}>
                  취소
                </Button>
                <Button variant="contained" size="small" onClick={handleConfirmChange}>
                  변경하기
                </Button>
              </div>
            </section>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DietModal;