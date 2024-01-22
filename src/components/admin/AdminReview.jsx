import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, TableContainer, Table, TableBody,
  Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

const AdminReview = () => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [open, setOpen] = useState(null);
  const categoryid = 102;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ marginTop: '20px' }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  };

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const checkOne = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const getList = async () => {
    setLoading(true);
    const res = await axios.get("/admin/list?categoryid=" + categoryid);
    console.log(res.data);
    setList(res.data);
    setLoading(false);
  }

  useEffect(() => {
    getList();
  }, []);

  const handleOpen = (panel) => (event, isOpen) => {
    setOpen(isOpen ? panel : null);
  }

  const getCommentList = async () => {
    setLoading(true);
    const res = await axios("/community/list/comment");
    //console.log(res.data);
    setCommentList(res.data);
    setLoading(false);
  }

  useEffect(() => {
    getCommentList();
  }, []);


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '20px', width: '180px' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="후기" {...checkOne(0)} />
          <Tab label="댓글" {...checkOne(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TableContainer component={Paper} sx={{width: '95%'}}>
          <Table>
            <TableBody>
              {list.map((p, index) =>
              <Accordion key={index}
                open={open === `panel${index}`}
                onChange={handleOpen(`panel${index}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                >
                  <Typography sx={{ ml: 4 }}>
                    {p.title}
                  </Typography>
                  <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontStyle: "italic", ml: 5 }}
                    >
                      <p>{p.nickname} ({p.fmtdate})</p>{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{ ml: 2, mt: 3, mx: 5, marginBottom: '20px'}}>
                  {p.content}      
                </Typography>
                </AccordionDetails>
              </Accordion>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <TableContainer component={Paper} sx={{width: '95%'}}>
          <Table>
            <TableBody>
              {commentList.map((c, index) =>
              <Accordion key={index}
                open={open === `panel${index}`}
                onChange={handleOpen(`panel${index}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                >
                  <Typography sx={{ ml: 2 }}>
                    {c.title}
                  </Typography>
                  <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontStyle: "italic", ml: 5 }}
                    >
                      <p>{c.nickname} ({c.fmtdate})</p>{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography sx={{ ml: 2, mt: 3, marginBottom: '20px'}}>
                  {c.content}      
                </Typography>
                </AccordionDetails>
              </Accordion>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomTabPanel>
    </Box>
  );
};

export default AdminReview