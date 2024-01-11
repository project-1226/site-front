import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React from "react";
import PostList from "./PostList";
import CommentList from "./CommentList";
import ReviewList from "./ReviewList";

const ActivityMain = () => {
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
        pr: 3,
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="작성한 글" value="1" />
            <Tab label="스크랩" value="2" />
            <Tab label="작성한 댓글" value="3" />
            <Tab label="작성한 리뷰" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <PostList />
        </TabPanel>
        <TabPanel value="2"></TabPanel>
        <TabPanel value="3">
          <CommentList />
        </TabPanel>
        <TabPanel value="4">
          <ReviewList />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ActivityMain;
