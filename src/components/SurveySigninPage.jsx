import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SurveySigninPage = ({ setIsHeader, setIsFooter }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsHeader(false);
    setIsFooter(false);
    navigate('/signin');
  };

  useEffect(() => {
    setIsFooter(false);
  }, []);

  return (
    <div className='survey_wrap'>
      <div className='survey_contents'>
        <div className='survey_title_box'>
          <p className='survey_title'>진단이 완료되었습니다</p>
          <p className='survey_title'>맞춤식단을 받아보시겠습니까?</p>
          <p className='survey_article'>회원가입하고 진단 결과를 확인해보세요!</p>
        </div>
        <div className='survey_btn'>
          <button variant="contained" size="small" onClick={handleButtonClick}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  )
}

export default SurveySigninPage