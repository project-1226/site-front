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
import axios from "axios";
import React, { useState } from "react";
import { FormLabel } from "react-bootstrap";

const UpdateExcercise = ({ list, getList }) => {
  const [job, setJob] = useState(
    parseInt(list.find((l) => l.questionid === 2)?.selectid || 4)
  );
  const [exercise, setExercise] = useState(
    parseInt(list.find((l) => l.questionid === 3)?.selectid || 10)
  );
  const [sleepTime, setSleepTime] = useState(
    parseInt(list.find((l) => l.questionid === 5)?.selectid || 22)
  );

  const handleJobChange = (e) => {
    setJob(e.target.value);
  };

  const handleExerciseChange = (e) => {
    setExercise(e.target.value);
  };

  const handleSleepTimeChange = (e) => {
    setSleepTime(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      parseInt(list.find((l) => l.questionid === 2)?.selectid || 4) === job &&
      parseInt(list.find((l) => l.questionid === 3)?.selectid || 10) ===
        exercise &&
      parseInt(list.find((l) => l.questionid === 5)?.selectid || 22) ===
        sleepTime
    ) {
      alert("변경된 정보가 없습니다.");
    } else {
      // console.log(job, exercise, sleepTime);
      if (
        parseInt(list.find((l) => l.questionid === 2)?.selectid || 4) !== job
      ) {
        await axios.post("/user/survey/change", {
          userid: sessionStorage.getItem("userid"),
          questionid: 2,
          selectid: job,
        });
      }
      if (
        parseInt(list.find((l) => l.questionid === 3)?.selectid || 10) !==
        exercise
      ) {
        await axios.post("/user/survey/change", {
          userid: sessionStorage.getItem("userid"),
          questionid: 3,
          selectid: exercise,
        });
      }
      if (
        parseInt(list.find((l) => l.questionid === 5)?.selectid || 22) !==
        sleepTime
      ) {
        await axios.post("/user/survey/change", {
          userid: sessionStorage.getItem("userid"),
          questionid: 5,
          selectid: sleepTime,
        });
      }
      alert("운동 정보 변경 성공!");
      getList();
    }
  };

  return (
    <form onSubmit={onSubmit}>
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
                    onChange={handleJobChange}
                  >
                    <MenuItem value={4}>휴식, 무직</MenuItem>
                    <MenuItem value={5}>주부</MenuItem>
                    <MenuItem value={6}>
                      주로 앉아서 일해요. ( ex) 사무직, 학생 )
                    </MenuItem>
                    <MenuItem value={7}>
                      주로 서서 일해요. ( ex) 승무원, 교사 )
                    </MenuItem>
                    <MenuItem value={8}>
                      활동적인 일을 하고 있어요. ( ex) 영업직, 운동선수,
                      택배기사 등)
                    </MenuItem>
                    <MenuItem value={9}>기타</MenuItem>
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
                    defaultValue={exercise}
                    onChange={handleExerciseChange}
                  >
                    <FormControlLabel
                      value={10}
                      control={<Radio />}
                      label="예"
                    />
                    <FormControlLabel
                      value={11}
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
                    value={sleepTime}
                    label="평균 수면 시간"
                    onChange={handleSleepTimeChange}
                  >
                    <MenuItem value={22}>4시간 이하</MenuItem>
                    <MenuItem value={23}>5 - 6시간</MenuItem>
                    <MenuItem value={24}>7 - 8시간</MenuItem>
                    <MenuItem value={25}>9시간 이상</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" sx={{ my: 2 }} spacing={2} justifyContent="center">
        <Button variant="contained" type="submit">
          수정하기
        </Button>
        <Button variant="contained" color="secondary">
          돌아가기
        </Button>
      </Stack>
    </form>
  );
};

export default UpdateExcercise;
