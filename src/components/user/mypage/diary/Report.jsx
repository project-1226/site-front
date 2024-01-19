import { Box, Divider, Stack, Typography, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { LineChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import MyFood from "./MyFood";
import axios from "axios";
import MyExcercise from "./MyExercise";

const Report = () => {
  const [value, setValue] = useState("1");
  const [list, setList] = useState([]);
  const [userInfo, setUserInfo] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getUserInfo = async () => {
    const res = await axios("/user/read", {
      params: { userid: sessionStorage.getItem("userid") },
    });
    // console.log(res.data);
    setUserInfo(res.data);
  };

  const getList = async () => {
    const res = await axios("/user/survey/read", {
      params: { userid: sessionStorage.getItem("userid") },
    });
    console.log(res.data);
    setList(res.data);
  };

  const goalWeight = parseInt(
    list.find((l) => l.questionid === 10)?.input_text || "0"
  );

  const currentWeight = parseInt(
    list.find((l) => l.questionid === 9)?.input_text || "0"
  );

  const height = parseInt(
    list.find((l) => l.questionid === 8)?.input_text || "0"
  );

  let bmi = currentWeight / ((height / 100) * (height / 100));
  bmi = bmi.toFixed(2);

  const calculateWeek = () => {
    if (currentWeight > goalWeight) {
      return (currentWeight - goalWeight) / 0.5;
    } else {
      return (goalWeight - currentWeight) / 0.5;
    }
  };

  useEffect(() => {
    getUserInfo();
    getList();
  }, []);

  return (
    <Box sx={{ width: "100%", bgcolor: "transparent", py: 3, pl: 3, pr: 15 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Stack spacing={3} width="43%">
          <Typography
            variant="h4"
            color="primary"
            sx={{ fontWeight: "bolder" }}
          >
            목표 체중 : {goalWeight}kg
          </Typography>
          <Divider sx={{ borderColor: "#777777" }} />
          <Typography variant="h5" color="text.secondary">
            현재 체중 : {currentWeight}kg
          </Typography>
          <Typography variant="h5" color="text.secondary">
            현재 체질량지수(BMI) : {bmi} kg/m<sup>2</sup>
          </Typography>
        </Stack>
        <LineChart
          xAxis={[
            {
              scaleType: "band",
              data: ["1", "현재", "목표", "2"],
              tickLabelInterval: (value, index) => index === 1 || index === 2,
            },
          ]}
          series={[
            {
              color: "#748769",
              curve: "natural",
              data:
                currentWeight > goalWeight
                  ? [
                      currentWeight * 1.005,
                      currentWeight,
                      goalWeight,
                      goalWeight * 0.995,
                    ]
                  : [
                      currentWeight * 0.995,
                      currentWeight,
                      goalWeight,
                      goalWeight * 1.005,
                    ],
              showMark: ({ index }) => index === 1 || index === 2,
            },
          ]}
          width={500}
          height={300}
        />
      </Stack>
      <Typography>
        <strong>{userInfo.nickname}</strong>님께 가장 이상적인{" "}
        {currentWeight > goalWeight ? "감량" : "증량"} 속도는 1주당 -0.5kg으로{" "}
        <strong>{userInfo.nickname}</strong>
        님의 목표 체중인 <strong>{goalWeight}</strong>kg까지의 예상 소요기간은{" "}
        <strong>{calculateWeek()}</strong>주 입니다.
      </Typography>
      <Typography>
        무리한 식습관은 근손실, 요요 등 건강상의 문제를 일으킬 수 있으니 영양
        정보에 맞춰 목표를 달성하세요.
      </Typography>

      <Divider sx={{ my: 2, borderColor: "#777777" }} />
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="secondary tabs example">
            <Tab label="식단" value="1" />
            <Tab label="운동" value="2" />
          </TabList>
        </Box>
        <TabPanel className="seon-mypage-MuiTabPanel-root" value="1">
          <MyFood userInfo={userInfo} />
        </TabPanel>
        <TabPanel className="seon-mypage-MuiTabPanel-root" value="2">
          <MyExcercise userInfo={userInfo} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Report;
