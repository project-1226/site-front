import { Box, Divider, Stack, Typography, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { LineChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import MyFood from "./MyFood";
import MyExcerciseList from "./MyExcerciseList";
import axios from "axios";

const Report = () => {
  const [value, setValue] = useState("1");
  const [list, setList] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getList = async () => {
    const res = await axios("/user/survey/read", {
      params: { userid: sessionStorage.getItem("userid") },
    });
    console.log(res.data);
    setList(res.data);
  };

  const goalWeigh = list.map((l, index) => {
    if (l.questionid === 10) {
      return <span key={index}>{l.input_text}kg</span>;
    }
    return null;
  });

  const currentWeigh = list.map((l, index) => {
    if (l.questionid === 9) {
      return <span key={index}>{l.input_text}kg</span>;
    }
    return null;
  });

  const calcurateWeek = currentWeigh - goalWeigh / 0.5 / 7;

  const nickname = list.map((l, index) => {
    if (l.questionid === 1) {
      return <span key={index}>{l.nickname}</span>;
    }
    return null;
  });

  useEffect(() => {
    getList();
  }, []);

  return (
    <Box sx={{ width: "100%", bgcolor: "transparent", py: 3, pl: 3, pr: 15 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack spacing={2} width="40%">
          <Typography
            variant="h4"
            color="primary"
            sx={{ fontWeight: "bolder" }}
          >
            목표 체중 : {goalWeigh}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            현재 체중 : {currentWeigh}
          </Typography>
          <Divider />
          <Typography>
            {nickname}님께 가장 이상적인 감량 속도는 1주당 -0.5kg으로 {nickname}
            님의 목표 체중인 {goalWeigh}까지의 예상 소요기간은 {calcurateWeek}주
            입니다.
          </Typography>
          <Typography>
            무리한 식습관은 근 손실, 요요 등 건강상의 문제를 일으킬 수 있으니
            영양 정보에 맞춰 목표를 달성하세요.
          </Typography>
        </Stack>
        <LineChart
          xAxis={[{ scaleType: "band", data: ["1", "현재", "목표", "2"] }]}
          series={[
            {
              color: "#748769",
              curve: "natural",
              data: [58.2, 58, 52, 51.8],
              showMark: ({ index }) => index === 1 || index === 2,
            },
          ]}
          width={500}
          height={300}
        />
      </Stack>
      <Divider sx={{ my: 2 }} />
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="secondary tabs example">
            <Tab label="식단" value="1" />
            <Tab label="운동" value="2" />
          </TabList>
        </Box>
        <TabPanel className="seon-mypage-MuiTabPanel-root" value="1">
          <MyFood />
        </TabPanel>
        <TabPanel className="seon-mypage-MuiTabPanel-root" value="2">
          <MyExcerciseList />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Report;
