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
import MyDiet from "./myDiet/MyDiet"; 
import Healthy from "./healthyDiet/Healthy";
import Disease from "./diseaseDiet/Disease";
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

            {/* 마이페이지 */}
            <Route path="/mypage" element={<MyPage />}>
                <Route path="" element={<MyPageMain />} />
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
