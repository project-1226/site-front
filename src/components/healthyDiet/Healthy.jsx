import React from 'react'

const Healthy = () => {
  return (
    <div className='healthy_wrap'>
      <div className='healthy_main_wrap'>
        <div className='healthy_main'>
          <div className="main_text_box">
            <p className="main_subtitle"> 건강 목적과 필요에 따라 골라먹는 </p>
            <p className="main_title"> 건강식단 </p>

            <p className="main_article"> 오늘의 추천메뉴 </p>
          </div>
        </div>{/* healthy_main */}
        <div className='recomm_menu'>
          <div className='recomm_menuimg'>식단</div>
          <div className='recomm_menuimg'>식단</div>
          <div className='recomm_menuimg'>식단</div>
        </div>
      </div>{/* healthy_main_wrap */}

      <div className='healthy_contents'>
        <section className='healthy_recipe'>
          <div className="contents_title_box">
            <p className="contents_title">레시피 모아모아</p>
          </div>

          <div className='healthy_video_wrap'>
            <div className='healthy_video'>유튜브 레시피 영상</div>
            <div className='healthy_video'>유튜브 레시피 영상</div>
            <div className='healthy_video'>유튜브 레시피 영상</div>
          </div>
        </section>{/* diet_recipe */}
      </div>
    </div>
  )
}

export default Healthy