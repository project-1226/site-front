import React, { useState } from "react";
import HeaderPage from "./components/HeaderPage";
import RouterPage from "./components/RouterPage";
import FooterPage from "./components/FooterPage";
import SurveyPage from "./components/SurveyPage";
import QuestionsPage from "./components/QuestionsPage";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { useNavigate } from "react-router-dom";

function App() {
  const userid = sessionStorage.getItem("userid");
  const navigate = useNavigate();
  const [showSurvey, setShowSurvey] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      {!showSurvey && <HeaderPage />}
      <RouterPage />
      {!showSurvey && <FooterPage />}
    </ThemeProvider>
  );
}

export default App;
