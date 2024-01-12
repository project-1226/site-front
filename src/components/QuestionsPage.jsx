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
    setIsHeader(true);
    navigate('/');
  };

  const handleNextButtonClick = () => {
    if (page < question.length - 1) {
      setPage((prevPage) => prevPage + 1);
    } else {
      //마지막페이지는 나중에 추가
    }
  };

  useEffect(() => {
    setIsHeader(false);
    getQList();
    getSList();
  }, []);

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

            <>
              {question.length > 0 && question[page] && question[page].type === 1 && (
                <div className="q_select_wrap">
                  <div className="q_select_box_wrap">
                    {answer
                      .filter(a => a.questionid === question[page].questionid)
                      .map((a, index) => (
                        <div key={index} className="q_select_box">
                          {a.answer}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {question.length > 0 && page < question.length && question[page].type === 3 && (
                <div className="q_input_wrap">
                  <div className="q_input_box_wrap">
                    {answer
                      .filter(a => a.questionid === question[page].questionid)
                      .map((a, index) => (
                        <div key={index} className="q_input_box">
                          <input type="text" placeholder="입력" />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </>


            <div className="q_btn_wrap">
              <button type="button" onClick={handleBackButtonClick}>
                뒤로 가기
              </button>
              <button type="button" onClick={handleNextButtonClick}>
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
