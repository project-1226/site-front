import React from "react";
import HeaderPage from "./components/HeaderPage";
import RouterPage from "./components/RouterPage";
import FooterPage from "./components/FooterPage";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HeaderPage />
      <RouterPage />
      <FooterPage />
    </ThemeProvider>
  );
}

export default App;
