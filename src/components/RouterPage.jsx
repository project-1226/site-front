import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SigninPage from "./user/SigninPage";
import MyPage from "./user/MyPage";
import MyPageMain from "./user/mypage/MyPageMain";
import SignupPage from "./user/SignupPage";
import MyDiet from "./myDiet/MyDiet"; 
import Healthy from "./healthyDiet/Healthy";
import Disease from "./diseaseDiet/Disease";
import Healthcare from "./healthcare/Healthcare";

const RouterPage = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            {/* 사용자 */}
            <Route path="/login" element={<SigninPage />} />
            <Route path="/join" element={<SignupPage />} />

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
