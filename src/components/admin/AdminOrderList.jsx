import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { Typography, Box, TableContainer, Table, TableCell, TableRow, TableBody, Paper, Tab, TableHead } from '@mui/material';
import { TabList, TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';

const AdminOrderList = () => {
  const [value, setValue] = useState('1');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const getList = async () => {
    setLoading(true);
    const res = await axios.get('/admin/orderList');
    console.log(res.data);
    setList(res.data);
    setLoading(false);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getList();
  }, []);


  if (loading) return <div><Spinner /></div>

  return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '20px', width: '130px' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="주문 / 배송 내역" value="1" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TableContainer component={Paper} sx={{ width: '95%', marginLeft: '10px' }}>
            <Table>
              <TableHead>
                <TableCell>주문일</TableCell>
                <TableCell>주문자</TableCell>
                <TableCell>주문상품</TableCell>
                <TableCell>주문금액</TableCell>
                <TableCell>주문상태</TableCell>
              </TableHead>
              <TableBody>
                {list.map((l) => (
                  <TableRow key={l.orderId} sx={{ fontStyle: "italic" }}>
                    <TableCell>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontStyle: "italic" }}
                      >
                        {l.fmtdate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {l.userid}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {l.product_info}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {l.sum}원
                    </TableCell>
                    <TableCell>
                      {l.str_status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default AdminOrderList