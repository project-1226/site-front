import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";

import Imagereader from "./ai/Imagereader";
import MotionReader from "./ai/MotionReader";
import Chatbot from "./chatbot/Chatbot";
import AiList from "./ai/AiList";

const RouterPage = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/AIimg" element={<Imagereader />} />
            <Route path="/AImotion" element={<MotionReader />} />
            <Route path="/Chatbot" element={<Chatbot />} />
            <Route path="/Ailist" element={<AiList />} />
        </Routes>
    );
};

export default RouterPage;
