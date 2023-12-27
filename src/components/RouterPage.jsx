import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";

import Imagereader from "./ai/Imagereader";
import MotionReader from "./ai/MotionReader";

const RouterPage = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/AIimg" element={<Imagereader />} />
            <Route path="/AImotion" element={<MotionReader />} />
        </Routes>
    );
};

export default RouterPage;
