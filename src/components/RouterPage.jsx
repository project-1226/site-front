import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SigninPage from "./user/SigninPage";
import SideMenu from "./community/SideMenu";
import NoticePage from "./community/NoticePage";
import ReviewPage from "./community/ReviewPage";

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* user */}
      <Route path="/login" element={<SigninPage />} />

      {/* community */}
      <Route path="/community" element={<SideMenu/>} />
      <Route path="/community/notice" element={<NoticePage/>} />
      <Route path="/community/review" element={<ReviewPage/>} />
    </Routes>
  );
};

export default RouterPage;
