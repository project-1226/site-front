import {
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React from "react";

const SurveyResult = () => {
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
                식단 목표
              </TableCell>
              <TableCell
                component="th"
                sx={{
                  color: "gray",
                  py: 3.2,
                }}
              >
                식단 목표
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
                목표 체중
              </TableCell>
              <TableCell
                component="th"
                sx={{
                  color: "gray",
                  py: 3.2,
                }}
              >
                목표 체중
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
                성별
              </TableCell>
              <TableCell
                component="th"
                sx={{
                  color: "gray",
                  py: 3.2,
                }}
              >
                성별
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
                나이
              </TableCell>
              <TableCell
                component="th"
                sx={{
                  color: "gray",
                  py: 3.2,
                }}
              >
                나이
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
              <TableCell
                component="th"
                sx={{
                  color: "gray",
                  py: 3.2,
                }}
              >
                키
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
              <TableCell
                component="th"
                sx={{
                  color: "gray",
                  py: 3.2,
                }}
              >
                몸무게
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
                직업
              </TableCell>
              <TableCell
                component="th"
                sx={{
                  color: "gray",
                  py: 3.2,
                }}
              >
                직업
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
              <TableCell
                component="th"
                sx={{
                  color: "gray",
                  py: 3.2,
                }}
              >
                운동 여부
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
              <TableCell
                component="th"
                sx={{
                  color: "gray",
                  py: 3.2,
                }}
              >
                평균 수면 시간
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
                알레르기 여부
              </TableCell>
              <TableCell
                component="th"
                sx={{
                  color: "gray",
                  py: 3.2,
                }}
              >
                알레르기 여부
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SurveyResult;
