import React, { useState, useEffect, useRef } from "react";
import WebCam from "react-webcam";
import { CircularProgress } from "@mui/material";


//Our tensorflow library
let ml5;

//Teachable machine url after uploading your model
const modelURL = "https://teachablemachine.withgoogle.com/models/S0rqlc69D/";
let classifier;

export default function MotionReader() {
	const [loading, setLoading] = useState(true);

	//React hook for accessing the DOM element
	const webcamRef = useRef(null);

	//Label to be predicted by our classifier
	const [label, setLabel] = useState("");

	const videoConstraints = {
		width: 1280,
		height: 720,
		facingMode: "user",
	};

	//We're using asynchronous useEffect so we can wait for our classifier to be initialized before we attempt to use it
	useEffect(() => {
		ml5 = require("ml5"); //Workaround because of "window is not defined" error
		(async () => {
			classifier = await ml5.imageClassifier(modelURL + "model.json");
			classifyVideo();
		})();
	}, []);

	const classifyVideo = () => {
		try {
			loading && setLoading(false);
			//Get the classifications and pass it to callback function
			classifier.classify(webcamRef.current.video, gotResults);
		} catch (err) {
			console.log(err.message);
		}
	};

	const gotResults = async (error, results) => {
		const label = results[0].label; //Predicted label
		setLabel(label);
		classifyVideo(); // Run on next webcam image
	};

	return (
		<div >
			
					<WebCam
						audio={false}
						height={480}
						ref={webcamRef}
						screenshotFormat="image/jpeg"
						width={720}
						videoConstraints={videoConstraints}
					/>
		
	
		</div>
	);
}