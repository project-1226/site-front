import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import GoogleLogin from "./login/GoogleLogin";
import KakaoLogin from "./login/KakaoLogin";
import { useNavigate } from "react-router";
import { setCookie } from "../../common.js";

const SigninPage = ({ setIsHeader, setIsFooter }) => {
  const [checked, setChecked] = useState(false);

  const navi = useNavigate();
  const {
    register, // React Hook Form 에 등록
    handleSubmit, // 폼의 제출 -> 제출되기 전 유효성 검사
    formState: { errors }, // 폼의 상태 정보 -> 에러 정보 확인
  } = useForm();

  const onSubmit = async (data) => {
    const res = await axios.post("/user/login", data);
    console.log(res.data);
    const result = res.data.result;
    // console.log(result + ", " + userid);
    if (result === 0) {
      alert("해당 이메일이 존재하지 않습니다.");
    } else if (result === 2) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      const userid = res.data.user.userid;
      if (checked) {
        setCookie("userid", userid, 7);
      }
      alert("로그인 성공!");
      //헤더 푸터 보이는여부 -> 설문질문페이지 마지막에서 이벤트로 처리예정
      setIsHeader(true);
      setIsFooter(true);
      sessionStorage.setItem("userid", userid);
      if (sessionStorage.getItem("userid") === "2fa0017c-053b-4983-8") {
        navi("/admin");
      } else {
        navi("/mydiet");
      }
    }
  };
  useEffect(() => {
    setIsHeader(true);
  }, []);
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
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                margin="normal"
                fullWidth
                {...register("password", {
                  required: "비밀번호를 입력해 주세요.",
                })}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errors.password && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errors.password.message}
                </Alert>
              )}
            </Grid>
          </Grid>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <Button
            type="submit"
            fullWidth
            disableElevation
            variant="contained"
            sx={{ mt: 2, height: "50px" }}
          >
            Sign In
          </Button>
          <Stack maxWidth="xs" textAlign="end" mt={2}>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
            <Link href="/join" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Stack>
          <Grid container spacing={1.5} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <GoogleLogin />
            </Grid>
            <Grid item xs={6}>
              <KakaoLogin />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SigninPage;
