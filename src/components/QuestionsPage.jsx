import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";


const QuestionsPage = ({ setIsHeader }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(0);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [surveyResult, setSurveyResult] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const getQList = async () => {
    setLoading(true);
    const res = await axios("/survey/q_list");
    console.log(res.data);
    setQuestion(res.data);
    setLoading(false);
  };

  const getSList = async () => {
    setLoading(true);
    const res = await axios("/survey/s_list");
    console.log(res.data);
    setAnswer(res.data);
    setLoading(false);
  };

  const handleBackButtonClick = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    } else {
      navigate('/');
      setIsHeader(true);
    }
  };

  const handleNextButtonClick = async () => {
    if (page < question.length - 1) {
      if (clickNextPage()) {
        const userid = sessionStorage.getItem("userid");
        const res = {
          selectid: answer.find((a) => a.questionid === question[page].questionid)?.selectid,
          userid: userid,
          questionid: question[page].questionid,
          input_text: inputValue,
        };
        console.log(res);

        setSurveyResult((prevResult) => [...prevResult, res]);
        setPage((prevPage) => prevPage + 1);
        setInputValue("");
      }
    } else {
      if (clickNextPage()) {
        const res = await axios.post("/survey/insertResult", surveyResult);
        console.log("설문 결과:", res.data);

        navigate('/SurveySigninPage');
      }
    }
  };


  useEffect(() => {
    setIsHeader(false);
    getQList();
    getSList();
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  //설문조사 결과선택
  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  //설문조사 결과 다중선택 - 알러지
  const handleToggleAllergy = (allergy) => {
    setSelectedAllergies((prevAllergies) =>
      prevAllergies.includes(allergy)
        ? prevAllergies.filter((a) => a !== allergy)
        : [...prevAllergies, allergy]
    );
  };

  const clickNextPage = () => {
    if (question.length > 0) {
      const currentQuestion = question[page];
      if (currentQuestion.type === 1) {
        return selectedAnswer !== "";
      } else if (currentQuestion.type === 2) {
        return selectedAllergies.length > 0;
      } else if (currentQuestion.type === 3) {
        return inputValue.trim() !== "";
      }
    }
    return false;
  };   

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Link to="/login">goto login</Link>
      {!show ?
        <div className="q_wrap">
          <div className="q_contents">
            <div className="q_title_box">
              <p> {question.length && question[page].content} </p>
            </div>

            <div className="question_contents">
              {/* {console.log("Page:", page, "Questions:", question)} */}

              {question.length > 0 && question[page].type === 1 && (
                <div className="q_select_wrap">
                  <div className="q_select_box_wrap">
                    {answer
                      .filter(a => a.questionid === question[page].questionid)
                      .map((a, index) => (
                        <div key={index} className={`q_select_box ${selectedAnswer === a.answer ? 'selected' : ''}`}
                          onClick={() => handleSelectAnswer(a.answer)}>
                          {a.answer}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {question.length > 0 && question[page].type === 2 && (
                <div className="q_allergy_wrap">
                  <div className="q_allergy_box_wrap">
                    {answer
                      .filter(a => a.questionid === question[page].questionid)
                      .map((a, index) => (
                        <div key={index} className={`q_allergy_box ${selectedAllergies.includes(a.answer) ? 'selected' : ''}`}
                          onClick={() => handleToggleAllergy(a.answer)}>
                          {a.answer}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {question.length > 0 && question[page].type === 3 && (
                <div className="q_input_wrap">
                  <div className="q_input_box_wrap">
                    <div className="q_input_box">
                      <input type="text" placeholder="입력" value={inputValue} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
              )}
            </div>


            <div className="q_btn_wrap">
              <button type="button" onClick={handleBackButtonClick}>
                뒤로 가기
              </button>
              <button type="button" onClick={handleNextButtonClick}
                className={`nextButton ${clickNextPage()
                    ? 'active'
                    : 'inactive'
                  }`}
                disabled={!clickNextPage()}>
                다음으로
              </button>
            </div>
          </div>
        </div >
        :
        <></>
      }
    </>
  );
};

export default QuestionsPage;
