import React from 'react';
import Modal from 'react-bootstrap/Modal';

const RecipeModal = ({ show, onHide, selectedMyFood, selectedDay }) => {
  const handleClose = () => {
    onHide(); // onHide 함수 호출로 수정
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton variant="white" onClick={handleClose}>
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
                </div>
              </div>
            </section>

            <section className='recipe_modal_btm'>
              <p>[홈메이드 레시피]</p>
              <p dangerouslySetInnerHTML={{ __html: `${selectedMyFood.recipe}` }}></p>
            </section>

          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RecipeModal;