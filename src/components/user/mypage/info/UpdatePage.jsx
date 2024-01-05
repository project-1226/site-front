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
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const UpdatePage = ({ userInfo, setIsEqualPass }) => {
  const form = userInfo;
  const [nicknameChange, setNicknameChange] = useState(form.nickname);
  const [phoneChange, setPhoneChange] = useState(form.phone);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, type) => {
    if (type === "nickname") {
      // console.log({ ...form, nickname: data });
      await axios.post("/user/update", { ...form, nickname: data });
      alert("닉네임이 변경되었습니다.");
      setNicknameChange(data);
    } else if (type === "phone") {
      // console.log({ ...form, phone: data });
      await axios.post("/user/update", { ...form, phone: data });
      alert("휴대폰 번호가 변경되었습니다.");
      setPhoneChange(data);
    }
  };

  const onSubmitPassword = async (data) => {
    await axios.post("/user/update", {
      ...form,
      password: data.newPassword,
      userid: sessionStorage.getItem("userid"),
    });
    alert(
      "비밀번호가 변경되었습니다\n변경된 비밀번호로 다시 로그인하시기 바랍니다."
    );
    window.location.href = "/login";
  };

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bolder" }}>
        회원정보수정
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {/* 아이디(이메일) */}
            <TableRow>
              <TableCell
                component="th"
                sx={{
                  width: "20%",
                  color: "gray",
                  fontWeight: "bold",
                  py: 3.2,
                }}
              >
                아이디(이메일)
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Typography>{userInfo.email}</Typography>
                </Stack>
              </TableCell>
            </TableRow>

            {/* 닉네임 변경 */}
            <TableRow>
              <TableCell
                component="th"
                sx={{
                  width: "20%",
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                닉네임
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <TextField
                    label="닉네임"
                    size="small"
                    name="nickname"
                    value={nicknameChange}
                    width="30%"
                    onChange={(e) => setNicknameChange(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => onSubmit(nicknameChange, "nickname")}
                  >
                    닉네임 변경
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>

            {/* 휴대폰 번호 변경 */}
            <TableRow>
              <TableCell
                component="th"
                sx={{
                  width: "20%",
                  color: "gray",
                  fontWeight: "bold",
                }}
              >
                휴대폰 번호
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <TextField
                    label="휴대폰 번호"
                    size="small"
                    name="phone"
                    value={phoneChange}
                    type="tel"
                    width="30%"
                    onChange={(e) => setPhoneChange(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => onSubmit(phoneChange, "phone")}
                  >
                    휴대폰 번호 변경
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>

            {/* 비밀번호 변경 */}
            <TableRow>
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
                <Stack spacing={2} sx={{ mt: 1 }}>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <TextField
                      label="현재 비밀번호"
                      size="small"
                      name="currentPassword"
                      type="password"
                      width="30%"
                      {...register("currentPassword", {
                        required: "현재 비밀번호를 입력하세요.",
                        validate: (value) =>
                          value === userInfo.password ||
                          "비밀번호가 일치하지 않습니다.",
                      })}
                    />
                    {errors.currentPassword && (
                      <Typography variant="caption" color="error">
                        {errors.currentPassword.message}
                      </Typography>
                    )}
                  </Stack>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <TextField
                      label="새 비밀번호"
                      size="small"
                      name="newPassword"
                      type="password"
                      {...register("newPassword", {
                        required: "새 비밀번호를 입력하세요.",
                        minLength: {
                          value: 8,
                          message: "비밀번호는 8자 이상이어야 합니다.",
                        },
                      })}
                    />
                    {errors.newPassword && (
                      <Typography variant="caption" color="error">
                        {errors.newPassword.message}
                      </Typography>
                    )}
                  </Stack>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <TextField
                      label="새 비밀번호 확인"
                      size="small"
                      name="newPasswordCheck"
                      type="password"
                      {...register("newPasswordCheck", {
                        required:
                          "확인을 위해 새 비밀번호를 다시 입력해주세요.",
                        validate: (value) =>
                          value === watch("newPassword") ||
                          "새 비밀번호가 일치하지 않습니다.",
                      })}
                    />
                    {errors.newPasswordCheck && (
                      <Typography variant="caption" color="error">
                        {errors.newPasswordCheck.message}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 2, mb: 1 }}
                  onClick={handleSubmit(onSubmitPassword)}
                >
                  비밀번호 변경
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" sx={{ my: 2 }} spacing={2} justifyContent="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsEqualPass(false)}
        >
          돌아가기
        </Button>
      </Stack>
    </>
  );
};

export default UpdatePage;
