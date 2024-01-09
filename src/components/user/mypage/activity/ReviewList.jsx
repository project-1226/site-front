import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ReviewList = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [total, setTotal] = useState(0);

  const size = 5;
  const [page, setPage] = useState(1);
  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
  };

  const getList = async () => {
    setLoading(true);
    const res = await axios("/product_review/list", {
      params: { userid: sessionStorage.getItem("userid"), page, size },
    });
    // console.log(res.data);
    setTotal(res.data.total);
    // console.log(res.data.list);
    let images = [];
    const data = res.data.list.map(
      (r) =>
        r && {
          ...r,
          images: getImage(r.product_reviewid),
        }
    );
    console.log(data);
    setLoading(false);
  };

  const getImage = async (id) => {
    const res = await axios("/product_review/image", {
      params: { product_reviewid: id },
    });
    console.log(res.data);
  };

  useEffect(() => {
    getList();
    getImage();
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bolder" }}>
        리뷰 ({total})
      </Typography>
      {}
      <Stack justifyContent="center">
        <Pagination
          count={Math.ceil(total / size)}
          shape="rounded"
          color="primary"
          page={page}
          sx={{ marginBottom: 5 }}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
};

export default ReviewList;
