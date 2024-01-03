// Cart.jsx
import React, { useState } from 'react';
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
  CardMedia ,

} from '@mui/material';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CartItem from './CartItem';

const Cart = () => {

    const [count, setCount] = useState(0);

    const handleIncrement = () => {
      setCount(count + 1);
    };
  
    const handleDecrement = () => {
      setCount(count - 1);
    };

  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 20, quantity: 2 },
    { id: 2, name: 'Item 2', price: 30, quantity: 1 },
    { id: 3, name: 'Item 2', price: 30, quantity: 1 },
    { id: 4, name: 'Item 2', price: 30, quantity: 1 },
    { id: 5, name: 'Item 2', price: 30, quantity: 1 },
    { id: 6, name: 'Item 2', price: 30, quantity: 1 },
    { id: 7, name: 'Item 2', price: 30, quantity: 1 },
    { id: 8, name: 'Item 2', price: 30, quantity: 1 },
    { id: 9, name: 'Item 2', price: 30, quantity: 1 },
    { id: 10, name: 'Item 2', price: 30, quantity: 1 },
    { id: 11, name: 'Item 2', price: 30, quantity: 1 },
    { id: 12, name: 'Item 2', price: 30, quantity: 1 },
    { id: 13, name: 'Item 2', price: 30, quantity: 1 },


    // Add more items as needed
  ]);

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  return (
    <Container>
            <AppBar position="static" style={{ background: 'rgb(116, 135, 105)' }}>
                <Toolbar>
                        <Typography variant="h6" style={{ fontSize: '40px', flexGrow: 1 }}>
                            장바구니
                        </Typography>
                </Toolbar>
            </AppBar>
            <AppBar position="static" style={{ background: 'white' }}>
                <div>
                    <Typography variant="h6" style={{ fontSize: '25px', flexGrow: 1, color:"black" }}>
                        주문 목록 
                    </Typography>
                </div>
            <hr  style={{ color: 'black' }} ></hr>
            <div>
                <FormControlLabel control={<Checkbox />} label="전체 선택" style={{ color: 'black' }}/>
            </div>
            </AppBar>
    <Box style={{ backgroundColor: 'gray', padding: '15px',  }}>
        <CartItem></CartItem>

    </Box>

<Typography variant="h6" gutterBottom>

</Typography>
<AppBar position="static" style={{ background: 'rgb(116, 135, 105)' }}>
<Toolbar>
    <Typography variant="h6" style={{ fontSize: '40px', flexGrow: 1 }}>
        총 주문 금액 : ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
        <Button variant="contained" style={{ fontSize: '23px', backgroundColor: 'white', color: 'black', marginLeft: '20px' }}>
            주문하기
            </Button>
    </Typography>
</Toolbar>
</AppBar>




</Container>
);
};

export default Cart;
