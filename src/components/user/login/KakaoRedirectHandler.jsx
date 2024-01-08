import React, { useEffect } from "react";
import axios from 'axios';
import queryString from 'query-string';
import {jwtDecode} from 'jwt-decode'; // 수정된 import
import { useNavigate } from 'react-router-dom';

const KakaoRedirectHandler = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const fetchToken = async () => { // async function 내부로 변경
          let params = new URL(document.location.toString()).searchParams;
          let code = params.get("code");
          const data = queryString.stringify({
            grant_type: "authorization_code",
            client_id: "faedbe04334334fac3aa301b3e82d01a",
            redirect_uri: "http://localhost:3000/oauth/callback/kakao",
            code: code,
          });
    
          try {
            const response = await axios.post('https://kauth.kakao.com/oauth/token', data, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
            });
            console.log(response)
            const decodedToken = jwtDecode(response.data.id_token);
            console.log(decodedToken.nickname);
            console.log(decodedToken.email);


            //로그인로직
            // const res = await axios.post("/user/login", { email, password: "0" });
            // console.log(res.data);
              // if (res.data === 0) {
              //   await axios.post("/user/insert", {
              //     email,
              //     photo: photoURL,
              //   });
              // }
              // sessionStorage.setItem("email", email);
              // window.location.href = "/";
           
          } catch (error) {
            // 에러 핸들링
            console.error("토큰 요청 에러", error);

          }
        };
    
        fetchToken(); // async function 호출
      }, [navigate]); // useEffect 의존성 배열에 navigate 추가

  return (


    <div>KakaoRedirectHandler</div>
  )
}

export default KakaoRedirectHandler