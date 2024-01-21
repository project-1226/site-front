import { LockOutlined } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import GoogleLogin from "./login/GoogleLogin";
import KakaoLogin from "./login/KakaoLogin";

const SignupPage = ({ result }) => {
  const navi = useNavigate();
  const location = useLocation();
  //설문결과
  const [s_result, setS_result] = useState(location.state?.result);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // 비밀번호 일치 여부 확인을 위해 사용
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    if (!s_result) {
      alert("설문을 먼저 작성해주세요!");
      navi("/");
      return;
    }
    // console.log(data);
    if (window.confirm("회원 가입을 진행하시겠습니까?")) {
      await axios
        .post("/user/insert", { user: data, result: s_result })
        .then((response) => {
          alert(
            "회원가입을 환영합니다!\n가입 기념으로 3000포인트를 지급해드렸습니다!"
          );
        })
        .catch((error) => {
          alert("이미 가입된 이메일입니다.");
        });

      //회원가입 이후 로직
      navi("/mydiet");
    }
  };
  useEffect(() => {
    console.log(s_result);
  }, [location]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "grey" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                required
                fullWidth
                id="email"
                label="이메일"
                name="email"
                autoComplete="email"
              />
              {errors.email && errors.email.type === "required" && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  이메일을 입력해 주세요.
                </Alert>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  이메일 형식이 아닙니다.
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("password", { required: true })}
                required
                fullWidth
                name="password"
                label="비밀번호 확인"
                type="password"
                id="password"
                autoComplete="new-password"
              />
              {errors.password1 && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  비밀번호를 입력해 주세요.
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("passwordCheck", {
                  validate: (value) =>
                    value === password.current ||
                    "비밀번호가 일치하지 않습니다.",
                })}
                required
                fullWidth
                name="passwordCheck"
                label="비밀번호 확인"
                type="password"
                id="passwordCheck"
                autoComplete="new-password"
              />
              {errors.password2 && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errors.password2.message}
                </Alert>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Grid container spacing={1.5} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <GoogleLogin />
            </Grid>
            <Grid item xs={6}>
              <KakaoLogin />
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-end">
            <Grid item>
              {!s_result && (
                <Link href="/login" variant="body2">
                  이미 계정이 있으신가요?
                </Link>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
