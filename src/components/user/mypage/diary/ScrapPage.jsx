import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import MyFood from "./MyFood";
import MyExcercise from "./MyExcercise";

const ScrapPage = () => {
  const [value, setValue] = React.useState("1");

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
      }}
    >
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="secondary tabs example">
            <Tab label="식단" value="1" />
            <Tab label="운동" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <MyFood />
        </TabPanel>
        <TabPanel value="2">
          <MyExcercise />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ScrapPage;
