import { ArrowRight, ExpandMore, LaunchRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DietModal from "../../../myDiet/DietModal";

const MyFood = ({ userInfo }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [isFoodChanged, setIsFoodChanged] = useState(false);

  const getPlan = async (regdate) => {
    const res = await axios("/food/mypage/plan", {
      params: {
        userid: sessionStorage.getItem("userid"),
        regdate,
      },
    });
    // console.log(res.data);
    return res.data;
  };

  const getDates = async () => {
    setLoading(true);
    const res = await axios("/food/mypage/plandate", {
      params: { userid: sessionStorage.getItem("userid") },
    });
    // console.log(res.data);
    const dates = res.data;

    const data = [];
    for (const date of dates) {
      try {
        const res1 = await getPlan(date.regdate);
        const plan = {
          ...date,
          food_plans: res1,
        };
        data.push(plan);
      } catch (error) {
        console.error("Error - 주차별 식단 데이터 출력 : ", error);
      }
    }
    console.log(data);
    setList(data);
    setLoading(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState("");
  const [selectedDay, setSelectedDay] = useState(1);
  const [isFoodChanged, setIsFoodChanged] = useState(false);

  const handleImageClick = (food, index) => {
    setIsModalOpen(true);
    setSelectedFood(food);
    setSelectedDay(index + 1);
  };

  useEffect(() => {
    getDates();
  }, []);
  useEffect(() => {
    getDates();
  }, [isFoodChanged]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <Typography variant="h6" sx={{ pb: 2 }}>
          {userInfo.nickname}님을 위한 추천 식단
        </Typography>
        {list.map((l, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>
                {index + 1}주차 ( {l.start_date} ~ {l.end_date} ) 식단
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction="row">
                <Grid container>
                  {l.food_plans.map((f, index) => (
                    <Grid item sm={6} key={index}>
                      <Typography>
                        <ArrowRight /> {index + 1}일차 : {f.name}
                        <IconButton onClick={() => handleImageClick(f, index)}>
                          <LaunchRounded sx={{ fontSize: 17 }} />
                        </IconButton>
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <DietModal
        show={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedMyFood={selectedFood}
        selectedDay={selectedDay}
        setIsFoodChanged={setIsFoodChanged}
        isFoodChanged={isFoodChanged}
      />
    </>
  );
};

export default MyFood;
