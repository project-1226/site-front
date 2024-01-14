import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useState } from "react";
import UpdateFood from "./UpdateFood";
import UpdateExcercise from "./UpdateExcercise";
import UpdateFit from "./UpdateFit";
import SurveyResult from "./SurveyResult";
import axios from "axios";

const MySurvey = () => {
  const [list, setList] = useState([]);

  const getList = async () => {
    // const res = await axios("/")
  };

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
        <TabPanel value="1">
          <SurveyResult />
        </TabPanel>
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
