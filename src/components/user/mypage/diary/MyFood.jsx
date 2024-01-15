import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const MyFood = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const getList = async () => {};

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <Typography sx={{ pb: 2 }}>OO님을 위한 추천 식단</Typography>
        <Accordion sx={{ width: "60%" }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            식단?????
          </AccordionSummary>
          <AccordionDetails sx={{ ml: 5 }}>세부식단????</AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default MyFood;
