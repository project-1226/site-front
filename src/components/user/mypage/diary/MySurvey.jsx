import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Backdrop, Box, CircularProgress, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import UpdateFood from "./UpdateFood";
import UpdateExcercise from "./UpdateExcercise";
import UpdateFit from "./UpdateFit";
import SurveyResult from "./SurveyResult";
import axios from "axios";

const MySurvey = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const getList = async () => {
    setLoading(true);
    const res = await axios("/user/survey/read", {
      params: { userid: sessionStorage.getItem("userid") },
    });
    // console.log(res.data);
    setList(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Box sx={{ width: "100%", bgcolor: "transparent", py: 5, pr: 3 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="설문결과" value="1" />
            <Tab label="신체정보" value="2" />
            <Tab label="식단정보" value="3" />
            <Tab label="운동정보" value="4" />
          </TabList>
        </Box>
        <TabPanel className="seon-mypage-MuiTabPanel-root" value="1">
          <SurveyResult list={list} />
        </TabPanel>
        <TabPanel className="seon-mypage-MuiTabPanel-root" value="2">
          <UpdateFit list={list} />
        </TabPanel>
        <TabPanel className="seon-mypage-MuiTabPanel-root" value="3">
          <UpdateFood list={list} />
        </TabPanel>
        <TabPanel className="seon-mypage-MuiTabPanel-root" value="4">
          <UpdateExcercise list={list} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default MySurvey;
