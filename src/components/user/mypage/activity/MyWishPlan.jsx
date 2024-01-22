import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeModal from "../../../myDiet/RecipeModal";

const MyWishPlan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood,setSelectedFood] = useState("");

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const [checkedSum, setCheckedSum] = useState(0);
  const [cnt, setCnt] = useState(0);

  const size = 5;
  const [page, setPage] = useState(1);
  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
  };

  const getFavoriteList = async () => {
    setLoading(true);
    const res = await axios("/user-favorite/list-food", {
      params: { userid: sessionStorage.getItem("userid"), page, size },
    });
    console.log(res.data);
    setTotal(res.data.total);   
    setList(res.data.list);
    setLoading(false);
  };

  const onDelete = async (e, favoriteid) => {
    e.preventDefault();
    await axios.delete("/user-favorite/delete", { params: { favoriteid } });
    console.log(favoriteid)
    getFavoriteList();
  };

  const onChangeAll = (e) => {
    const data = list.map((l) => l && { ...l, checked: e.target.checked });
    setList(data);
  };

  const onChangeSingle = (e, favoriteid) => {
    const data = list.map((l) =>
      l.favoriteid === favoriteid ? { ...l, checked: e.target.checked } : l
    );
    setList(data);
  };

  const onDeleteChecked = async () => {
    if (cnt === 0) {
      alert("삭제할 상품을 선택하세요.");
    } else {
      for (const l of list) {
        if (l.checked) {
          await axios.delete("/user-favorite/delete", {
            params: { favoriteid: l.favoriteid },
          });
        }
      }
      alert("선택된 상품들이 삭제되었습니다.");
      getFavoriteList();
    }
  };
  const onClickRecipe = (food)=>{
    setSelectedFood(food);
    setIsModalOpen(true);
  }
  useEffect(() => {
    getFavoriteList();
  }, [page]);

  useEffect(() => {
    let count = 0;
    let sum = 0;
    list.forEach((l) => {
      if (l.checked) {
        count++;
        sum += l.sum;
      }
    });
    setCnt(count);
    setCheckedSum(sum);
  }, [list]);

  return (
    <Box sx={{ width: "100%", bgcolor: "transparent", py: 5, pr: 3 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bolder" }}>
        찜 리스트
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={4}>
                <Stack direction="row" spacing={4}>
                  <Checkbox
                    onClick={onChangeAll}
                    checked={list.length === cnt}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={onDeleteChecked}
                  >
                    선택 취소
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((l) => (
              <TableRow
                key={l.favoriteid}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: "150px",
                }}
              >
                <TableCell sx={{ width: 30 }}>
                  <Checkbox
                    checked={l.checked}
                    onClick={(e) => onChangeSingle(e, l.favoriteid)}
                  />
                </TableCell>
                <TableCell width={140}>
                  {l.image.length === 0 ? (
                    <img
                      src="http://via.placeholder.com/100x100"
                      alt="product"
                    />
                  ) : (
                  
                      <img                       
                        src={l.image}
                        alt="food"
                      />                
                  )}
                </TableCell>
                <TableCell>
                  <Stack spacing={1}>
                    <Typography variant="h6">{l.name}</Typography>
                    <Typography variant="body1"></Typography>
                  </Stack>
                </TableCell>
                <TableCell width={170}>
                  <Stack spacing={1}>
                    <Button variant="contained" fullWidth onClick={()=>onClickRecipe(l)}>
                      레시피 보러가기
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={(e) => onDelete(e, l.favoriteid)}
                    >
                      찜 취소하기
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(total / size)}
        shape="rounded"
        color="primary"
        page={page}
        sx={{ mt: 3 }}
        onChange={handleChange}
      />
      <RecipeModal show={isModalOpen} setIsRecipeModalOpen ={setIsModalOpen} selectedDay={0} selectedMyFood={selectedFood} />
    </Box>
  );
};

export default MyWishPlan;
