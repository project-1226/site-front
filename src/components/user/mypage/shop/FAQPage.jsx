import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  IconButton,
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

const FAQPage = () => {
  const open = false;
  const [list, setList] = useState([]);
  const getList = async () => {
    const res = await axios("/shoppingqna/list", {
      params: { categoryid: 103 },
    });
    console.log(res.data);
    setList(res.data);
  };

  const onClickId = (id) => {
    const newPosts = list.map((l) =>
      l.postid === id ? { ...l, open: !l.open } : l
    );
    console.log(newPosts);
    setList(newPosts);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
          {list.map((l) => (
            <Fragment key={l.postid}>
              <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                  <Stack direction="row" spacing={3} alignItems="center">
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => onClickId(l.postid)}
                    >
                      {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                    <Typography variant="body1">{l.title}</Typography>
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    paddingBottom: 0,
                    paddingTop: 0,
                  }}
                  sx={{ bgcolor: "#f2f2f2" }}
                >
                  {l.open && (
                    <Box sx={{ margin: 3, ml: 7 }}>
                      <Typography variant="body2" gutterBottom component="div">
                        {l.content}
                      </Typography>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FAQPage;
