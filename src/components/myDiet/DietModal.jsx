import Modal from 'react-bootstrap/Modal';
import { Button } from '@mui/material';
import { useState } from 'react';
import { CiCircleMore } from 'react-icons/ci';
import React, { useEffect} from 'react'


function DietModal({ show, onHide,selectedMyFood }) {
  const [changeProdVisible, setChangeProdVisible] = useState(false);
  const [currentImages, setCurrentImages] = useState(['img1', 'img2']);

  

  const handleClose = () => {
    setChangeProdVisible(false);
    onHide();
  };

  const handleToggleChangeProd = () => {
    setChangeProdVisible(!changeProdVisible);
  };

  const handleCancelChangeProd = () => {
    setChangeProdVisible(false);
  };

  const handleToggleMoreImages = () => {
    if (currentImages[0] === 'img1' && currentImages[1] === 'img2') {
      setCurrentImages(['img3', 'img4']);
    } else {
      setCurrentImages(['img1', 'img2']);
    }
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
              <div className="modal_date">
                <Button variant="contained" size="lg">
                  1일차
                </Button>
              </div>
            </section>

            <section className="modal_btm">
              <div className="modal_foodname">
                <p>{selectedMyFood.name}</p>
              </div>

              <div className="modal_contents">
                <div className="imgbox"><img src={selectedMyFood.image}/></div>

                <div className="modal_article_wrap">
                  <div className="modal_article">
                    <div className="modal_calorie">
                      <p>칼로리</p>
                      <p>탄수화물, 단백질 정보 등..</p>
                    </div>
                  </div>

                  <div className="modal_btnwrap1">
                    <Button
                      variant="contained"
                      size="small"
                      style={{ background: '#ccc', color: 'black', fontWeight: 'bold' }}
                    >
                      제외
                    </Button>
                    <Button variant="contained" size="small" onClick={handleToggleChangeProd}>
                      변경
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section className="change_prod_wrap" style={{ display: changeProdVisible ? 'block' : 'none' }}>
              <div className="similar_prod_title">
                <p>비슷한 상품</p>
              </div>

              <div className="similar_prod_img">
                {currentImages.map((img, index) => (
                  <div key={index} className="imgbox">
                    {img}
                  </div>
                ))}
                <div className="modal_more" onClick={handleToggleMoreImages}>
                  <CiCircleMore style={{ cursor: 'pointer' }} />
                </div>
              </div>

              <div className="modal_btnwrap2">
                <Button
                  variant="contained"
                  size="small"
                  style={{ background: '#ccc', color: 'black', fontWeight: 'bold' }}
                  onClick={handleCancelChangeProd}
                >
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
