import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from '@mui/material';

const RecipeModal = ({ show, setIsRecipeModalOpen, selectedMyFood, selectedDay }) => {
  const[isYoutube,setIsYoutube] = useState(false);
  const handleClose = () => {   
    setIsYoutube(false); 
    setIsRecipeModalOpen(false); // onHide 함수 호출로 수정   
  };

  useEffect(()=>{},[isYoutube]);
  
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton variant="white" onClick={handleClose}>
          <Modal.Title>상세보기</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="modal_wrap">
            {!isYoutube ?
            <>
            <section className="modal_top">
              <div className="modal_contents">
                <div className="imgbox"><img src={selectedMyFood.image} /></div>
                {selectedDay>0 &&
                  <div className="modal_date">
                    <button>{`${selectedDay}일차`}</button>
                  </div>
                }
                
                <div className="modal_article_wrap">
                  <div className="modal_article">
                    <div className="modal_foodname">
                      <p>
                        {selectedMyFood.name}
                        <Button variant="contained" size="small" style={{margin:"20px"}} onClick={()=>setIsYoutube(true)}>{" "}레시피 영상보기{" "}</Button>
                      </p>
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
            </>
            :
            <div className="recipe_video_wrap">
            <div>
            <Button variant="contained" size="small" style={{marginBottom:"10px"}} onClick={()=>setIsYoutube(false)}>뒤로가기{" "}</Button>
            </div>
              <iframe
                key={selectedMyFood?.vidioid}               
                width="800"
                height="500"
                src={`https://www.youtube.com/embed/${selectedMyFood?.vidioid}`}
                title={selectedMyFood?.name}
                frameBorder="0"
                allowFullScreen
              />
            
          </div>
            }
            

          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RecipeModal;