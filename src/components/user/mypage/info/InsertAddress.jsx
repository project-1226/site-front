import {
  PersonRounded,
  PinDropRounded,
  StayCurrentPortraitRounded,
} from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
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
import React, { useState } from "react";
import ModatPostCode from "./ModatPostCode";
import axios from "axios";

const InsertAddress = ({ setClickAdd }) => {
  const [form, setForm] = useState({
    userid: sessionStorage.getItem("userid"),
    selected: 0,
    recipient: "",
    recipient_phone: "",
    address1: "",
    address2: "",
    address3: "",
  });
  const {
    selected,
    recipient,
    recipient_phone,
    address1,
    address2,
    address3,
  } = form;
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectChange = (e) => {
    setForm({
      ...form,
      selected: e.target.checked ? 1 : 0,
    });
  };

  const onSubmit = async () => {
    setSubmitted(true);
    if (!recipient || !recipient_phone || !address1 || !address3) {
      return;
    }
    await axios.post("/address/insert", form);
    alert("배송지가 등록되었습니다.");
    setSubmitted(false);
    setClickAdd(false);
  };

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
                <TextField
                  fullWidth
                  type="text"
                  placeholder="받는 사람"
                  name="recipient"
                  value={recipient}
                  onChange={onChange}
                  helperText={
                    !recipient &&
                    submitted && (
                      <Typography variant="caption" color="error">
                        받는 사람 이름을 입력하세요.
                      </Typography>
                    )
                  }
                />
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
                <TextField
                  fullWidth
                  type="text"
                  placeholder="휴대폰 번호"
                  name="recipient_phone"
                  value={recipient_phone}
                  onChange={onChange}
                  helperText={
                    !recipient_phone &&
                    submitted && (
                      <Typography variant="caption" color="error">
                        휴대폰 번호를 입력하세요.
                      </Typography>
                    )
                  }
                />
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
                    name="address1"
                    value={address1}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <ModatPostCode form={form} setForm={setForm} />
                        </InputAdornment>
                      ),
                    }}
                    onChange={onChange}
                    helperText={
                      !address1 &&
                      submitted && (
                        <Typography variant="caption" color="error">
                          주소 검색을 해주세요.
                        </Typography>
                      )
                    }
                  />
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="주소"
                    name="address2"
                    value={address2}
                    InputProps={{
                      readOnly: true,
                    }}
                    onChange={onChange}
                  />
                  <TextField
                    fullWidth
                    type="text"
                    placeholder="상세주소"
                    name="address3"
                    value={address3}
                    onChange={onChange}
                    helperText={
                      !address3 &&
                      submitted && (
                        <Typography variant="caption" color="error">
                          상세 주소를 입력해주세요.
                        </Typography>
                      )
                    }
                  />
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <FormControlLabel
        control={
          <Checkbox
            checked={selected === 1}
            onChange={onSelectChange}
            name="selected"
          />
        }
        label="기본 배송지로 선택"
      />
      <Stack direction="row" sx={{ my: 2 }} spacing={2} justifyContent="center">
        <Button variant="contained" type="submit" onClick={onSubmit}>
          등록
        </Button>
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
