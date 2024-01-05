import React from 'react'

const Healthcare = () => {
  return (
    <div className='healthcare_wrap'>
      <div className="healthcare_main">

      </div>
      <div className='healthcare_submain'>
        <div className='challenge_box'> 푸시업 챌린지 </div>
        <div className='challenge_box'> 스쿼트 챌린지 </div>
        <div className='challenge_box'> 런지 챌린지 </div>
        <div className='challenge_box'> 벤치딥스 챌린지 </div>
      </div>

      <div className='healthcare_contents'>
        <section>
          <div className="contents_title_box">
            <p className="contents_title">HOME TRAINING</p>
          </div>

          <div className='healthcare_video_wrap'>
            <div className='healthcare_video'>운동 영상</div>
            <div className='healthcare_video'>운동 영상</div>
            <div className='healthcare_video'>운동 영상</div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Healthcare