import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import YouTubeSearchVideo from '../YouTubeSearchVideo';

function DiseaseModal({ show, onHide,recipe }) {
  const handleClose = () => onHide();
  const size =1;
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" >
        <Modal.Header closeButton variant='white'>
          <Modal.Title> {recipe.title} 레시피 영상 </Modal.Title>
        </Modal.Header>

          <YouTubeSearchVideo query={recipe.title} size={size} />
        <Modal.Body>
        {recipe.title} 유튜브영상
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DiseaseModal;
