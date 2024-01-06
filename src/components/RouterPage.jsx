import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";

import SideMenu from "./community/SideMenu";
import NoticePage from "./community/NoticePage";
import ReviewPage from "./community/ReviewPage";

import MyPage from "./user/MyPage";
import SigninPage from "./user/SigninPage";
import SignupPage from "./user/SignupPage";
import UpdateUser from "./user/mypage/info/UpdateUser";
import ManageAddress from "./user/mypage/info/ManageAddress";
import MySurvey from "./user/mypage/diary/MySurvey";
import RecommendPlan from "./user/mypage/diary/RecommendPlan";
import CustomPlan from "./user/mypage/diary/CustomPlan";
import Report from "./user/mypage/diary/Report";
import MyActivity from "./user/mypage/activity/MyActivity";
import Scrap from "./user/mypage/activity/Scrap";
import MyPurchase from "./user/mypage/shop/MyPurchase";
import CancelReturn from "./user/mypage/shop/CancelReturn";
import MyWishItem from "./user/mypage/shop/MyWishItem";

import MyDiet from "./myDiet/MyDiet";
import Healthy from "./healthyDiet/Healthy";
import Disease from "./diseaseDiet/Disease";
import Healthcare from "./healthcare/Healthcare";

import Imagereader from "./ai/Imagereader";
import MotionReader from "./ai/MotionReader";
import AiList from "./ai/AiList";
import Chatbot from "./chatbot/Chatbot";

import Cart from "./cart/Cart";
import OrderPage from "./cart/OrderPage";
import UpdateAddress from "./user/mypage/info/UpdateAddress";

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/AIimg" element={<Imagereader />} />
      <Route path="/AImotion" element={<MotionReader />} />
      <Route path="/Ailist" element={<AiList />} />

      <Route path="/Chatbot" element={<Chatbot />} />

      {/* 주문 */}
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Order" element={<OrderPage />} />

      {/* 로그인/회원가입 */}
      <Route path="/login" element={<SigninPage />} />
      <Route path="/join" element={<SignupPage />} />

      {/* community */}
      <Route path="/community" element={<SideMenu />} />
      <Route path="/community/notice" element={<NoticePage />} />
      <Route path="/community/review" element={<ReviewPage />} />

      {/* 마이페이지 */}
      <Route path="/mp" element={<MyPage />}>
        {/* 다이어리 */}
        <Route path="" element={<Report />} />
        <Route path="rcmp" element={<RecommendPlan />} />
        <Route path="cstp" element={<CustomPlan />} />
        <Route path="mysv" element={<MySurvey />} />
        {/* 활동 */}
        <Route path="mact" element={<MyActivity />} />
        <Route path="scrp" element={<Scrap />} />
        {/* 주문내역 */}
        <Route path="mprch" element={<MyPurchase />} />
        <Route path="cncl" element={<CancelReturn />} />
        <Route path="wsit" element={<MyWishItem />} />
        {/* 정보 */}
        <Route path="upd" element={<UpdateUser />} />
        <Route path="addr" element={<ManageAddress />} />
        <Route path="upaddr" element={<UpdateAddress />} />
      </Route>

      {/* 내식단 */}
      <Route path="/mydiet" element={<MyDiet />} />

      {/* 건강식단 */}
      <Route path="/healthydiet" element={<Healthy />} />

      {/* 질환맞춤식단 */}
      <Route path="/diseasediet" element={<Disease />} />

      {/* 헬스케어 */}
      <Route path="/healthcare" element={<Healthcare />} />
    </Routes>
  );
};

export default RouterPage;
