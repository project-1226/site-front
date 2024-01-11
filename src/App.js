import React from "react";
import RouterPage from "./components/RouterPage";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterPage />
    </ThemeProvider>
  );
}

export default App;
