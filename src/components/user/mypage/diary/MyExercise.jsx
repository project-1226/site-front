import {
  ArrowRight,
  ExpandMore,
  SmartDisplay,
  VideoCameraFront,
  YouTube,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HealthcareModal from "../../../healthcare/HealthcareModal";
import { useNavigate } from "react-router";

const MyExercise = ({ userInfo }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const navi = useNavigate();

  const handleYoutubeClick = (categoryid) => {
    setIsModalOpen(true);
    setSelectedCategory(categoryid);
  };

  const handleAiClick = (id) => {
    if (id === 32) {
      navi("/aisquat");
    } else {
      alert(
        "해당 운동에 대한 ai 트레이너가 준비 중입니다.\n최대한 빨리 준비하도록 하겠습니다."
      );
    }
  };

  const getPlan = async (categoryid) => {
    const res = await axios("/exercise/myexercises", {
      params: {
        userid: sessionStorage.getItem("userid"),
        categoryid,
      },
    });
    // console.log(res.data);
    return res.data;
  };

  const getCategories = async () => {
    setLoading(true);
    const res = await axios("/exercise/categoryList", {
      params: { userid: sessionStorage.getItem("userid") },
    });
    // console.log(res.data);
    const categories = res.data;

    const data = [];
    for (const category of categories) {
      try {
        const res1 = await getPlan(category.categoryid);
        const plan = {
          ...category,
          exercise_plans: res1,
        };
        data.push(plan);
      } catch (error) {
        console.error("Error - 주차별 식단 데이터 출력 : ", error);
      }
    }
    // console.log(data);
    setList(data);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

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
          {userInfo.nickname}님이 선택한 운동 리스트
        </Typography>
        {list.map((l, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography>{l.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction="row">
                <Grid container>
                  {l.exercise_plans.map((p, index) => (
                    <Grid item sm={6} key={index}>
                      <Typography alignContent="center">
                        <ArrowRight /> {p.name}
                        <Tooltip title="운동영상 보러가기">
                          <IconButton
                            onClick={() => handleYoutubeClick(p.categoryid)}
                          >
                            <SmartDisplay />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="ai와 운동하기">
                          <IconButton
                            onClick={() => handleAiClick(p.excerciseid)}
                          >
                            <VideoCameraFront />
                          </IconButton>
                        </Tooltip>
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      <HealthcareModal
        show={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        selectedCategory={selectedCategory}
        page={1}
      />
    </>
  );
};

export default MyExercise;
