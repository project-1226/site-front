import React from "react";
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

const SigninPage = () => {
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
      alert("로그인 성공!");
      const userid = res.data.user.userid;
      sessionStorage.setItem("userid", userid);
      window.location.href = "/mydiet";
    }
  };

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
          />
          <Stack maxWidth="xs" textAlign="end">
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
            <Link href="/join" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Stack>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Sign In
          </Button>
          <Stack sx={{ mt: 3, mb: 5 }}>
            <GoogleLogin />
            <KakaoLogin />
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default SigninPage;
