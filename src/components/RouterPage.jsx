import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SigninPage from "./user/SigninPage";
import MyPage from "./user/MyPage";
import MyPageMain from "./user/mypage/MyPageMain";
import SignupPage from "./user/SignupPage";

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

            {/* mypage */}
            <Route path="/mypage" element={<MyPage />}>
                <Route path="" element={<MyPageMain />} />
            </Route>
        </Routes>
    );
};

export default RouterPage;
