import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SigninPage from "./user/SigninPage";

import Imagereader from "./ai/Imagereader";
import MotionReader from "./ai/MotionReader";
import Chatbot from "./chatbot/Chatbot";
import AiList from "./ai/AiList";
import Cart from "./cart/Cart";

const RouterPage = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* user */}
      <Route path="/login" element={<SigninPage />} />
      <Route path="/AIimg" element={<Imagereader />} />

     <Route path="/AImotion" element={<MotionReader />} />
     <Route path="/Chatbot" element={<Chatbot />} />
     <Route path="/Ailist" element={<AiList />} />
     <Route path="/Cart" element={<Cart />} />
    </Routes>
  );
};

export default RouterPage;
