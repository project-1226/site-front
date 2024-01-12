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
} from "@mui/material";
import React from "react";

const UpdateFood = () => {
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
                  <Typography>목표</Typography>
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
