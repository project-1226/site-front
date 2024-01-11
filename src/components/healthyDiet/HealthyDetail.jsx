import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useParams,useLocation } from 'react-router-dom';

//useNavigate두번째 인자로 getFoodList()함수도 props로 전달가능하면 이후 수정
const HealthyDetail = ({ initialFoods}) => {
  const {tag} = useParams
  const location = useLocation(); 
  const [foods, setFoods] = useState(location.state?.initialFoods || []);
  const [loading, setLoading] = useState(false);


  const getFoodList= async()=>{
    setLoading(true);
    try {
      let res = await axios('/food/list?categoryid=' + tag);
      setFoods(res.data);
      console.error(res.data)
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    // initialFoods가 없는 경우에만 데이터를 새로 불러옴
    if (!location.state?.initialFoods){
      getFoodList();
    }  
    console.log(foods)
  }, [location.state?.initialFoods]);

  return (
    <div className='healthy_wrap'>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>


      {foods.map((food)=>
      <h1>{food.name}</h1>
      )}
      
      
    </div>
  )
}

export default HealthyDetail