import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
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

const QNAPage = () => {
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
        userid: sessionStorage.getItem("userid"),
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

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    await axios.post("/shoppingqna/insert", form);
    alert("문의 내용이 등록되었습니다.");
    e.target.title.value = null;
    e.target.content.value = null;
    getList();
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
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography
              color="text.secondary"
              sx={{ fontWeight: "bolder", ml: 2 }}
            >
              문의 남기기
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={onSubmit}>
              <Stack direction="row" spacing={2} sx={{ mx: 2, mb: 2 }}>
                <Stack spacing={2} width="95%">
                  <TextField
                    fullWidth
                    label="주문번호 or 상품명"
                    id="fullWidth"
                    size="small"
                    name="title"
                    onChange={onChangeForm}
                  />
                  <TextField
                    fullWidth
                    multiline
                    label="문의내용"
                    size="small"
                    name="content"
                    rows={4}
                    onChange={onChangeForm}
                  />
                </Stack>
                <Button variant="contained" type="submit">
                  등록
                </Button>
              </Stack>
            </form>
          </AccordionDetails>
        </Accordion>
      </div>
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
    </>
  );
};

export default QNAPage;
