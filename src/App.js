import React from "react";
import RouterPage from "./components/RouterPage";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { getCookie } from "./common";

function App() {
  if (getCookie("userid")) {
    const userid = getCookie("userid");
    sessionStorage.setItem("userid", userid);
  }

  return (
    <ThemeProvider theme={theme}>
      <RouterPage />
    </ThemeProvider>
  );
}

export default App;
