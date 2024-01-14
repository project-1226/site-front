import {
  Avatar,
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
import { Link } from "react-router-dom";

const PostList = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const size = 10;
  const [page, setPage] = useState(1);
  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
  };

  const getListPost = async () => {
    setLoading(true);
    const res = await axios("/activity/list-post", {
      params: { userid: sessionStorage.getItem("userid"), page, size },
    });
    // console.log(res.data);
    setTotal(res.data.total);
    const list = res.data.list;
    const data = [];
    for (const post of list) {
      const cnt = await onCountComment(post.postid);
      const postWithCnt = {
        ...post,
        commentCnt: cnt,
      };
      data.push(postWithCnt);
    }
    setList(data);
    setLoading(false);
  };

  const onCountComment = async (postid) => {
    setLoading(true);
    const res = await axios("/activity/count-comment", {
      params: { postid },
    });
    setLoading(false);
    return res.data;
  };

  useEffect(() => {
    getListPost();
  }, [page]);

  return (
    <>
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
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ ml: 2 }}
                    >
                      <Typography
                        variant="body1"
                        color="WindowText"
                        component={Link}
                        to={`/community/review/comment/${l.postid}`}
                      >
                        {l.title}
                      </Typography>
                      <Avatar
                        sx={{
                          bgcolor: "#748769",
                          width: 19,
                          height: 19,
                          fontSize: 12,
                        }}
                      >
                        {l.commentCnt}
                      </Avatar>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1" sx={{ mr: 2 }}>
                      {l.fmtdate}
                    </Typography>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {total == 0 ? (
        <Typography>작성된 글이 없습니다.</Typography>
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

export default PostList;
