import { FavoriteRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
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
import React from "react";

const MyWishItem = () => {
  return (
    <Box sx={{ width: "100%", bgcolor: "transparent", py: 5, pr: 3 }}>
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
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{ width: 30 }}>
                <Checkbox />
              </TableCell>
              <TableCell width={140}>
                <img src="http://via.placeholder.com/500x500" alt="product" />
              </TableCell>
              <TableCell>
                <Stack spacing={1}>
                  <Typography variant="h6">상품명</Typography>
                  <Typography variant="body1">가격</Typography>
                </Stack>
              </TableCell>
              <TableCell width={170}>
                <Stack spacing={1}>
                  <Button variant="contained" fullWidth>
                    장바구니 담기
                  </Button>
                  <Button variant="outlined" fullWidth>
                    삭제
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyWishItem;
