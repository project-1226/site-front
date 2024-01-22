// AsyncMessageComponent.jsx
import React, { useEffect } from 'react';

const AsyncMessageComponent = ({ onLoad }) => {
  useEffect(() => {
    const asyncOperation = async () => {
      try {
        // 비동기 작업을 수행합니다.
        // 예: 2초 후에 비동기 작업이 완료된 것으로 가정
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 비동기 작업이 완료되면 onLoad 콜백을 호출하여 채팅을 이어갑니다.
        onLoad();
      } catch (error) {
        console.error('Error in async operation:', error);
      }
    };

    // 비동기 작업을 시작합니다.
    asyncOperation();
  }, [onLoad]);

  return <div>Loading...</div>; // 로딩 중임을 표시하는 메시지
};

export default AsyncMessageComponent;
