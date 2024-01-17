import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";


const QuestionsPage = ({ setIsHeader,setIsFooter }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);


  const [inputValue, setInputValue] = useState({
    selectid: 0,
    questionid: 0,
    answer: "",
    input_text: "",
  });
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const [surveyResult, setSurveyResult] = useState([]);


  //질문,대답을 한번에 미리저장해두고 페이지 전환이 될때마다 해당데이터를 사용하는 방법이 
  // 첫페이지 로딩이 느릴 순 있어도 페이지전환이 빠르고 사용자 경험을 개선할 수있음
  //페이지전환시 그페이지 문제에해당하는 답변들을 가져와서 뿌리는방법보다 사용자경험을 개선하기위해 전자의 방법을 씀 
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
    //console.log(res.data);
    setAnswer(res.data);
    setLoading(false);
  };

  useEffect(() => {
    setIsHeader(false);
    setIsFooter(false);
    getQList();
    getSList();
  }, []);

  useEffect(() => {
    if( page == question.length){
      // console.log(page)
      // console.log(question.length)
      navigate('/SurveySigninPage', {
        state: { result: surveyResult },
        });
    } else if (page > 1) {
      const filteredResult = surveyResult.filter((result) => result.questionid !== question[page].questionid);
      setSurveyResult(filteredResult);
    }    
  }, [page]);

  const handleBackButtonClick = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    } else {    
     // 페이지가 1이면 초기화
      setSurveyResult([]);
      navigate('/');
      setIsHeader(true);
    } 
  };

  const handleNextButtonClick = async () => {
    if (page <= question.length){
      if(question[page].type == 1){
        const updatedAnswer = { ...selectedAnswer, input_text: "" }; 
        setSurveyResult((prevResult) => [...prevResult, updatedAnswer]);
        setSelectedAnswer(""); // 선택된 응답 초기화
        setPage((prevPage) => prevPage + 1);    
      } else if(question[page].type == 2){
        const updatedAnswer = selectedAllergies.map((allergy) => ({ ...allergy, input_text: "" }));
        setSurveyResult((prevResult) => [...prevResult, ...updatedAnswer]);
        setSelectedAllergies([]); // 선택된 알러지 초기화
        setPage((prevPage) => prevPage + 1);
      } else if(question[page].type == 3){
        setSurveyResult((prevResult) => [
          ...prevResult,
          { ...inputValue, input_text: inputValue.input_text.trim() },
        ]);
        setInputValue({ ...inputValue,questionid: 0, input_text: "" }); // 객체 전체를 업데이트하도록 수정
        setPage((prevPage) => prevPage + 1);
      }
    } 
  };

  const handleInputChange = (e) => {
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      questionid: question[page].questionid,
      input_text: e.target.value,
    }));
    console.log(inputValue);
  };

  //설문조사 결과선택
  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    console.log("설문조사 결과선택   : ");
    console.log(answer);
  };

  //설문조사 결과 다중선택 - 알러지 (중복제거,선택 시 목록에 추가, 다시 클릭 선택을 취소 시 목록에서 제거 하는 함수)
  const handleToggleAllergy = (allergy) => {
    setSelectedAllergies((prevAllergies) =>
      prevAllergies.includes(allergy)
        ? prevAllergies.filter((a) => a !== allergy)
        : [...prevAllergies, allergy]
    );
    console.log(selectedAllergies);
  };

  const clickNextPage = () => {
    if (question.length > 0){
      if(question[page].type ==1){
        return selectedAnswer !== "";
      } else if(question[page].type ==2){
        return selectedAllergies.length > 0;
      } else if(question[page].type ==3){
        return inputValue.input_text.trim() !== "";
      }
    }
    return false;
  };   

  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      { page !== question.length &&

        <div className="q_wrap">
          <div className="q_contents">
            <div className="q_title_box">
              <p> {question.length && question[page].content} </p>
            </div>

            <div className="question_contents">
              {/* {console.log("Page:", page, "Questions:", question)} */}

              {/* 객관식 */}
              {question.length > 0 && question[page].type === 1 && (
                <div className="q_select_wrap">
                  <div className="q_select_box_wrap">
                    {answer
                      .filter(a => a.questionid === question[page].questionid)
                      .map((a, index) => (
                        <div key={index} className={`q_select_box ${selectedAnswer.answer === a.answer? 'selected' : ''}`}
                          onClick={() => handleSelectAnswer(a)}>
                          {a.answer}
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {/* 복수선택 */}
              {question.length > 0 && question[page].type === 2 && (
                <div className="q_allergy_wrap">
                  <div className="q_allergy_box_wrap">
                    {answer
                      .filter(a => a.questionid === question[page].questionid)
                      .map((a, index) => (
                        <div key={index} className={`q_allergy_box ${selectedAllergies.includes(a) ? 'selected' : ''}`}
                          onClick={() => handleToggleAllergy(a)}>
                          {a.answer}
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {/* 주관식 */}
              {question.length > 0 && question[page].type === 3 && (
                <div className="q_input_wrap">
                  <div className="q_input_box_wrap">
                    <div className="q_input_box">
                      <input type="text" placeholder="입력" value={inputValue.input_text} onChange={handleInputChange} />
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
        </div >}
        </>
      
  );
};

export default QuestionsPage;
