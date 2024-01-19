import Modal from 'react-bootstrap/Modal';
import { Button } from '@mui/material';
import { useState } from 'react';
import { CiCircleMore } from 'react-icons/ci';
import React, { useEffect } from 'react'
import axios from 'axios';

function DietModal({ show, onHide, selectedMyFood, selectedDay }) {
  const [changeProdVisible, setChangeProdVisible] = useState(false);
  // const [currentImages, setCurrentImages] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [randomFoods, setRandomFoods] = useState([]);
  const [loading, setLoading] = useState(false);


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

  // const handleToggleMoreImages = () => {
  //   if (currentImages[0] === 'img1' && currentImages[1] === 'img2') {
  //     setCurrentImages(['img3', 'img4']);
  //   } else {
  //     setCurrentImages(['img1', 'img2']);
  //   }
  // };

  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  };

  //랜덤으로 식단 뽑아오기
  const handleUpdateMyFood = async () => {
    setLoading(true);
    const response = await axios(`/food/random-my-food?categoryid=${selectedMyFood?.categoryid}&foodid=${selectedMyFood?.foodid}`)
    setRandomFoods(response.data);
    console.log(response.data)
    setLoading(false);
  };

  // useEffect(() => {
  //   handleUpdateMyFood();
  // }, [changeProdVisible]);

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
                      식단변경하기
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
                      <div className="image_text">{food.name}</div>
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
                <Button variant="contained" size="small">
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
