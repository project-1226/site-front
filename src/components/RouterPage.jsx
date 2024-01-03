import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SigninPage from "./user/SigninPage";
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

const RouterPage = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            {/* user */}
            <Route path="/login" element={<SigninPage />} />
            <Route path="/join" element={<SignupPage />} />

            {/* mypage */}
            <Route path="/mp" element={<MyPage />}>
                {/* 다이어리 */}
                <Route path="" element={<Report />} />
                <Route path="rcmp" element={<RecommendPlan />} />
                <Route path="cstp" element={<CustomPlan />} />
                <Route path="mysv" element={<MySurvey />} />

                <Route path="mact" element={<MyActivity />} />
                <Route path="scrp" element={<Scrap />} />

                <Route path="scrp" element={<Scrap />} />

                <Route path="upd" element={<UpdateUser />} />
                <Route path="addr" element={<ManageAddress />} />
            </Route>
        </Routes>
    );
};

export default RouterPage;
