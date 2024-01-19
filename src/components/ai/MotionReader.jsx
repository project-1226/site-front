import React, { useRef, useEffect,useState } from 'react';
import axios from "axios";
import Webcam from 'react-webcam';
import * as tmPose from '@teachablemachine/pose';
import { styled } from '@mui/material/styles';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import aiimg from '../../images/sq001.png'
import aifinish from '../../images/sqq002.png'
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Box,
  CardMedia,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,TextField,
  InputAdornment,Item, Stack
} from '@mui/material';
const modelURL = 'https://teachablemachine.withgoogle.com/models/OCgHIkBy1/';
let model, webcam, ctx, labelContainer, maxPredictions;

const MotionReader = () => {
  const webcamRef = useRef(null);
  const modelRef = useRef(null);
  const [moveresult,setmoveResult]=useState(null);
  let [test, setTest]=useState(0);
  let [moveCnt, setMoveCnt]=useState(0);
	let movecounter = 0;
  const [excount, setExcount] = useState(0);
  const [exset, setExset] = useState(1);
  const [ratio, setratio] = useState(50);
  const [movevalue,setMoveValue] = useState(0);
  const [coursepass,setCoursepass] =useState(false);
  const [data, setData]= useState({

  });

  const list = [
    { excerciseid: 1, regdate: '2022-01-01', result: 'Good' },
    { excerciseid: 2, regdate: '2022-01-02', result: 'Excellent' },
    // 추가적인 데이터...
  ];





  useEffect(() => {
    const init = async () => {
      const modelURL = 'https://teachablemachine.withgoogle.com/models/OCgHIkBy1/model.json';
      const metadataURL = 'https://teachablemachine.withgoogle.com/models/OCgHIkBy1/metadata.json';

      // Load the model and metadata
      model = await tmPose.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();
      modelRef.current = model;

      // Convenience function to set up a webcam
      const size = 500;
      const flip = true; // Whether to flip the webcam
      webcam = new tmPose.Webcam(size, size, flip); // Width, height, flip
      await webcam.setup(); // Request access to the webcam
      await webcam.play();
      window.requestAnimationFrame(loop);

      // Append/get elements to the DOM
      const canvas = document.getElementById('canvas');
      canvas.width = size;
      canvas.height = size;
      ctx = canvas.getContext('2d');
      labelContainer = document.getElementById('label-container');
      for (let i = 0; i < maxPredictions; i++) {
        // And class labels
        labelContainer.appendChild(document.createElement('div'));
      }
    };

    init();
  }, []);

  useEffect(() => {
   
    let timer;
    let timer2;
    console.log(timer)
    if (test === '1.00') {
      timer = setTimeout(() => {
        setMoveCnt(prevMoveCnt => prevMoveCnt + 1);

       
       // console.log(moveCnt); // 이 시점에서 moveCnt는 이전 값일  수 있음

      }, 2000);

     


    }

    return () => {
      clearTimeout(timer);
    };
   
  }, [test]);


  

  const loop = async (timestamp) => {
    webcam.update(); // Update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  };

  const predict = async () => {
    // Prediction #1: run input through posenet
    const { pose, posenetOutput } = await modelRef.current.estimatePose(webcam.canvas);
    // Prediction #2: run input through the Teachable Machine classification model
    const prediction = await modelRef.current.predict(posenetOutput); 

	
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
		//console.log( prediction[1].probability);
		setTest( prediction[0].probability.toFixed(2));
        
		labelContainer.childNodes[i].innerHTML = classPrediction;
	  //console.log(prediction[1].probability);
	
		setMoveValue(prediction[0].probability.toFixed(2));
		
			// if(prediction[0].probability.toFixed(2)==1.00){
            //     movecounter++;
			// }
			//console.log(movecounter)

	 


    }

    // Finally, draw the poses
    drawPose(pose);
  };
  


  
  const drawPose = (pose) => {
    if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);
      // Draw the keypoints and skeleton
      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  };


  const handleButtonClick = () => {
    // excount 상태를 1 증가시킨 후 업데이트
    setMoveCnt(moveCnt + 1);

  };

  const handleRestartClick = async() => {
    // excount 상태를 1 증가시킨 후 업데이트

    setExset(1);
    setMoveCnt(0);
    setCoursepass(false);
   
  };
  useEffect(() => {
    if(moveCnt > 10){
      setExset(exset +1);
      setMoveCnt(moveCnt - 10);
      if(exset >= 5){
        setExset(exset -5);
        setCoursepass(true);
      }else{

      }
    }else{

    }
	
  },[moveCnt]);
 


  return (
    <div className='ak_wrap'>
  <div className='ak_aicontents'>
       <Typography style = {{textAlign:"center",     fontWeight: "bold",fontSize:"40px",color:"#748769"}}>AI 트레이너 - 스쿼트</Typography>
		<hr></hr>
      
     <>
      <Stack direction="row" spacing={0} style={{width:"1800px",border:  '5px solid #748769'}}>

      <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
          <Box elevation={3} style={{ border: '5px solid #748769', justifyContent: 'center'}} >

          <canvas id="canvas"></canvas>
          </Box>

        </Grid>

        <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center' }}>
        <Box elevation={3} style={{  border: '5px solid #748769', justifyContent: 'center'}} >
          <CardMedia component="img" width="900" height="500" image={aiimg} alt="오운완" />
          </Box>
        </Grid>
        {coursepass ? (

        // coursepass가 true인 경우
   
           <Stack direction="col" spacing={0} style={{border: '5px solid #748769'}}>
              <Grid  style={{ display: 'flex', justifyContent: 'center' }}>
                  <CardMedia component="img" height="550" image={aifinish} alt="오운완" onClick={handleRestartClick}/>
              </Grid>
      
      
            

           </Stack>
      
 
      ) : (

        <Grid item xs={4} style={{ display: 'flex', justifyContent: 'center',}}>
            <Grid container spacing={2}>
                <Grid item xs={4}  >
                      <Box elevation={3}  style={{  justifyContent: 'center'}} >
                        <div style={{ width: 250, height: 250 }}>
                          <CircularProgressbar value={movevalue} maxValue={1} text={`${movevalue*100}%`}d />
                          
             
            
                      </div>
              
                    </Box>
                </Grid>

                <Grid item xs={4}>
                <Box elevation={3} style={{  justifyContent: 'center'}} >
                <div style={{ width: 200, height: 200 }}>
                        {Array.from({ length: moveCnt }).map((_, index) => (
                              <div key={index} className="akbtn-hover color-6"  >
                                 {index + 1}개
                              </div>
                            ))}
                      </div>
                   
                </Box>
                </Grid>
                <Grid item xs={4}>
                <Box elevation={3} style={{  justifyContent: 'center'}} >
                <div style={{ width: 200, height: 200 }}>
                        {Array.from({ length: exset }).map((_, index) => (
                              <div key={index} className="akbtn-hover2 color-10"  >
                                 {index + 1} 세트
                              </div>
                            ))}
                      </div>
                   
                </Box>
                </Grid>
           
             </Grid>
        </Grid>
   
      )}

     </Stack>

 
    
        <Grid item xs={12} style={{  borderRadius: '0' , width: '100%', height: '700px', justifyContent: 'center' }} >


                <iframe
                width="1800"
                height="700"
                src="https://www.youtube.com/embed/q6hBSSfokzY"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="YouTube Video"
              />


        
  
        </Grid>

       


 
    
    </>



       
    <div style={{color:"white"}} id="label-container"></div>
    </div>
    </div>
  );
};

export default MotionReader;
