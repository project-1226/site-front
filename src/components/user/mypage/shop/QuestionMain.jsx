import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useState } from "react";
import FAQPage from "./FAQPage";
import QNAPage from "./QNAPage";

const QuestionMain = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        bgcolor: "transparent",
        py: 4.5,
        pr: 3,
      }}
    >
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="FAQ" value="1" />
            <Tab label="1:1문의" value="2" />
          </TabList>
        </Box>
        <TabPanel className="seon-mypage-MuiTabPanel-root" value="1">
          <FAQPage />
        </TabPanel>
        <TabPanel className="seon-mypage-MuiTabPanel-root" value="2">
          <QNAPage />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default QuestionMain;
