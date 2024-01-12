import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useState } from "react";
import UpdateFood from "./UpdateFood";
import UpdateExcercise from "./UpdateExcercise";
import UpdateFit from "./UpdateFit";

const MySurvey = () => {
  // 식단정보, 운동정보, 신체정보 로 나눠서 변경할 수 있게 하고 첫 페이지에는 그 결과를 보여주는걸로!

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", bgcolor: "transparent", py: 5, pr: 3 }}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="설문결과" value="1" />
            <Tab label="신체정보" value="2" />
            <Tab label="식단정보" value="3" />
            <Tab label="운동정보" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">설문결과</TabPanel>
        <TabPanel value="2">
          <UpdateFit />
        </TabPanel>
        <TabPanel value="3">
          <UpdateFood />
        </TabPanel>
        <TabPanel value="4">
          <UpdateExcercise />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default MySurvey;
