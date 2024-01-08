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
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const size = 5;
  const [page, setPage] = useState(1);
  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
  };

  const getList = async () => {
    const res = await axios("/product_review/list");
  };

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
      {list.map((l) => (
        <Card key={l.addressid} sx={{ mb: 3 }}>
          <CardContent>
            {loading ? (
              <Skeleton
                animation="wave"
                height={20}
                width="30%"
                style={{ marginBottom: 20 }}
                flexGrow="1"
              />
            ) : (
              <Stack direction="row" alignItems="center" mb={2}>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ fontWeight: "bolder" }}
                  flexGrow="1"
                >
                  {l.recipient}
                  {l.selected === 1 && " (기본 배송지)"}
                </Typography>
              </Stack>
            )}
            {loading ? (
              <>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="60%" />
              </>
            ) : (
              <>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  [{l.address1}] {l.address2} {l.address3}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  연락처 : {l.recipient_phone}
                </Typography>
              </>
            )}
            <Stack direction="row" spacing={1} mt={1} justifyContent="end">
              <Button variant="contained" size="small">
                수정
              </Button>
              <Button variant="outlined" size="small">
                삭제
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ))}
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
