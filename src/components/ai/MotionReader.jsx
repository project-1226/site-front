import React, { useRef, useEffect,useState } from 'react';
import Webcam from 'react-webcam';
import * as tmPose from '@teachablemachine/pose';

const modelURL = 'https://teachablemachine.withgoogle.com/models/jwqc-NFPH/';
let model, webcam, ctx, labelContainer, maxPredictions;

const MotionReader = () => {
  const webcamRef = useRef(null);
  const modelRef = useRef(null);
  const [moveresult,setmoveResult]=useState(null);
  let [test, setTest]=useState(0);
  let [moveCnt, setMoveCnt]=useState(0);
	let movecounter = 0;
  useEffect(() => {
    const init = async () => {
      const modelURL = 'https://teachablemachine.withgoogle.com/models/jwqc-NFPH/model.json';
      const metadataURL = 'https://teachablemachine.withgoogle.com/models/jwqc-NFPH/metadata.json';

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
    if (test === '1.00') {
		setMoveCnt(prevMoveCnt => prevMoveCnt + 1);
		console.log(moveCnt);
	  }
	
  },[test]);

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

  return (
    <div>
		<h1>동작인식</h1>
		<hr></hr>
      
      <canvas id="canvas"></canvas>
      <div id="label-container"></div>
    </div>
  );
};

export default MotionReader;
