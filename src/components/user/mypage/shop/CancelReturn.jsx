import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CancelModal from "./CancelModal";

const CancelReturn = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const size = 10;
  const [page, setPage] = useState(1);
  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
  };

  const getList = async () => {
    setLoading(true);
    const res = await axios("/usershop/return/list", {
      params: { userid: sessionStorage.getItem("userid") },
    });
    setTotal(res.data.total);
    console.log(res.data.list);
    setList(res.data.list);
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
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bolder" }}>
        반품내역
      </Typography>
      {list.map((l) => (
        <Card key={l.cancelid} sx={{ minWidth: 275, mt: 2 }}>
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bolder", ml: 1, mb: 1 }}
            >
              {l.fmtdate} 반품
            </Typography>
            <Card variant="outlined">
              <CardContent sx={{ pb: 0 }}>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ fontWeight: "bolder" }}
                >
                  {l.str_status}
                </Typography>
              </CardContent>
              <Stack direction="row" mx={3} mb={1}>
                <CardContent sx={{ flex: 1, alignSelf: "center" }}>
                  <Stack spacing={3}>
                    <Stack direction="row" spacing={3}>
                      <CardMedia
                        component="img"
                        alt="product"
                        src={l.image_url}
                        sx={{ width: 82 }}
                      />
                      <Stack spacing={1}>
                        <Typography color="text">{l.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {l.fmtprice}원 / {l.count}개
                        </Typography>
                        <Typography variant="body2">
                          반품 사유 : {l.content}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
                <CardContent sx={{ width: 170, alignSelf: "center", pt: 3 }}>
                  <Stack spacing={1}>
                    <Button variant="outlined" size="small" fullWidth>
                      주문 상세 보기
                    </Button>
                  </Stack>
                </CardContent>
              </Stack>
            </Card>
          </CardContent>
        </Card>
      ))}
      <Pagination
        count={Math.ceil(total / size)}
        shape="rounded"
        color="primary"
        page={page}
        sx={{ mt: 3 }}
        onChange={handleChange}
      />
    </Box>
  );
};

export default CancelReturn;
