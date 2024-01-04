import React from 'react'
import HealthyModal from './HealthyModal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Healthy = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState('');

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setIsModalOpen(true);
  };

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
          <Card className='recomm_menuimg' onClick={() => handleMenuClick('음식사진1')}>
            <CardContent>
              <Typography variant="h5" component="div"> 음식사진1</Typography>
            </CardContent>
          </Card>
          <Card className='recomm_menuimg' onClick={() => handleMenuClick('음식사진2')}>
            <CardContent>
              <Typography variant="h5" component="div"> 음식사진2 </Typography>
            </CardContent>
          </Card>
          <Card className='recomm_menuimg' onClick={() => handleMenuClick('음식사진3')}>
            <CardContent>
              <Typography variant="h5" component="div"> 음식사진3 </Typography>
            </CardContent>
          </Card>
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

      <HealthyModal show={isModalOpen} handleClose={() => setIsModalOpen(false)} selectedMenu={selectedMenu} />
    </div>
  )
}

export default Healthy