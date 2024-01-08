import {
  Table,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";

const CheckPage = ({ user, onPassCheck }) => {
  const [inputPass, setInputPass] = useState("");

  const onChangePass = (e) => {
    setInputPass(e.target.value);
  };

  const onCheckPass = () => {
    const isPassEqual = inputPass === user.password;
    if (!isPassEqual) {
      alert("비밀번호가 잘못 입력되었습니다.");
    } else {
      onPassCheck(isPassEqual);
    }
  };

  return (
    <>
      <Stack spacing={1} mb={2}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bolder" }}>
          회원정보확인
        </Typography>
        <Typography variant="body2">
          <span style={{ color: "#748769", fontWeight: "bolder" }}>
            {user.email}
          </span>{" "}
          님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인합니다.
        </Typography>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {/* 아이디 확인 */}
            <TableRow>
              <TableCell
                component="th"
                sx={{
                  width: "20%",
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                아이디(이메일)
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Typography>{user.email}</Typography>
                </Stack>
              </TableCell>
            </TableRow>

            {/* 비밀번호 확인 */}
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                sx={{
                  width: "20%",
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                비밀번호
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  variant="standard"
                  type="password"
                  placeholder="password"
                  onChange={onChangePass}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" sx={{ my: 2 }} spacing={2} justifyContent="center">
        <Button variant="contained" onClick={onCheckPass}>
          확인
        </Button>
        <Button variant="contained" color="secondary">
          취소
        </Button>
      </Stack>
    </>
  );
};

export default CheckPage;
