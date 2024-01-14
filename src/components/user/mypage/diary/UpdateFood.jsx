import {
  Table,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";

const UpdateFood = () => {
  const [goal, setGoal] = useState("");

  const handleChange = (e) => {
    setGoal(e.target.value);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table sx={{ minWidth: 800 }} aria-label="simple table">
          <TableBody>
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
                식단목표
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <FormControl sx={{ width: "30%" }} size="small">
                    <InputLabel id="demo-simple-select-label">
                      식단 목표
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={goal}
                      label="식단 목표"
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>체중감량</MenuItem>
                      <MenuItem value={2}>체중증량</MenuItem>
                      <MenuItem value={3}>건강증진</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </TableCell>
            </TableRow>

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
                알레르기
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Typography>
                    <FormControlLabel control={<Checkbox />} label="유제품" />
                    <FormControlLabel control={<Checkbox />} label="해산물" />
                    <FormControlLabel control={<Checkbox />} label="견과류" />
                    <FormControlLabel control={<Checkbox />} label="계란" />
                    <FormControlLabel control={<Checkbox />} label="복숭아" />
                    <FormControlLabel control={<Checkbox />} label="밀가루" />
                    <FormControlLabel control={<Checkbox />} label="알류" />
                    <FormControlLabel control={<Checkbox />} label="갑각류" />
                    <FormControlLabel control={<Checkbox />} label="돼지고기" />
                    <FormControlLabel control={<Checkbox />} label="쇠고기" />
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" sx={{ my: 2 }} spacing={2} justifyContent="center">
        <Button variant="contained">수정하기</Button>
        <Button variant="contained" color="secondary">
          돌아가기
        </Button>
      </Stack>
    </>
  );
};

export default UpdateFood;
