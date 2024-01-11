import React from "react";
import { useNavigate } from "react-router-dom";

const QuestionsPage = ({ setShow }) => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate('/');
  };

  const handleNextButtonClick = () => {

  };

  return (
    <div className="q_wrap">
      <div className="q_contents">
        <div className="q_title_box">
          <p>회원님이 식단으로 이루고 싶은 목표를 알려주세요</p>
        </div>

        <div className="q_select_wrap">
          <div className="q_select_box_wrap">
            <div className="q_select_box"> 1 </div>
            <div className="q_select_box"> 2 </div>
            <div className="q_select_box"> 3 </div>
            <div className="q_select_box"> 4 </div>
            <div className="q_select_box"> 5 </div>
          </div>
        </div>

        <div className="q_btn_wrap">
          <button type="button" onClick={handleBackButtonClick}>
            뒤로 가기
          </button>
          <button type="button" onClick={handleNextButtonClick}>
            다음으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;
