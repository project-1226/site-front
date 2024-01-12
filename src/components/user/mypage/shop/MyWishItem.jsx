import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyWishItem = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const size = 5;
  const [page, setPage] = useState(1);
  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
  };

  const getImage = async (id) => {
    const res = await axios("/user-favorite/list-image", {
      params: { productid: id },
    });
    // console.log(res.data);
    return res.data;
  };

  const getFavoriteList = async () => {
    setLoading(true);
    const res = await axios("/user-favorite/list-product", {
      params: { userid: sessionStorage.getItem("userid"), page, size },
    });
    // console.log(res.data);
    setTotal(res.data.total);

    const result = res.data.list;
    const data = [];
    for (const list of result) {
      try {
        const imageData = await getImage(list.productid);
        const productWithImage = {
          ...list,
          image: imageData,
        };
        data.push(productWithImage);
      } catch (error) {
        console.error("Error processing image data:", error);
      }
    }
    setList(data);
    setLoading(false);
  };

  const onDelete = async (e, favoriteid) => {
    e.preventDefault();
    await axios.delete("/user-favorite/delete", { params: { favoriteid } });
    alert("해당 상품이 삭제되었습니다.");
    getFavoriteList();
  };

  useEffect(() => {
    getFavoriteList();
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
        찜 리스트
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={4}>
                <Stack direction="row" spacing={4}>
                  <Checkbox />
                  <Button variant="outlined" color="error">
                    선택삭제
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((l) => (
              <TableRow
                key={l.favoriteid}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: "150px",
                }}
              >
                <TableCell sx={{ width: 30 }}>
                  <Checkbox />
                </TableCell>
                <TableCell width={140}>
                  {l.image.length === 0 ? (
                    <img
                      src="http://via.placeholder.com/100x100"
                      alt="product"
                    />
                  ) : (
                    l.image.map((i) => (
                      <img
                        key={i.imageid} // 이 부분은 이미지의 고유한 키를 사용해야 합니다.
                        src={i.image_url}
                        alt="product"
                      />
                    ))
                  )}
                </TableCell>
                <TableCell>
                  <Stack spacing={1}>
                    <Typography variant="h6">{l.name}</Typography>
                    <Typography variant="body1">{l.fmtprice}원</Typography>
                  </Stack>
                </TableCell>
                <TableCell width={170}>
                  <Stack spacing={1}>
                    <Button variant="contained" fullWidth>
                      장바구니 담기
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={(e) => onDelete(e, l.favoriteid)}
                    >
                      삭제 {l.favoriteid}
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

export default MyWishItem;
