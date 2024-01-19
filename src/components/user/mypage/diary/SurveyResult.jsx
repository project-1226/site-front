import {
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React from "react";

const SurveyResult = ({ list }) => {
  const answersForQuestion4 = list
    .filter((l) => l.questionid === 4)
    .map((l) => l.answer)
    .join(", ");

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
                {list.map((l, index) => {
                  if (l.questionid === 1) {
                    return <div key={index}>{l.answer}</div>;
                  }
                  return null;
                })}
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
                {list.map((l, index) => {
                  if (l.questionid === 10) {
                    return <div key={index}>{l.input_text}kg</div>;
                  }
                  return null;
                })}
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
                {list.map((l, index) => {
                  if (l.questionid === 6) {
                    return <div key={index}>{l.answer}</div>;
                  }
                  return null;
                })}
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
                {list.map((l, index) => {
                  if (l.questionid === 7) {
                    return <div key={index}>만 {l.input_text}세</div>;
                  }
                  return null;
                })}
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
                {list.map((l, index) => {
                  if (l.questionid === 8) {
                    return <div key={index}>{l.input_text}cm</div>;
                  }
                  return null;
                })}
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
                {list.map((l, index) => {
                  if (l.questionid === 9) {
                    return <div key={index}>{l.input_text}kg</div>;
                  }
                  return null;
                })}
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
                {list.map((l, index) => {
                  if (l.questionid === 2) {
                    return <span key={index}>{l.answer}</span>;
                  }
                  return null;
                })}
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
                주 3회 이상 운동 여부
              </TableCell>
              <TableCell
                component="th"
                sx={{
                  color: "gray",
                  py: 3.2,
                }}
              >
                {list.map((l, index) => {
                  if (l.questionid === 3) {
                    return <div key={index}>{l.answer}</div>;
                  }
                  return null;
                })}
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
                {list.map((l, index) => {
                  if (l.questionid === 5) {
                    return <div key={index}>{l.answer}</div>;
                  }
                  return null;
                })}
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
                {answersForQuestion4.length > 0 ? (
                  <>{answersForQuestion4}</>
                ) : (
                  <div>없음</div>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SurveyResult;
