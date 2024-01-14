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
import React from "react";

const UpdateFit = () => {
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
                목표
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <TextField
                    label="목표체중"
                    size="small"
                    name="goal"
                    value={""}
                    width="30%"
                  />
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
                키
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <TextField
                    label="키"
                    size="small"
                    name="height"
                    value={""}
                    width="30%"
                  />
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
                몸무게
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <TextField
                    label="몸무게"
                    size="small"
                    name="weight"
                    value={""}
                    width="30%"
                  />
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

export default UpdateFit;
