import React from 'react';
import { Modal } from 'react-bootstrap';

const HealthcareModal = ({ show, handleClose, selectedChall }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
      <Modal.Header closeButton variant="white">
        <Modal.Title>상세보기</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="modal_wrap">
          <section className="modal_top">
            <div className='modal_food_img'>{selectedChall}</div>
          </section>

          <section className="modal_btm">
          </section>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default HealthcareModal;
