import {
  Backdrop,
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

const CommentList = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const size = 10;
  const [page, setPage] = useState(1);
  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
  };

  const getList = async () => {
    setLoading(true);
    const res = await axios("/activity/list-comment", {
      params: {
        userid: sessionStorage.getItem("userid"),
        page,
        size,
      },
    });
    setList(res.data.list);
    setTotal(res.data.total);
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, [page]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bolder" }}>
        작성한 댓글 ({total})
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2, mb: 3 }}>
        <Table>
          <TableBody>
            {list.map((l) => (
              <Fragment key={l.commentid}>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontStyle: "italic", ml: 2 }}
                    >
                      ({l.fmtdate})
                    </Typography>
                    <Typography variant="body1" sx={{ ml: 2 }}>
                      {l.content}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      textAlign="end"
                      sx={{ mr: 2, mt: 1 }}
                    >
                      해당 게시글 : {l.title} ({l.post_regdate})
                    </Typography>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack justifyContent="center">
        <Pagination
          count={Math.ceil(total / size)}
          shape="rounded"
          color="primary"
          page={page}
          sx={{ marginBottom: 5 }}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
};

export default CommentList;
