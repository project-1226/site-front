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

const Cart = () => {
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
        <Typography variant="h6" style={{ fontSize: '50px', flexGrow: 1 }}>
          장바구니
        </Typography>
      </Toolbar>
    </AppBar>
    <Box style={{ backgroundColor: 'lightgray', padding: '15px', borderRadius: '8px' }}>
    <Box style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px' }}>
    <Typography variant="h6" style={{ flexGrow: 1 }}>
          주문 목록
        </Typography>
        <hr></hr>
  <Grid container direction="column" spacing={2}>
    {cartItems.map((item) => (
      <Grid item key={item.id}>
        <Card style={{ display: 'flex', alignItems: 'center' ,borderBottom: '1px solid black' ,borderRadius:"0px" }}>
          {/* 기본 이미지 추가 */}
          <div style={{ backgroundColor: 'rgb(116, 135, 105)', padding: '5px',  marginRight: '16px' }}>
          <div style={{ backgroundColor: 'white', padding: '8px'}}>
          <img
            src="/logo192.png" 
            alt="기본이미지"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
          

          </div>
            </div>
          <CardContent style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '16px'}}>
            <Typography variant="h6" style={{ borderRight: '2px solid #ddd', paddingRight: '50px', marginRight: '50px' }}>
            <div>
               이름:   {item.name}
            </div>
            <div style={{ marginLeft: '' }}>
                가격: ${item.price}
            </div>
            </Typography>
            <Typography variant="subtitle1" style={{ borderRight: '2px solid #ddd', paddingRight: '50px', marginRight: '50px' }}>
            
            <div> 수량: {item.quantity}  <Button> + </Button> <Button>  - </Button></div> 
          
            </Typography>
            <Typography variant="subtitle1" style={{ borderRight: '2px solid #ddd', paddingRight: '50px', marginRight: '50px' }}>
             금액: ${item.price}
            </Typography>

            <Typography variant="subtitle1" style={{ borderRight: '2px solid #ddd', paddingRight: '50px', marginRight: '50px' }}>
             배송비 : 1000
            </Typography>
            <Button onClick={() => removeItem(item.id)} variant="contained" color="secondary">
              삭제
            </Button>
            
          </CardContent>
          
        </Card>
      </Grid>
    ))}
  </Grid>
  <hr></hr>
  <div style={{ display: 'flex' }}>
  <Typography variant="subtitle1" style={{ fontSize: '20px', paddingRight: '20px', marginRight: '20px' }}>
    <div>선택 상품 금액:</div>
    <div>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</div>
  </Typography>
  <Typography variant="subtitle1" style={{ fontSize: '40px', paddingRight: '20px', marginRight: '20px' }}>
        +
  </Typography>
  <Typography variant="subtitle1" style={{fontSize: '20px',  display: 'inline', borderRight: '2px solid #ddd', paddingRight: '20px', marginRight: '20px' }}>
    <div>배송비</div>
    <div>3$</div>
  </Typography>
  <Typography variant="subtitle1" style={{fontSize: '30px',  paddingRight: '20px', marginRight: '20px' }}>
    <div>주문금액 : 403</div>
  </Typography>
</div>

  </Box>

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
