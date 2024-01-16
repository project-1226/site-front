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
import axios from "axios";
import React, { useEffect, useState } from "react";

const UpdateFood = ({ list, getList }) => {
  const [goal, setGoal] = useState(
    parseInt(list.find((l) => l.questionid === 1)?.selectid || 1)
  );
  const [allergies, setAllergies] = useState([]);

  const answersForQuestion4 = list
    .filter((l) => l.questionid === 4)
    .map((l) => l.selectid);

  const getListAllergy = async () => {
    const res = await axios("/user/list-allergy");
    const data = res.data.map(
      (a) => a && { ...a, checked: answersForQuestion4.includes(a.selectid) }
    );
    setAllergies(data);
    // console.log(allergies);
  };

  const handleChange = (e) => {
    setGoal(e.target.value);
  };

  const handleAllergyChange = (e, id) => {
    const data = allergies.map((a) =>
      a.selectid === id ? { ...a, checked: e.target.checked } : a
    );
    setAllergies(data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const checked = allergies.filter((a) => a.checked).map((a) => a.selectid);
    for (const id of checked) {
      // console.log({
      //   userid: sessionStorage.getItem("userid"),
      //   questionid: 4,
      //   selectid: id,
      // });
      await axios.post("/user/survey/change", {
        userid: sessionStorage.getItem("userid"),
        questionid: 4,
        selectid: id,
      });
    }
    // 로직 수정 필요!!!!!!!!!!!
  };

  useEffect(() => {
    getListAllergy();
  }, []);

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
                    {allergies.map((item) => (
                      <FormControlLabel
                        key={item.selectid}
                        control={
                          <Checkbox
                            value={item.selectid}
                            checked={item.checked}
                            onClick={(e) =>
                              handleAllergyChange(e, item.selectid)
                            }
                          />
                        }
                        label={item.answer}
                      />
                    ))}
                  </Typography>
                </Stack>
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

export default UpdateFood;
