import {
  Table,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
} from "@mui/material";
import React, { useState } from "react";
import { FormLabel } from "react-bootstrap";

const UpdateExcercise = () => {
  const [job, setJob] = useState("");

  const handleChange = (e) => {
    setJob(e.target.value);
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
                하는 일
              </TableCell>
              <TableCell>
                <FormControl sx={{ width: "65%" }} size="small">
                  <InputLabel id="demo-simple-select-label">하는 일</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={job}
                    label="하는 일"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>휴식, 무직</MenuItem>
                    <MenuItem value={2}>주부</MenuItem>
                    <MenuItem value={3}>
                      주로 앉아서 일해요. ( ex) 사무직, 학생 )
                    </MenuItem>
                    <MenuItem value={4}>
                      주로 서서 일해요. ( ex) 승무원, 교사 )
                    </MenuItem>
                    <MenuItem value={5}>
                      활동적인 일을 하고 있어요. ( ex) 영업직, 운동선수,
                      택배기사 등)
                    </MenuItem>
                    <MenuItem value={6}>기타</MenuItem>
                  </Select>
                </FormControl>
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
                운동 여부
              </TableCell>
              <TableCell>
                <FormControl sx={{ mt: 1 }}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    주 3회 이상 운동하나요?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="10"
                      control={<Radio />}
                      label="예"
                    />
                    <FormControlLabel
                      value="11"
                      control={<Radio />}
                      label="아니오"
                    />
                  </RadioGroup>
                </FormControl>
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
                평균 수면 시간
              </TableCell>
              <TableCell>
                <FormControl sx={{ width: "65%" }} size="small">
                  <InputLabel id="demo-simple-select-label">
                    평균 수면 시간
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={job}
                    label="평균 수면 시간"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>4시간 이하</MenuItem>
                    <MenuItem value={2}>5 - 6시간</MenuItem>
                    <MenuItem value={3}>7 - 8시간</MenuItem>
                    <MenuItem value={4}>9시간 이상</MenuItem>
                  </Select>
                </FormControl>
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

export default UpdateExcercise;
