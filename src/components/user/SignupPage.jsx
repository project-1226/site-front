import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
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
    IconButton,
    InputAdornment,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const SignupPage = () => {
    const [isEmailNull, setIsEmailNull] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isPassNull, setIsPassNull] = useState(false);
    const [equalPass, setEqualPass] = useState(0);

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        if (data.get("email") === "") {
            setIsEmailNull(true);
        } else if (!data.get("email").includes("@")) {
            setIsEmailNull(false);
            setIsEmail(true);
        } else {
            setIsEmail(false);
        }

        if (data.get("password") === "") {
            setIsPassNull(true);
        } else {
            setIsPassNull(false);
        }

        if (isEmail && !(isEmailNull || isPassNull)) {
            if (window.confirm("회원 가입을 진행하시겠습니까?")) {
                await axios.post("/user/insert", data);
                alert("회원가입 완료!");
            }
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
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="이메일"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password1"
                                label="비밀번호"
                                type={showPassword ? "text" : "password"}
                                id="password1"
                                autoComplete="new-password"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password2"
                                label="비밀번호 확인"
                                type="password"
                                id="password2"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary"
                                    />
                                }
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    {isEmailNull && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            이메일을 입력해 주세요.
                        </Alert>
                    )}
                    {isEmail && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            이메일 형식이 아닙니다.
                        </Alert>
                    )}
                    {isPassNull && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            비밀번호를 입력해 주세요.
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignupPage;
