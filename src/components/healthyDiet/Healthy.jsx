import React, { useEffect, useState } from 'react'
import HealthyModal from './HealthyModal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Button } from '@mui/material';

const Healthy = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState('');
  const [foods,setFoods] = useState([]);
  const [tags,setTags] = useState([]);
  const [selectTag,setSelectTag] = useState("");

  const getTags=async()=>{
    const res = await axios('/food/categories/health')
    setTags(res.data);
    //console.log(res.data)
    
  }
  const getFoodList = async()=>{
    let res ="";
    if(selectTag==""){
      res = await axios('/food/health.list?categoryid='+14);
    } else {
      res = await axios('/food/health.list?categoryid='+selectTag.categoryid);
    }  
    //console.log(res.data)    
  }

  const handleMenuClick = (food) => {
    setSelectedMenu(food);
    setIsModalOpen(true);
  };

  const handleMoreClick = () => {
    //페이지이동 링크 -> food가지고가서 페이지 랜더링
  };

  const handleTagClick = (tag) => {
    setSelectTag(tag)
    getFoodList();
  };
  useEffect(()=>{
    getTags();
    getFoodList();
  },[])
  
  return (
    <div className='healthy_wrap'>
      <div className='healthy_main_wrap'>
        <div className='healthy_main'>
          <div className="main_text_box">
            <p className="main_subtitle"> 건강 목적과 필요에 따라 골라먹는 </p>
            <p className="main_title"> 건강식단 </p>

            <p className="main_article"> 오늘의 추천메뉴 </p>
            <p className="main_article">--!!{selectTag.name}!!--</p>
          </div>
        </div>{/* healthy_main */}
        <div className='recomm_menu'>
          {/* card수정예시 */}
          <div className='recomm_menuimg'>
            <Card  className='recomm_menuimg_main' onClick={() => handleMenuClick('food[0]')}>
            <CardContent>
              <Typography variant="h5" component="div"> food[0].image 음식사진1</Typography>
            </CardContent>
          </Card>
          {/* 식단 더알아보기페이지로 이동 */}
          <Card className='recomm_menuimg_footer' onClick={() => handleMoreClick()}>
            <CardContent>
              <Typography variant="h7" component="div"> 식단더알아보기 +++</Typography>
            </CardContent>
          </Card>
          </div>
          
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

      {/* categoryTags box */}
      <div className='healthy_tag_box'>
          {tags.map((tag) => (
            tag.categoryid === selectTag ?
              <Button
              key={tag.name}
              variant="outlined"
              size="small" 
              onClick={() => setSelectTag(tag)}             
            >
              {tag.name}
            </Button>
            :
            <Button
              key={tag.categoryid}
              variant="contained"
              size="small"
              onClick={() => handleTagClick(tag)}
            >
              {tag.name}
            </Button>   
          ))}
        </div>{/* categoryTags box */}

        {/* 카테고리 대표식단 세부내용++  */}
        <div>
        오늘의 추천식단중 대표하나 세부내용++++ db테이블에도 식단관련 설명 description 컬럼을 추가해서 내용을 뿌려야할듯
        food[1]에서 데이터 뿌리기
        </div>


      <div className='healthy_contents'>
        <section className='healthy_recipe'>
          <div className="contents_title_box">
            <p className="contents_title">레시피 모아모아</p>
          </div>

          <div className='healthy_video_wrap'>
            <div className='healthy_video'>유튜브 레시피 영상 food[0].name으로 검색한 영상</div>
            <div className='healthy_video'>유튜브 레시피 영상 food[1].name으로 검색한 영상</div>
            <div className='healthy_video'>유튜브 레시피 영상</div>
          </div>
        </section>{/* diet_recipe */}
      </div>

      <HealthyModal show={isModalOpen} handleClose={() => setIsModalOpen(false)} selectedMenu={selectedMenu} />
    </div>
  )
}

export default Healthy