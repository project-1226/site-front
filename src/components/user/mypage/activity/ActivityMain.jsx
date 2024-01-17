import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostList from "./PostList";
import CommentList from "./CommentList";
import axios from "axios";

const ActivityMain = () => {
  const [value, setValue] = useState("1");

  const [postCnt, setPostCnt] = useState(0);
  const [commentCnt, setCommentCnt] = useState(0);

  const getTotalPost = async () => {
    const res = await axios("/activity/total-post", {
      params: {
        userid: sessionStorage.getItem("userid"),
      },
    });
    setPostCnt(res.data);
  };

  const getTotalComment = async () => {
    const res = await axios("/activity/total-comment", {
      params: {
        userid: sessionStorage.getItem("userid"),
      },
    });
    setCommentCnt(res.data);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getTotalPost();
    getTotalComment();
  }, []);

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
            <Tab label={`작성한 글 (${postCnt})`} value="1" />
            <Tab label={`작성한 댓글 (${commentCnt})`} value="2" />
          </TabList>
        </Box>
        <TabPanel className="seon-mypage-MuiTabPanel-root" value="1">
          <PostList />
        </TabPanel>
        <TabPanel className="seon-mypage-MuiTabPanel-root" value="2">
          <CommentList />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ActivityMain;
