import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";

import NoticePage from "./community/NoticePage";
import ReviewPage from "./community/ReviewPage";
import CommunityPageMain from "./community/CommunityPageMain";
import WriteReview from "./community/WriteReview";
import CommentPage from "./community/CommentPage";

import MyPage from "./user/MyPage";
import SigninPage from "./user/SigninPage";
import SignupPage from "./user/SignupPage";
import UpdateUser from "./user/mypage/info/UpdateUser";
import ManageAddress from "./user/mypage/info/ManageAddress";
import UpdateAddress from "./user/mypage/info/UpdateAddress";
import MySurvey from "./user/mypage/diary/MySurvey";
import CustomPlan from "./user/mypage/diary/CustomPlan";
import Report from "./user/mypage/diary/Report";
import MyPurchase from "./user/mypage/shop/MyPurchase";
import CancelReturn from "./user/mypage/shop/CancelReturn";
import MyWishItem from "./user/mypage/shop/MyWishItem";
import InsertReview from "./user/mypage/shop/InsertReview";
import QuestionMain from "./user/mypage/shop/QuestionMain";
import ActivityMain from "./user/mypage/activity/ActivityMain";
import ScrapPage from "./user/mypage/activity/ScrapPage";

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

import AdminPage from "./admin/AdminPage";
import ProductRegisterPage from "./admin/ProductRegisterPage";
import AdminOrderList from "./admin/AdminOrderList";
import AdminNotice from "./admin/AdminNotice";
import AdminReview from "./admin/AdminReview";
import ProductListPage from "./admin/ProductListPage";
import Chat from "./community/Chat";

import SurveyPage from "./SurveyPage";

const RouterPage = () => {
  return (
    <Routes>
      {sessionStorage.getItem("userid") ? (
        <Route path="/" element={<HomePage />} />
      ) : (
        <Route path="/" element={<SurveyPage />} />
      )}

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
      <Route path="/community" element={<CommunityPageMain />}>
        <Route path="" element={<NoticePage />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="rwrite" element={<WriteReview />} />
        <Route path="review/comment/:pid" element={<CommentPage />} />

      </Route>
<<<<<<< HEAD
      <Route path="/chat" element={<Chat />} />
      
      
=======
>>>>>>> 65c68df538821a286b7198322e14ff83b06e7bf6

      {/* 관리자페이지 */}
      <Route path="/admin" element={<AdminPage />}>
        <Route path="adorder" element={<AdminOrderList />} />
        <Route path="register" element={<ProductRegisterPage />} />
        <Route path="product" element={<ProductListPage />} />
        <Route path="adno" element={<AdminNotice />} />
        <Route path="adreview" element={<AdminReview />} />
      </Route>

      {/* 상품등록 */}

      {/* 마이페이지 */}
      <Route path="/mp" element={<MyPage />}>
        {/* 다이어리 */}
        <Route path="" element={<Report />} />
        <Route path="cstp" element={<CustomPlan />} />
        <Route path="mysv" element={<MySurvey />} />
        {/* 활동 */}
        <Route path="mact" element={<ActivityMain />} />
        <Route path="sact" element={<ScrapPage />} />
        {/* 주문내역 */}
        <Route path="mprch" element={<MyPurchase />} />
        <Route path="cncl" element={<CancelReturn />} />
        <Route path="wsit" element={<MyWishItem />} />
        <Route path="revw" element={<InsertReview />} />
        <Route path="shqna" element={<QuestionMain />} />
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

      {/* 설문조사 페이지 */}
    </Routes>
  );
};

export default RouterPage;
