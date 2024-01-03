

import React,{useState,useRef} from 'react'
import * as tmImage from '@teachablemachine/image';
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import {
  ImageText} from "../styledComponents"
import { Button, Col, Row } from 'react-bootstrap';

const URL = 'https://teachablemachine.withgoogle.com/models/2-g24N8tJ/';
const modelURL = URL + 'model.json';
const metadataURL = URL + 'metadata.json';

let model

const Container = styled.div`
  margin-left:auto;
  margin-right:auto;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: white;
  flex-direction: column;

  /* justify-content:space-evenly; */
  
  /* position:relative; */
  @media (min-width: 800px) {
    width: 600px;
    height: 100vh;
    /* border-left:1px solid #95afc0;
    border-right:1px solid #95afc0; */
  }
`;


const ImageUploadContainer=styled.input`
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    display:none;
`;

const ImageContainer=styled.div`
    position:relative;
    width: 70%;
    height: 28%;
    display:flex;
    background-color:rgba(0, 0, 0, 0.07);
    border-radius:10px;
    /* border:3px dashed #535c68; */
    justify-content:center;
    align-items:center;
    box-shadow: 0px 0px 25px #576574;
    z-index:5;
    flex-direction:column;
    box-shadow: 0px 3px 20px 10px rgba(0, 0, 0, 0.10);
  `;


const Image=styled.img`
    width:90%;
    height:90%;
    border-radius:10px;
`;


const MiddleContainer=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-top:5%;
`;

const ResultContainer=styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
`;

const ReulstScore=styled.h1`
    color:#fed06e;
    font-size:20px;
    font-weight:bolder;
    margin-right:5px;
    @media (min-width: 800px) {
      font-size:30px;
  }
`;
const ReulstName=styled.h1`
    color:white;
    font-size:20px;
    font-weight:bolder;
    background-color:#304967;
    margin-left:5px;
    padding:5px 7px;
    @media (min-width: 800px) {
      font-size:30px;
  }
`;

const KeyText=styled.h1`
    text-align: center;
    color: #193354;
    font-size:15px;
    font-weight:bolder;
    margin-top:-10px;
    @media (min-width: 800px) {
      font-size:20px;
  }
`;





const Imagereader = () => {
  const [foodData, setFoodData] = useState([]);
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null);	//파일

  const [showResult,setShowResult]=useState(false);
  const [predictionArr,setPredictionArr]=useState([]);
  const [result,setResult]=useState(null);
  const [keyword,setKeyword]=useState(null);
 //react-router 사용
 const navigate=useNavigate();
 // input 태그를 클릭하는 것과 같은 효과를 주기 위해서 사용
 const inputRef=useRef();

    async function init() {
      // let isIos = false; 
      // // fix when running demo in ios, video will be frozen;
      // if (window.navigator.userAgent.indexOf('iPhone') > -1 || window.navigator.userAgent.indexOf('iPad') > -1) {
      //   isIos = true;
      // }
      // load the model and metadata
      // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
      // or files from your local hard drive
      // Note: the pose library adds "tmImage" object to your window (window.tmImage)
      model = await tmImage.load(modelURL, metadataURL);
      //총 클래스 수
      let maxPredictions;
      maxPredictions = model.getTotalClasses();
    }


    async function predict() {
      // predict can take in an image, video or canvas html element
      model = await tmImage.load(modelURL, metadataURL);
      const tempImage = document.getElementById('srcImg');
      const prediction = await model.predict(tempImage, false);
      prediction.sort((a, b) => parseFloat(b.probability) - parseFloat(a.probability));
      setPredictionArr(prediction)
      setShowResult(true)

      setResult(prediction[0].className)
      switch(prediction[0].className){
        case "crunchi":
          setKeyword("크런치임");
          setFoodData((prevData) => [...prevData, '크런치']);
          break;
        case "펩시콜라":
          setKeyword("펩시콜라임");
          break;
      }
    }

      const handleChangeFile = (event) => {
   

        setPredictionArr(null);
        setResult(null);
    
        let reader = new FileReader();
    
        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드가 실행됩니다.
          const base64 = reader.result;
          if (base64) {
            setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
          }
        }
        if (event.target.files[0]) {
          reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
          setImgFile(event.target.files[0]); // 파일 상태 업데이트
          init().then(
            console.log("init 모델"),
            predict()
          );
    
        }
      }






  return (

    <div>




        
      <ImageContainer onClick={()=>{ inputRef.current.click();}}>

<ImageUploadContainer ref={inputRef} onChange={handleChangeFile} type="file" accept="image/*" />
{imgBase64?<Image id="srcImg" src={imgBase64}></Image>: 
<>
 <ImageText>GIVE ME A YOUR PICTURE!</ImageText>
</>
}
</ImageContainer>

<MiddleContainer>
<ResultContainer>
       <ReulstScore> 
       {showResult && predictionArr && predictionArr.length > 0
       ? `${(predictionArr[0].probability * 100).toFixed(1)}%`
       : null
       }
       </ReulstScore>
       <ReulstName>
         
       {showResult && predictionArr && predictionArr.length > 0
         ? predictionArr[0].className
         : null
       }
          
          </ReulstName>
   </ResultContainer>
   <KeyText>{keyword}</KeyText>

</MiddleContainer>

 
  
      
              {foodData.map((item, index) => (
        <div key={index}>{item}</div>
        ))}

   


        
      


    

            
        <Button>
            제출
          </Button>
  
    
      </div>

  )
}

export default Imagereader