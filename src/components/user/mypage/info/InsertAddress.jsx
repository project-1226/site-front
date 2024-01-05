import {
  PersonRounded,
  PinDropRounded,
  StayCurrentPortraitRounded,
} from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ModalPostCode from "./ModalPostCode";

const InsertAddress = ({ setClickAdd }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bolder" }}>
        배송지 추가
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {/* 받는 사람 */}
            <TableRow>
              <TableCell
                component="th"
                sx={{
                  width: "10%",
                  color: "gray",
                  fontWeight: "bold",
                }}
                align="center"
              >
                <PersonRounded sx={{ fontSize: "3rem" }} />
              </TableCell>
              <TableCell>
                <TextField fullWidth type="text" placeholder="받는 사람" />
              </TableCell>
            </TableRow>

            {/* 휴대폰 번호 */}
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                sx={{
                  width: "10%",
                  color: "gray",
                  fontWeight: "bold",
                }}
                align="center"
              >
                <StayCurrentPortraitRounded sx={{ fontSize: "2.7rem" }} />
              </TableCell>
              <TableCell>
                <TextField fullWidth type="text" placeholder="휴대폰 번호" />
              </TableCell>
            </TableRow>

            {/* 주소 */}
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                sx={{
                  width: "10%",
                  color: "gray",
                  fontWeight: "bold",
                }}
                align="center"
              >
                <PinDropRounded sx={{ fontSize: "2.7rem" }} />
              </TableCell>
              <TableCell>
                <Stack spacing={1}>
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="우편번호"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="주소"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField fullWidth type="password" placeholder="상세주소" />
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <FormControlLabel control={<Checkbox />} label="기본 배송지로 선택" />
      <Stack direction="row" sx={{ my: 2 }} spacing={2} justifyContent="center">
        <Button variant="contained">등록</Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setClickAdd(false)}
        >
          취소
        </Button>
      </Stack>
    </>
  );
};

export default InsertAddress;
