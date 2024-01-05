import React, { useState, useEffect } from 'react';


const YouTubeSearchVideo = ({query ,size}) => {
  const [videoIds, setVideoIds] = useState([]);
  
  const fetchVideoIds = async () => {
    try {
      //const apiKeyConfig = require('../ApiKeyConfig');
      const apiKeyConfig = await import('../ApiKeyConfig');  

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=${query}&key=${apiKeyConfig.API_KEY}&part=snippet&type=video&maxResults=${size}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch video ID');
      }

      const data = await response.json();
      const items = data.items || [];

      // 각 비디오의 ID를 추출하여 배열에 저장
      const ids = items.map(item => item.id.videoId).filter(id => id);

      // videoIds 상태 업데이트
      setVideoIds(ids);

    } catch (error) {
      console.error('Error fetching video ID:', error);
    }
  };

  // useEffect를 사용하여 컴포넌트가 마운트될 때 한 번만 비디오 ID를 가져오도록 함
  useEffect(() => {
    fetchVideoIds();
  }, [query, size]);


  return (
    <div className='recipe_video_wrap'>
      {/* videoIds.map을 사용하여 여러 개의 iframe 생성 */}
      {videoIds.map((videoId, index) => (
        
          <iframe className='recipe_video'
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`YouTube Video ${index + 1}`}
            frameBorder="0"
            allowFullScreen
          ></iframe> 
      ))}
    </div>
  );
};

export default YouTubeSearchVideo;