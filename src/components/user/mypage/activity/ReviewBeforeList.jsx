import {
  Backdrop,
  Button,
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReviewBeforeList = ({ purchaseid }) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const navi = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const size = 10;
  const [page, setPage] = useState(1);
  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
  };

  const getList = async () => {
    setLoading(true);
    const res = await axios("/product-review/list-review-x", {
      params: {
        userid: sessionStorage.getItem("userid"),
        purchaseid,
        page,
        size,
      },
    });
    // console.log(res.data);
    setTotal(res.data.total);
    setList(res.data.list);
    setLoading(false);
  };

  const onClickReview = (itemInfo) => {
    sessionStorage.setItem("path", pathname);
    navi("/mp/revw", { state: itemInfo });
  };

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
      <TableContainer component={Paper} sx={{ mt: 2, mb: 3 }}>
        <Table>
          <TableBody>
            {list.map((l) => (
              <Fragment key={l.purchasedetailid}>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>
                    <Stack direction="row" spacing={3}>
                      <img src={l.image_url} width="100px" />
                      <Stack py={1}>
                        <Typography variant="body1" sx={{ ml: 2 }}>
                          {l.name}
                        </Typography>
                        <Typography variant="body1" sx={{ ml: 2 }}>
                          {l.fmtprice}원 / {l.count}개
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ ml: 2, mt: 2.5 }}
                        >
                          {l.fmtdate} 구매
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ width: 170, alignSelf: "center" }}>
                    <Stack spacing={1}>
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        onClick={() => onClickReview(l)}
                      >
                        리뷰 작성하기
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {total === 0 ? (
        <Typography>구매 내역이 없습니다.</Typography>
      ) : (
        <Pagination
          count={Math.ceil(total / size)}
          shape="rounded"
          color="primary"
          page={page}
          sx={{ marginBottom: 5 }}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default ReviewBeforeList;
