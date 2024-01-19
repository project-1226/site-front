import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

const AdminQnaPage = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({
    userid: sessionStorage.getItem("userid"),
    title: "",
    content: "",
  });

  const size = 10;
  const [page, setPage] = useState(1);
  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
  };

  const getList = async () => {
    setLoading(true);
    const res = await axios("/shoppingqna/list", {
      params: {
        userid: "",
      },
    });
    // console.log(res.data);
    setList(res.data.list);
    setTotal(res.data.total);
    setLoading(false);
  };

  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onDelete = async (id) => {
    if (window.confirm("해당 문의 내역을 삭제하시겠습니까?")) {
      await axios.post("/shoppingqna/delete", {
        userid: sessionStorage.getItem("userid"),
        postid: id,
      });
      alert("해당 문의 내역이 삭제되었습니다.");
      getList();
    }
  };

  useEffect(() => {
    getList();
  }, [page]);

  const comment = false;

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        bgcolor: "transparent",
        py: 4.5,
        pr: 3,
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <TableContainer component={Paper} sx={{ mt: 2, mb: 3 }}>
        <Table>
          <TableBody>
            {list.map((l) => (
              <Fragment key={l.postid}>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>
                    <Typography variant="body1" sx={{ ml: 2 }}>
                      {l.title}
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontStyle: "italic", ml: 1 }}
                      >
                        ({l.fmtdate})
                      </Typography>
                    </Typography>
                    <Typography variant="body1" sx={{ ml: 2, mt: 1 }}>
                      <strong>Q : </strong>
                      {l.content}
                    </Typography>
                    {!comment ? (
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ ml: 2, mt: 1 }}
                      >
                        <strong>A : </strong>
                        답변 대기 중...
                      </Typography>
                    ) : (
                      <Typography variant="body1" sx={{ ml: 2, mt: 1 }}>
                        <strong>A : </strong>
                        {l.content}
                      </Typography>
                    )}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="end"
                      sx={{ mr: 2 }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => onDelete(l.postid)}
                      >
                        삭제
                      </Button>
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ mx: 2, mb: 2, mt: 2 }}
                    >
                      <TextField
                        fullWidth
                        multiline
                        label="문의 답변 남기기"
                        size="small"
                        name="content"
                        rows={2}
                      />
                      <Button variant="outlined">등록</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {total === 0 ? (
        <Typography>문의 내역이 없습니다.</Typography>
      ) : (
        <Pagination
          count={Math.ceil(total / size)}
          shape="rounded"
          color="primary"
          page={page}
          sx={{ marginBottom: 5 }}
          onChange={handleChange}
        />
      )}
    </Box>
  );
};

export default AdminQnaPage;
