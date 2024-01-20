import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from '@mui/material';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import axios from 'axios';



const RecipeModal = ({ show, setIsRecipeModalOpen, selectedMyFood, selectedDay }) => {
  const[isYoutube,setIsYoutube] = useState(false);
  const [isFavorite,setIsFavorite]= useState(false);
  
  const isFavoriteFood=async()=>{
    console.log(selectedMyFood.foodid)
    const res = await axios(`/food/read/favorite?userid=${sessionStorage.getItem("userid")}&foodid=${selectedMyFood.foodid}`);
    if(res.data > 0){
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }

  const onClickFavorite=async()=>{
    const res = await axios(`/food/insert/favorite?userid=${sessionStorage.getItem("userid")}&foodid=${selectedMyFood?.foodid}`);
    if(res.data >0){
      setIsFavorite(true);
    }
  }

  const onClickCancleFavorite=async()=>{
    const res = await axios.delete(`/food/delete/favorite?userid=${sessionStorage.getItem("userid")}&foodid=${selectedMyFood.foodid}`);
    console.log(res.data);
    setIsFavorite(false);
  }

  const handleClose = () => {   
    setIsYoutube(false); 
    setIsRecipeModalOpen(false); // onHide 함수 호출로 수정   
  };

  useEffect(()=>{
    isFavoriteFood();
  },[show,isFavorite])
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
                <div className='modal_favorit'>
                  식단찜하기
                  {isFavorite ?
                    <BookmarkOutlinedIcon  onClick={onClickCancleFavorite}/>
                  :
                    <BookmarkBorderOutlinedIcon onClick={onClickFavorite}/>
                  }
                  
                </div>
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