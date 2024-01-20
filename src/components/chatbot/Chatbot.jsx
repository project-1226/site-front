import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatBot from 'react-simple-chatbot';
import {ThemeProvider} from 'styled-components';
import "react-chatbot-kit/build/main.css";
import "../../css/chatbot.css";
import ChatIcon from '@mui/icons-material/Chat';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const Chatbot = () => {
  const [chatbotOpened, setChatbotOpened] = useState(false);
  const [user, setUser] = useState("");

  const [myFoods, setMyFoods] = useState([]);
  const [form, setForm] = useState({
    userid: sessionStorage.getItem("userid"),
    day1food:"",
    day2food:"",
    day3food:"",
    day4food:"",
    day5food:"",
    day6food:"",
    day7food:"",
  });

  const getUser = async () => {
    const res = await axios("/user/read", {
      params: {
        userid: sessionStorage.getItem("userid"),
      },
    });
    setUser(res.data);
    console.log(user);
  };

  
  
  const getMyList = async () => {

    const res = await axios(
      "/food/myfood/list?userid=" + sessionStorage.getItem("userid")
    );
    console.log("0---------------------------"+res.data[0].name);
    setMyFoods(res.data);
    setForm(prevForm => ({
      ...prevForm,
      day1food: res.data[0].name,
      day2food: res.data[1].name,
      day3food: res.data[2].name,
      day4food: res.data[3].name,
      day5food: res.data[4].name,
      day6food: res.data[5].name,
      day7food: res.data[6].name




    }));
    


  };

  useEffect(() => {
    getMyList();
    
  }, []);



  if (myFoods.length > 0) {
    console.log(myFoods[0].name);
    console.log(myFoods[1].name);
    console.log(myFoods[2].name);
    console.log(myFoods[3].name);
    console.log(myFoods[4].name);
    console.log(myFoods[5].name);
    console.log(myFoods[6].name);
  } else {
    console.log("myFoods 배열이 비어 있습니다.");
  }










  const handleChatbotToggle = () => {
    setChatbotOpened(!chatbotOpened);
  };
  
  const userid = sessionStorage.getItem("userid");

  useEffect(() => {
    getUser();

  }, [userid]);

  const steps = [
    {
      id: '0',
      message: `${user.nickname}님! 안녕하세요. 밀조이 상담 챗봇입니다.`,
      trigger: '1',

    },
    {
      id: '1',
      message: `무엇을 도와드릴까요?`,
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 1, label: '내식단보기', trigger: '3' },
        { value: 2, label: '내 운동보기', trigger: '4' },
        { value: 3, label: '그만하기', trigger: '99' },

      ],
    },
    {
      id: '3',
      options: [
        { value: 1, label: '1일차 식단보기', trigger: '5' },
        { value: 2, label: '2일차 식단보기', trigger: '6' },
        { value: 3, label: '3일차 식단보기', trigger: '7' },
        { value: 4, label: '4일차 식단보기', trigger: '8' },
        { value: 5, label: '5일차 식단보기', trigger: '9' },
        { value: 6, label: '6일차 식단보기', trigger: '10' },
        { value: 7, label: '7일차 식단보기', trigger: '11' },
        { value: 8, label: '그만보기', trigger: '2' },
      ],
    },
    {
      id: '4',
      message: `ㄲㅈ `,
    },
    {
     
      id: '5',
      message: `1일차             ${form.day1food}`,
      trigger: '3',
    },
    {
      id: '6',
      message: `2일차  ${form.day2food}`,
      trigger: '3',
    },
    {
      id: '7',
      message: `3일차  ${form.day3food}`,
      trigger: '3',
    },
    {
      id: '8',
      message: `4일차  ${form.day4food}`,
      trigger: '3',
    },
    {
      id: '9',
      message: `5일차  ${form.day5food}`,
      trigger: '3',
    },
    {
      id: '10',
      message: `6일차  ${form.day6food}`,
      trigger: '3',
    },
    {
      id: '11',
      message: `7일차  ${form.day7food}`,
      trigger: '3',
    },
    {
      id: '99',
      message: `상담이 종료되었습니다`,

    },




  ];

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

  const handleCloseChatbot = () => {
    setChatbotOpened(false);
  };

  const ChatbotContent = () => {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={steps}
          hideHeader={true}
          placeholder={'채팅이 불가능한 채널입니다.'}
        />
      </ThemeProvider>
    );
  };

  return (
    <div className='ak_wrap'>
      <div className='ak_contents'>
        <div className='cbfloat-container'>
          {chatbotOpened &&
            <div className='leDQrA'>
              <ThemeProvider theme={theme}>
                <ChatBot
                  steps={steps}
                  hideHeader={true}
                  placeholder={'채팅이 불가능한 채널입니다.'}
                />
              </ThemeProvider>
            </div>
          }
          <div className='cbfloat-button-container'>
            <button
              className='btn-hover color-5'
              onClick={handleChatbotToggle}
            >
              <ContactSupportIcon style={{ fontSize: '3rem' }} />

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;