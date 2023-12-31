import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SigninPage from "./user/SigninPage";

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* user */}
      <Route path="/login" element={<SigninPage />} />
    </Routes>
  );
};

export default RouterPage;
