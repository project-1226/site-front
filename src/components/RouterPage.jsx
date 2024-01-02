import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SigninPage from "./user/SigninPage";
import MyPage from "./user/MyPage";
import MyPageMain from "./user/mypage/MyPageMain";
import SignupPage from "./user/SignupPage";

const RouterPage = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

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
