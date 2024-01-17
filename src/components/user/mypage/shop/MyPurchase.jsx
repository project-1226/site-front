import { SearchRounded } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyPurchase = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const navi = useNavigate();

  const size = 5;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
  };

  const getListDetail = async (id) => {
    const res = await axios("/usershop/list-detail", {
      params: {
        purchaseid: id,
        query,
      },
    });
    // console.log(res.data);
    return res.data;
  };

  const getPurchaseList = async () => {
    setLoading(true);
    const res = await axios("/usershop/list-purchase", {
      params: {
        userid: sessionStorage.getItem("userid"),
        page,
        size,
      },
    });
    // console.log(res.data);
    setTotal(res.data.total);

    const result = res.data.list;
    // console.log(result);
    const data = [];
    for (const list of result) {
      try {
        // console.log(list.purchaseid);
        const res1 = await getListDetail(list.purchaseid);
        const purchaseDetail = {
          ...list,
          detail: res1,
        };
        data.push(purchaseDetail);
      } catch (error) {
        console.error("Error processing image data:", error);
      }
    }
    console.log(data);
    setList(data);
    setLoading(false);
  };

  const onClickReview = (status, purchaseid) => {
    if (status !== 4) {
      if (
        window.confirm(
          "아직 배송이 완료되지 않은 상품입니다.\n리뷰를 작성하시겠습니까?"
        )
      ) {
        navi("/mp/ract", { state: { purchaseid } });
      }
    } else {
      navi("/mp/ract", { state: { purchaseid } });
    }
  };

  const onSearch = () => {
    console.log(query);
    getPurchaseList();
  };

  useEffect(() => {
    getPurchaseList();
  }, [page]);

  return (
    <Box sx={{ width: "100%", bgcolor: "transparent", py: 5, pr: 3 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bolder" }}>
        주문목록
      </Typography>
      <TextField
        label="주문상품"
        placeholder="주문한 상품을 검색할 수 있어요!"
        value={query}
        sx={{ width: "65%", mt: 2 }}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onSearch}>
                <SearchRounded />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {list.map((l) => (
        <Card key={l.purchaseid} sx={{ minWidth: 275, mt: 2 }}>
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bolder", ml: 1, mb: 1 }}
            >
              {l.fmtdate} 주문
            </Typography>
            <Card variant="outlined">
              <CardContent sx={{ pb: 0 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bolder" }}
                >
                  {l.str_status}
                </Typography>
              </CardContent>
              <Stack direction="row" mx={3} mb={1}>
                <CardContent sx={{ flex: 1, alignSelf: "center" }}>
                  <Stack spacing={3}>
                    {l.detail.map((d) => (
                      <Stack
                        direction="row"
                        spacing={3}
                        key={d.purchasedetailid}
                      >
                        <CardMedia
                          component="img"
                          alt="product"
                          src={d.image_url}
                          sx={{ width: 82 }}
                        />
                        <Stack spacing={1}>
                          <Typography color="text">{d.name}</Typography>
                          <Typography variant="body2">
                            {d.product_price}원 / {d.count}개
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
                <Divider orientation="vertical" />
                <CardContent sx={{ width: 170, alignSelf: "center", pt: 3 }}>
                  <Stack spacing={1}>
                    <Button variant="outlined" size="small" fullWidth>
                      배송조회
                    </Button>
                    <Button variant="outlined" size="small" fullWidth>
                      교환, 반품 신청
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      onClick={() => onClickReview(l.status, l.purchaseid)}
                    >
                      리뷰 작성하기
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

export default MyPurchase;
