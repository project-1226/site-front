import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReviewAfterList from "./ReviewAfterList";
import ReviewBeforeList from "./ReviewBeforeList";
import axios from "axios";

const ReviewMain = () => {
  const [value, setValue] = useState("1");

  const [reviewXCnt, setReviewXCnt] = useState(0);
  const [reviewOCnt, setReviewOCnt] = useState(0);

  const getReviewXCnt = async () => {
    const res = await axios("/product-review/reviewXCnt", {
      params: {
        userid: sessionStorage.getItem("userid"),
      },
    });
    setReviewXCnt(res.data);
  };

  const getReviewOCnt = async () => {
    const res = await axios("/product-review/reviewOCnt", {
      params: {
        userid: sessionStorage.getItem("userid"),
      },
    });
    setReviewOCnt(res.data);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getReviewXCnt();
    getReviewOCnt();
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
            <Tab label={`리뷰 작성 (${reviewXCnt})`} value="1" />
            <Tab label={`작성한 리뷰 (${reviewOCnt})`} value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <ReviewBeforeList />
        </TabPanel>
        <TabPanel value="2">
          <ReviewAfterList />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ReviewMain;
