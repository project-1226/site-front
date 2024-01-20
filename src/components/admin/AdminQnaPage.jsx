import { ExpandMore, SubdirectoryArrowRight } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
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
  const [commentOption, setCommentOption] = useState("all");
  const [comment, setComment] = useState("");

  const onChangeCommentOption = (e) => {
    setCommentOption(e.target.value);
  };

  const getList = async () => {
    setLoading(true);
    const res = await axios("/shoppingqna/all", {
      params: { commentOption },
    });
    // console.log(res.data);
    setList(res.data);
    setLoading(false);
  };

  const onSubmit = async (id) => {
    // alert("postid : " + id + "\ncontent : " + comment);
    await axios.post("/community/insert/comment", {
      postid: id,
      userid: sessionStorage.getItem("userid"),
      content: comment,
    });
    alert("답변이 등록되었습니다.");
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
  }, [commentOption]);

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
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          defaultValue="all"
          name="row-radio-buttons-group"
          onChange={onChangeCommentOption}
        >
          <FormControlLabel value="all" control={<Radio />} label="전체" />
          <FormControlLabel
            value="none"
            control={<Radio />}
            label="답변 대기중"
          />
          <FormControlLabel
            value="withComments"
            control={<Radio />}
            label="답변 완료"
          />
        </RadioGroup>
      </FormControl>
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
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontStyle: "italic", ml: 5 }}
                    >
                      <SubdirectoryArrowRight sx={{ fontSize: "0.7rem" }} />{" "}
                      {l.username} ({l.fmtdate})
                    </Typography>
                    <Typography variant="body1" sx={{ ml: 2, mt: 1 }}>
                      <strong>Q : </strong>
                      {l.content}
                    </Typography>
                    {!l.commentid ? (
                      <>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ ml: 2, mt: 1 }}
                        >
                          <strong>A : </strong>
                          답변 대기 중...
                        </Typography>
                        <Divider
                          sx={{
                            borderStyle: "dashed",
                            borderColor: "#777777",
                            m: 2,
                          }}
                        />
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ mx: 2, mb: 2, mt: 1 }}
                        >
                          <TextField
                            fullWidth
                            multiline
                            label="답변 내용"
                            size="small"
                            name="content"
                            rows={2}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <Button
                            variant="outlined"
                            onClick={() => onSubmit(l.postid)}
                          >
                            등록
                          </Button>
                        </Stack>
                      </>
                    ) : (
                      <>
                        <Typography variant="body1" sx={{ ml: 2, mt: 1 }}>
                          <strong>A : </strong>
                          {l.admin_content}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontStyle: "italic", ml: 5 }}
                        >
                          (답변 등록일 : {l.admin_regdate})
                        </Typography>
                      </>
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
    </Box>
  );
};

export default AdminQnaPage;
