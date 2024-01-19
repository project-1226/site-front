import React, { useRef, useState } from "react";
import axios from "axios";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const KakaoLogin = () => {
  const CLIENT_ID = "faedbe04334334fac3aa301b3e82d01a";
  const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
  // 프런트엔드 리다이랙트 URI 예시
  // const REDIRECT_URI =  "http://localhost:3000/oauth/callback/kakao";

  // 백엔드 리다이랙트 URI 예시
  // const REDIRECT_URI =  "http://localhost:5000/kakao/code";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <a href={KAKAO_AUTH_URL}>
      <img
        src={`${process.env.PUBLIC_URL}/image/kakao_login.png`}
        alt="Kakao Login"
        width="100%"
      />
    </a>
  );
};

export default KakaoLogin;
