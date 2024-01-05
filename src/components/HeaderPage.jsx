import { SetMeal, AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeaderPage = () => {
  const [avatar, setAvatar] = useState("");

  const getAvatar = async () => {
    const res = await axios("/user/read", {
      params: {
        userid: sessionStorage.getItem("userid"),
      },
    });
    // console.log(res.data.avatar);
    setAvatar(res.data.avatar);
  };

  const onLogout = (e) => {
    e.preventDefault();
    if (window.confirm("로그아웃하시겠습니까?")) {
      sessionStorage.clear();
      window.location.href = "/";
    }
  };

  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/"
            sx={{ mr: 2 }}
          >
            <SetMeal />
          </IconButton>
          <Stack
            direction="row"
            spacing={4}
            sx={{ flexGrow: 1 }}
            justifyContent="center"
          >
            <Typography
              color="inherit"
              component={Link}
              to="/mydiet"
              sx={{ textDecoration: "none" }}
            >
              {" "}
              내 식단{" "}
            </Typography>

            <Typography
              color="inherit"
              component={Link}
              to="/healthydiet"
              sx={{ textDecoration: "none" }}
            >
              {" "}
              건강식단{" "}
            </Typography>

            <Typography
              color="inherit"
              component={Link}
              to="/diseasediet"
              sx={{ textDecoration: "none" }}
            >
              {" "}
              질환맞춤식단{" "}
            </Typography>

            <Typography
              color="inherit"
              component={Link}
              to="/healthcare"
              sx={{ textDecoration: "none" }}
            >
              {" "}
              헬스케어{" "}
            </Typography>

            <Typography
              color="inherit"
              component={Link} 
              to="/community/notice"
              sx={{ textDecoration: "none" }}> 커뮤니티 </Typography>
          </Stack>

          {/* 로그인 case별 분기 */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {/* 관리자 로그인 */
            sessionStorage.getItem("userid") === "2fa0017c-053b-4983-8" && (
              <>
                <Typography
                  color="inherit"
                  component={Link}
                  to="/"
                  sx={{ textDecoration: "none" }}
                >
                  관리자
                </Typography>
                <Button color="inherit" onClick={onLogout}>
                  Logout
                </Button>
              </>
            )}
            {/* 사용자 로그인 */
            sessionStorage.getItem("userid") &&
              sessionStorage.getItem("userid") !== "2fa0017c-053b-4983-8" && (
                <>
                  <Typography
                    color="inherit"
                    component={Link}
                    to="/mp"
                    sx={{ textDecoration: "none" }}
                  >
                    <Avatar
                      alt="avatar"
                      src={avatar}
                      sx={{ width: 33, height: 33 }}
                    />
                  </Typography>
                  <Typography
                    color="inherit"
                    component={Link}
                    to="/mp"
                    sx={{ textDecoration: "none" }}
                  >
                    <AccountCircle sx={{ fontSize: "2.3rem" }} />
                  </Typography>
                  <Button color="inherit" onClick={onLogout}>
                    Logout
                  </Button>
                </>
              )}
            {/* 비로그인 상태 */
            !sessionStorage.getItem("userid") && (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderPage;
