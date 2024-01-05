import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SigninPage from "./user/SigninPage";
import SideMenu from "./community/SideMenu";
import NoticePage from "./community/NoticePage";
import ReviewPage from "./community/ReviewPage";
import MyPage from "./user/MyPage";
import MyPageMain from "./user/mypage/MyPageMain";
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
import DiseaseDetail from "./diseaseDiet/DiseaseDetail";
import Healthcare from "./healthcare/Healthcare";

import Imagereader from "./ai/Imagereader";
import MotionReader from "./ai/MotionReader";
import Chatbot from "./chatbot/Chatbot";
import AiList from "./ai/AiList";
import Cart from "./cart/Cart";
import OrderPage from "./cart/OrderPage";

const RouterPage = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

      <Route path="/AIimg" element={<Imagereader />} />
     <Route path="/AImotion" element={<MotionReader />} />
     <Route path="/Chatbot" element={<Chatbot />} />
     <Route path="/Ailist" element={<AiList />} />
     <Route path="/Cart" element={<Cart />} />
     <Route path="/Order" element={<OrderPage />} />

            {/* user */}
            <Route path="/login" element={<SigninPage />} />
            <Route path="/join" element={<SignupPage />} />
              
                    {/* community */}
      <Route path="/community" element={<SideMenu/>} />
      <Route path="/community/notice" element={<NoticePage/>} />
      <Route path="/community/review" element={<ReviewPage/>} />

            {/* mypage */}
            <Route path="/mp" element={<MyPage />}>
                {/* 다이어리 */}
                <Route path="" element={<Report />} />
                <Route path="rcmp" element={<RecommendPlan />} />
                <Route path="cstp" element={<CustomPlan />} />
                <Route path="mysv" element={<MySurvey />} />

                <Route path="mact" element={<MyActivity />} />
                <Route path="scrp" element={<Scrap />} />

                <Route path="mprch" element={<MyPurchase />} />
                <Route path="cncl" element={<CancelReturn />} />
                <Route path="wsit" element={<MyWishItem />} />

                <Route path="upd" element={<UpdateUser />} />
                <Route path="addr" element={<ManageAddress />} />
            </Route>

            {/* 내식단 */}
            <Route path="/mydiet" element={<MyDiet />} />

            {/* 건강식단 */}
            <Route path="/healthydiet" element={<Healthy />} />

            {/* 질환맞춤식단 */}
            <Route path="/diseasediet" element={<Disease />} />
            <Route path="/diseasedetail" element={<DiseaseDetail/>} />

            {/* 헬스케어 */}
            <Route path="/healthcare" element={<Healthcare />} />
        </Routes>
    );
};

export default RouterPage;
