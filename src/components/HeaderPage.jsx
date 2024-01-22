import { AccountCircle, ShoppingCartOutlined } from "@mui/icons-material";

import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { delCookie } from "../common";

const HeaderPage = () => {
  // const [avatar, setAvatar] = useState("");

  // const getAvatar = async () => {
  //   const res = await axios("/user/read", {
  //     params: {
  //       userid: sessionStorage.getItem("userid"),
  //     },
  //   });
  //   setAvatar(res.data.avatar);
  // };

  const onLogout = (e) => {
    e.preventDefault();
    if (window.confirm("로그아웃하시겠습니까?")) {
      sessionStorage.clear();
      delCookie("userid");
      window.location.href = "/login";
    }
  };

  // useEffect(() => {
  //   if (sessionStorage.getItem("userid")) {
  //     getAvatar();
  //   }
  // }, []);
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="seon_muipaper_shadow_none">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/"
            sx={{ mr: 2 }}
          >
            <SetMeal />
          </IconButton> */}
          <Link className="logo" to="/">
            MEALJOY
          </Link>

          <Stack
            direction="row"
            spacing={4}
            sx={{ flexGrow: 1 }}
            justifyContent="center"
          >
            {sessionStorage.getItem("userid") && (
              <>
                <Typography
                  color="inherit"
                  component={Link}
                  to="/mydiet"
                  sx={{ textDecoration: "none" }}
                  className={`menu-item ${
                    location.pathname === "/mydiet" ? "active-link" : ""
                  }`}
                >
                  {" "}
                  내 식단
                </Typography>

                <Typography
                  color="inherit"
                  component={Link}
                  to="/health"
                  sx={{ textDecoration: "none" }}
                  className={`menu-item ${
                    location.pathname === "/health" ? "active-link" : ""
                  }`}
                >
                  {" "}
                  건강식단
                </Typography>

                <Typography
                  color="inherit"
                  component={Link}
                  to="/diseasediet"
                  sx={{ textDecoration: "none" }}
                  className={`menu-item ${
                    location.pathname === "/diseasediet" ? "active-link" : ""
                  }`}
                >
                  {" "}
                  질환맞춤식단
                </Typography>

                <Typography
                  color="inherit"
                  component={Link}
                  to="/healthcare"
                  sx={{ textDecoration: "none" }}
                  className={`menu-item ${
                    location.pathname === "/healthcare" ? "active-link" : ""
                  }`}
                >
                  {" "}
                  헬스케어{" "}
                </Typography>

                <Typography
                  color="inherit"
                  component={Link}
                  to="/community"
                  sx={{ textDecoration: "none" }}
                  className={`menu-item ${
                    location.pathname === "/community" ? "active-link" : ""
                  }`}
                >
                  {" "}
                  커뮤니티{" "}
                </Typography>
                <Typography
                  color="inherit"
                  component={Link}
                  to="/Ailist"
                  sx={{ textDecoration: "none" }}
                  className={`menu-item ${
                    location.pathname === "/Ailist" ? "active-link" : ""
                  }`}
                >
                  {" "}
                  트레이너{" "}
                </Typography>
              </>
            )}
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
                  to="/admin"
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
                    className="no-active-link"
                  >
                    <AccountCircle sx={{ fontSize: "2.3rem" }} />
                  </Typography>

                  <Typography
                    color="inherit"
                    component={Link}
                    to="/cart"
                    sx={{ textDecoration: "none" }}
                    className="no-active-link"
                  >
                    <ShoppingCartOutlined sx={{ fontSize: "2rem" }} />
                  </Typography>

                  <Button color="inherit" onClick={onLogout} className="logout">
                    {" "}
                    Logout{" "}
                  </Button>
                </>
              )}
            {/* 비로그인 상태 */
            !sessionStorage.getItem("userid") && (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                className="login"
              >
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
