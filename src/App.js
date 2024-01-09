import React, { useState } from 'react';
import HeaderPage from "./components/HeaderPage";
import RouterPage from "./components/RouterPage";
import FooterPage from "./components/FooterPage";
import SurveyPage from "./components/SurveyPage";
import QuestionsPage from "./components/QuestionsPage";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { useNavigate } from 'react-router-dom';

function App() {
  const userid = sessionStorage.getItem('userid');
  const navigate = useNavigate();
  const [showSurvey, setShowSurvey] = useState(false);

  const handleSurveyBtnClick = () => {
    setShowSurvey(true);
    navigate('/survey/questions');
  };

  const handleBackButtonClick = () => {
    navigate('/survey');
  };

  return (
    <ThemeProvider theme={theme}>
      {!showSurvey && <HeaderPage />}
      {!showSurvey ? (
        <SurveyPage onQuestionsBtnClick={handleSurveyBtnClick} />
      ) : (
        <>
          {userid ? <RouterPage /> : <QuestionsPage setShowSurvey={setShowSurvey}/>}
        </>
      )}
      {!showSurvey && <FooterPage />}
    </ThemeProvider>
  );
}

export default App;
