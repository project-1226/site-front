import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionsPage from "./QuestionsPage";

const SurveyPage = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleButtonClick = () => {
    setShow(true);
  };

  return (
    <div className="survey_wrap">
      <div className="survey_contents">
        {!show ? (
          <>
            <div className="survey_title_box">
              <p className="survey_title">내 몸에 딱맞는</p>
              <p className="survey_title">맞춤식단을 받아보세요</p>
              <p className="survey_article">
                원하는 식단을 알려주세요. 몇 가지 간단한 질문에 답해주세요.
              </p>
            </div>
            <div className="survey_btn">
              <button
                variant="contained"
                size="small"
                onClick={handleButtonClick}
              >
                맞춤식단 받아보기
              </button>
            </div>
          </>
        ) : (
          <QuestionsPage setShow={setShow} />
        )}
      </div>
    </div>
  );
};

export default SurveyPage;
