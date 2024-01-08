import { div } from '@tensorflow/tfjs';
import React, { useState, useEffect } from 'react';


const YouTubeSearchVideo = ({query ,size}) => {
  // const [videoIds, setVideoIds] = useState([]);
  // const [index,setIndex] = useState(0);
  // const fetchVideoIds = async () => {
  //   try {
  //     //const apiKeyConfig = require('../ApiKeyConfig');
  //     const apiKeyList = apiKeyConfig.API_KEYS;
  //     const apiKey = apiKeyList[index];

  //     const response = await fetch(
  //       `https://www.googleapis.com/youtube/v3/search?q=${query}&key=${apiKey}&part=snippet&type=video&maxResults=${size}`
  //     );

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch video ID');
  //     }
      
  //     const data = await response.json();
  //     console.log(data)
  //     const items = data.items || [];

  //     // 각 비디오의 ID를 추출하여 배열에 저장
  //     const ids = items.map(item => item.id.videoId).filter(id => id);

  //     // videoIds 상태 업데이트
  //     setVideoIds(ids);

  //   } catch (error) {
  //     console.error('Error fetching video ID:', error);
  //     if (error.message.includes('quotaExceeded')){
  //       //할당량초과시 다음API키로 전환
  //       if(index + 1 < apiKeyList.length){
  //         //useState 함수형 업데이트 패턴 ->값 안정적
  //         setIndex(prevIndex => prevIndex + 1)
  //         fetchVideoIds()
  //       } else {
  //         console.error('모든 api key에대한 할당량 소진::', error);
  //       }
  //     }
  //   }
  // };

  // // useEffect를 사용하여 컴포넌트가 마운트될 때 한 번만 비디오 ID를 가져오도록 함
  // useEffect(() => {
  //   fetchVideoIds();
  // }, [query, size, index]);


  // return (
  //   <div>
      
  //     {/* videoIds.map을 사용하여 여러 개의 iframe 생성 */}
  //     {videoIds.map((videoId, index) => (
        
  //         <iframe
  //           width="560"
  //           height="315"
  //           src={`https://www.youtube.com/embed/${videoId}`}
  //           title={`YouTube Video ${index + 1}`}
  //           frameBorder="0"
  //           allowFullScreen
  //         ></iframe> 
  //     ))}
  //   </div>
  // );
  return(
    <div>
      유투브 iframe대체 div
    </div>
  );
};

export default YouTubeSearchVideo;