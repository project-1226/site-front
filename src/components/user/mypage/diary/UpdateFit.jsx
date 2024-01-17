import {
  Table,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const UpdateFit = ({ list, getList }) => {
  const [goal, setGoal] = useState(
    parseInt(list.find((l) => l.questionid === 10)?.input_text || 0)
  );
  const [weight, setWeight] = useState(
    parseInt(list.find((l) => l.questionid === 9)?.input_text || 0)
  );
  const [height, setHeight] = useState(
    parseInt(list.find((l) => l.questionid === 8)?.input_text || 0)
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    if (
      parseInt(list.find((l) => l.questionid === 8)?.input_text || 0) !== height
    ) {
      await axios.post("/user/survey/change", {
        userid: sessionStorage.getItem("userid"),
        questionid: 8,
        input_text: data.height,
      });
    }
    if (
      parseInt(list.find((l) => l.questionid === 9)?.input_text || 0) !== weight
    ) {
      await axios.post("/user/survey/change", {
        userid: sessionStorage.getItem("userid"),
        questionid: 9,
        input_text: data.weight,
      });
    }
    if (
      parseInt(list.find((l) => l.questionid === 10)?.input_text || 0) !== goal
    ) {
      await axios.post("/user/survey/change", {
        userid: sessionStorage.getItem("userid"),
        questionid: 10,
        input_text: data.goal,
      });
    }
    alert("신체 정보 변경 성공!");
    getList();
  };

  useEffect(() => {
    setValue("goal", goal);
    setValue("height", height);
    setValue("weight", weight);
  }, [goal, height, weight, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  목표
                </TableCell>
                <TableCell>
                  <Controller
                    name="goal"
                    control={control}
                    defaultValue={goal}
                    rules={{
                      required: "필수 입력 항목입니다.",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "숫자만 입력 가능합니다.",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        label="목표체중"
                        size="small"
                        name="goal"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setGoal(e.target.value);
                        }}
                        error={!!errors.goal}
                        helperText={errors.goal?.message}
                        width="30%"
                      />
                    )}
                  />
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
                  키
                </TableCell>
                <TableCell>
                  <Controller
                    name="height"
                    control={control}
                    defaultValue={height}
                    rules={{
                      required: "필수 입력 항목입니다.",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "숫자만 입력 가능합니다.",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        label="키"
                        size="small"
                        name="height"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setHeight(e.target.value);
                        }}
                        error={!!errors.height}
                        helperText={errors.height?.message}
                        width="30%"
                      />
                    )}
                  />
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
                  몸무게
                </TableCell>
                <TableCell>
                  <Controller
                    name="weight"
                    control={control}
                    defaultValue={weight}
                    rules={{
                      required: "필수 입력 항목입니다.",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "숫자만 입력 가능합니다.",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        label="몸무게"
                        size="small"
                        name="weight"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setWeight(e.target.value);
                        }}
                        error={!!errors.weight}
                        helperText={errors.weight?.message}
                        width="30%"
                      />
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          direction="row"
          sx={{ my: 2 }}
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" type="submit">
            수정하기
          </Button>
          <Button variant="contained" color="secondary">
            돌아가기
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default UpdateFit;
