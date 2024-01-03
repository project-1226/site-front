import { SetMeal } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const HeaderPage = () => {

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
              to="/"
              sx={{ textDecoration: "none" }}
            >
              내 식단
            </Typography>
            <Typography
              color="inherit"
              component={Link}
              to="/"
              sx={{ textDecoration: "none" }}
            >
              건강식단
            </Typography>
            <Typography
              color="inherit"
              component={Link}
              to="/"
              sx={{ textDecoration: "none" }}
            >
              질환맞춤식단
            </Typography>
            <Typography
              color="inherit"
              component={Link}
              to="/"
              sx={{ textDecoration: "none" }}
            >
              헬스케어
            </Typography>
            <Typography
              color="inherit"
              component={Link}
              to="/"
              sx={{ textDecoration: "none" }}
            >
              커뮤니티
            </Typography>
          </Stack>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderPage;
