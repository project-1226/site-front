import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

//result -< navigater로 보낸훅
const SurveySigninPage = ({ setIsHeader, setIsFooter,result}) => {
  const navigate = useNavigate();
  const location = useLocation();
  

  const handleButtonClick = () => {
    setIsHeader(false);
    setIsFooter(false);
    // navigate('/signin',{state:{result:result}});
    navigate('/join',{
      state: { result: location.state?.result },});
  };

  useEffect(() => {
    setIsFooter(false);
    console.log("로그인페이지이이")
    console.log(location.state?.result);
  }, [location]);

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