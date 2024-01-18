import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatBot from 'react-simple-chatbot'
import {ThemeProvider} from 'styled-components'
import "react-chatbot-kit/build/main.css";
import "../../css/chatbot.css";
import ChatIcon from '@mui/icons-material/Chat';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
const Chatbotchatstart = () => {
    const [user, setUser] = useState("");

    const getUser = async () => {
        const res = await axios("/user/read", {
          params: {
            userid: sessionStorage.getItem("userid"),
          },
        });
        setUser(res.data);
        console.log(user);
      };

        const userid = sessionStorage.getItem("userid");
        
  
        useEffect(() => {
          getUser();
        }, [userid]);


     
    const steps = [
        {
            id: '0',
            message: `${user.nickname}님! 안녕하세요.
            $어플이름 상담 챗봇입니다.`,
            trigger: '1',
        },
        {
            id: '1',
            message: `우리의 서비스가 궁금하셨죠?            
            그럼 소개를 시작해볼까요?
            준비가 되셨다면 시작버튼을
            눌러 주세요.`
            ,
            trigger: '2',
        },
        {
            id: '2',
            options: [
                { value: 1, label: '설명보기', trigger: '3' },
                { value: 2, label: '시작안하기', trigger: '4' },
            ],
        },
        {
            id: '3',
            message: `우리는 식단과 운동어쩌고 `,
            trigger: '5',
        },

        {
            id: '4',
            message: `ㄲㅈ `,
       
        },


        {
            id: '5',
            options: [
                { value: 1, label: '더듣기 ', trigger: '6' },
                { value: 2, label: '그만보기', trigger: '4' },
            ],
        },

        {
            id: '6',
            message: `저쩌고어쩌고 저쩌고어쩌고 저쩌고어쩌고 저쩌고어쩌고 저쩌고어쩌고 저쩌고어쩌고 저쩌고어쩌고 저쩌고어쩌고 저쩌고어쩌고 저쩌고어쩌고 `,
            trigger: '7',
        },
        {
            id: '7',
            options: [
                { value: 1, label: '끝났습니다 '},
   
            ],
        },

 
    
    ]


    const theme = {
        background: '#f5f8fb',
        fontFamily: 'Helvetica Neue',
        headerBgColor: '#748769',
        headerFontColor: '#fff',
        headerFontSize: '15px',
        botBubbleColor: '#748769',
        botFontColor: '#FFF',
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
        posision: 'relative',
        bottom: '120px'
    };

  return (
  <>
   <ThemeProvider theme={theme}>
            <ChatBot
              steps={steps}
              hideHeader={true}
              placeholder={'채팅이 불가능한 채널입니다.'}
            />
          </ThemeProvider>
          </>
       
  )
}

export default Chatbotchatstart