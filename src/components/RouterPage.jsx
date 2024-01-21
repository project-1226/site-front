import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import NoticePage from "./community/NoticePage";
import ReviewPage from "./community/ReviewPage";
import CommunityPageMain from "./community/CommunityPageMain";
import CommentPage from "./community/CommentPage";

import MyPage from "./user/MyPage";
import SigninPage from "./user/SigninPage";
import SignupPage from "./user/SignupPage";
import UpdateUser from "./user/mypage/info/UpdateUser";
import ManageAddress from "./user/mypage/info/ManageAddress";
import UpdateAddress from "./user/mypage/info/UpdateAddress";
import MySurvey from "./user/mypage/diary/MySurvey";
import Report from "./user/mypage/diary/Report";
import MyPurchase from "./user/mypage/shop/MyPurchase";
import CancelReturn from "./user/mypage/shop/CancelReturn";
import MyWishItem from "./user/mypage/shop/MyWishItem";
import InsertReview from "./user/mypage/shop/InsertReview";
import QuestionMain from "./user/mypage/shop/QuestionMain";
import ActivityMain from "./user/mypage/activity/ActivityMain";
import ReviewMain from "./user/mypage/activity/ReviewMain";

import MyDiet from "./myDiet/MyDiet";
import Healthy from "./healthyDiet/Healthy";
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
import AdminNoticeList from "./admin/AdminNoticeList";
import AdminReview from "./admin/AdminReview";
import ProductSearchPage from "./admin/ProductSearchPage";
import ProductList from "./admin/ProductList";

import SurveyPage from "./SurveyPage";
import DiseaseDetail from "./diseaseDiet/DiseaseDetail";
import HealthyDetail from "./healthyDiet/HealthyDetail";
import HeaderPage from "./HeaderPage";
import FooterPage from "./FooterPage";

import QuestionsPage from "./QuestionsPage";
import SurveySigninPage from "./SurveySigninPage";
import HealthyDetailModal from "./healthyDiet/HealthyDetailModal";


import Chatbotchatstart from "./chatbot/Chatbotchatstart";
import AdminQnaPage from "./admin/AdminQnaPage";
import MyWishPlan from "./user/mypage/activity/MyWishPlan";

const RouterPage = () => {
  const navi = useNavigate();
  const isUserLoggedIn = sessionStorage.getItem("userid") !== null;
  // const [isStartQ,setIsStartQ] = useState(false);
  const [isHeader, setIsHeader] = useState(true);
  const [isFooter, setIsFooter] = useState(true);
  // const [isStartQ,setIsStartQ] = useState(window.location.pathname !="/q_page");
  // const [isSurvey,setIsSurvey] = useState(window.location.pathname != "/");
  //let isSurveyPage = window.location.pathname === "/";
  // const isStartQ = window.location.pathname === "/q_page";

  useEffect(() => {}, [isHeader, isFooter]);

  return (
    <>
      {/* 조건부로 HeaderPage를 표시 */}
      {isHeader && <HeaderPage />}

      <Routes>
        {/* 설문조사 페이지 */}
        <Route
          path="/"
          element={
            <SurveyPage setIsHeader={setIsHeader} setIsFooter={setIsFooter} />
          }
        />
        {/* 설문조사 */}
        <Route
          path="/q_page"
          element={
            <QuestionsPage
              setIsHeader={setIsHeader}
              setIsFooter={setIsFooter}
            />
          }
        />
        <Route
          path="/SurveySigninPage"
          element={
            <SurveySigninPage
              setIsHeader={setIsHeader}
              setIsFooter={setIsFooter}
            />
          }
        />

        <Route
          path="/mydiet"
          element={
            <MyDiet setIsHeader={setIsHeader} setIsFooter={setIsFooter} />
          }
        />

        <Route path="/AIimg" element={<Imagereader />} />
        <Route path="/aisquat" element={<MotionReader />} />
        <Route path="/Ailist" element={<AiList />} />

        <Route path="/Chatbot" element={<Chatbot />} />

        {/* 주문 */}
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Order" element={<OrderPage />} />
        <Route path="/chatstart" element={<Chatbotchatstart />} />

        {/* 로그인/회원가입 */}
        <Route
          path="/login"
          element={
            <SigninPage setIsHeader={setIsHeader} setIsFooter={setIsFooter} />
          }
        />
        <Route path="/join" element={<SignupPage />} />

        {/* community */}
        <Route path="/community" element={<CommunityPageMain />}>
          <Route path="" element={<NoticePage />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="review/comment/:pid" element={<CommentPage />} />
        </Route>

        {/* 관리자페이지 */}
        <Route path="/admin" element={<AdminPage />}>
          <Route path="adorder" element={<AdminOrderList />} />
          <Route path="register" element={<ProductRegisterPage />} />
          <Route path="product" element={<ProductSearchPage />} />
          <Route path="plist" element={<ProductList />} />
          <Route path="adno" element={<AdminNotice />} />
          <Route path="adnoud" element={<AdminNoticeList />} />
          <Route path="adreview" element={<AdminReview />} />
          <Route path="adqna" element={<AdminQnaPage />} />
        </Route>

        {/* 상품등록 */}

        {/* 마이페이지 */}
        <Route path="/mp" element={<MyPage />}>
          {/* 다이어리 */}
          <Route path="" element={<Report />} />
          <Route path="mysv" element={<MySurvey />} />
          {/* 활동 */}
          <Route path="mact" element={<ActivityMain />} />
          <Route path="ract" element={<ReviewMain />} />
          <Route path="wspl" element={<MyWishPlan/>}/>
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

        {/* 건강식단 */}
        <Route path="/health" element={<Healthy pagetype="health" />} />
        <Route path="/health/healthydetail/:tag" element={<HealthyDetail />} />
        <Route path="/healthydetailmodal" element={<HealthyDetailModal />} />
        {/* 질환맞춤식단 */}
        {/* healthy컴포넌트사용*/}
        <Route path="/diseasediet" element={<Healthy pagetype="disease" />} />
        <Route path="/disease/diseasedetail/:tag" element={<DiseaseDetail />} />

        {/* 헬스케어 */}
        <Route path="/healthcare" element={<Healthcare />} />
      </Routes>
      {/* isSurvey  false ,isStartQ true ->false */}
      {isFooter && <FooterPage />}
    </>
  );
};

export default RouterPage;
