import React, { useState } from "react";
import GoogleLogin from "./login/GoogleLogin";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Checkbox,
    Collapse,
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

const SigninPage = () => {
    const [show, setShow] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        if (data.get("email") === "") {
            setShow(false);
        } else if (data.get("password") === "") {
        } else {
            const res = await axios.post("/user/login", {
                email: data.get("email"),
                password: data.get("password"),
            });
            if (res.data === 0) {
                alert("해당 아이디가 존재하지 않습니다.");
            } else if (res.data === 2) {
                alert("비밀번호가 일치하지 않습니다.");
            } else {
                alert("로그인 성공!");
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
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Alert severity="error" sx={{ mt: 2 }}>
                        이메일을 입력해 주세요.
                    </Alert>
                    <Alert severity="error" sx={{ mt: 2 }}>
                        비밀번호를 입력해 주세요.
                    </Alert>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    <Stack sx={{ mt: 3, mb: 5 }}>
                        <GoogleLogin />
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

export default SigninPage;
