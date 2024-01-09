import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionsPage = ({ setShow }) => {
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    setShow(false);
  };

  const handleNextButtonClick = () => {
    console.log('Question 1:', question1);
    console.log('Question 2:', question2);
  };

  return (
    <div className="q_wrap">
      <div className="q_contents">
        <div className="q_title_box">
          <p>회원님이 식단으로 이루고 싶은 목표를 알려주세요</p>
        </div>

        <div className="q_select_wrap">
          <div className="q_select_box_wrap">
            <div className="q_select_box"></div>
            <div className="q_select_box"></div>
            <div className="q_select_box"></div>
            <div className="q_select_box"></div>
            <div className="q_select_box"></div>
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
