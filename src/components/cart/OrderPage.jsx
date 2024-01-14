import React, { useState } from 'react'
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Box,
  CardMedia,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField

} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Purchaseitems from './Purchaseitems';

const OrderPage = () => {



  return (
    <div className='ak_wrap'>
      <div className='ak_contents'>
       <Purchaseitems></Purchaseitems>

      </div>
    </div>
  )
}

export default OrderPage