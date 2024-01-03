import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';

function DietModal({ show, onHide }) {
  const handleClose = () => onHide();

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" >
        <Modal.Header closeButton variant='white'>
          <Modal.Title> 상세보기 </Modal.Title>
        </Modal.Header>


        <Modal.Body>
          I will not close if you click outside me. Do not even try to press
          escape key.
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DietModal;
