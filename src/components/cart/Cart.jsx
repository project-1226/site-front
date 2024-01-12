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
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper

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
    {
      id: 1,
      image: '이미지URL1',
      name: '상품 1',
      price: '100,000원',
      point: '1,000원',
      quantity: 2,
      shippingType: '택배',
      shippingCost: '5,000원',
      total: '210,000원',
    },
    {
      id: 2,
      image: '이미지URL2',
      name: '상품 2',
      price: '50,000원',
      point: '500원',
      quantity: 1,
      shippingType: '퀵 서비스',
      shippingCost: '10,000원',
      total: '60,000원',
    },
    // ... 더 많은 상품 데이터
  

    // Add more items as needed
  ]);

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  return (
    <div className='ak_wrap'>
      <div className='ak_contents'>
      <Box style={{ backgroundColor: 'white', padding: '15px',  }}>
          <Typography variant="h6" style={{ fontSize: '25px', flexGrow: 1, color:"black" }}>
             장바구니
        </Typography>
          <hr></hr>
        

       
  
    <TableContainer component={Paper} style={{ border: '1px solid #ddd' , borderRadius: '0'   }}  >
      <Table>
        <TableHead>
             <TableRow style={{ border: '1px solid #ddd', borderRadius: '0', backgroundColor: '#ECE6CC' }}>
          {/* colSpan을 사용하여 병합 */}
             <TableCell style={{ border: '1px solid #ddd', borderRadius: '0' }} colSpan={7}>
                일반상품
            </TableCell>
             </TableRow>
          <TableRow>
            <TableCell style={{ border: '1px solid #ddd' , borderRadius: '0' , textAlign: 'center', backgroundColor: '#ECE6CC'   }}  >ㅁ</TableCell>
            <TableCell style={{ border: '1px solid #ddd' ,borderRadius: '0' , textAlign: 'center' , backgroundColor: '#ECE6CC'  }}>이미지</TableCell>
            <TableCell style={{ border: '1px solid #ddd' ,borderRadius: '0'  , textAlign: 'center' , backgroundColor: '#ECE6CC' }}>상품 정보</TableCell>
            <TableCell style={{ border: '1px solid #ddd' ,borderRadius: '0' , textAlign: 'center' , backgroundColor: '#ECE6CC' }}>수량</TableCell>
            <TableCell style={{ border: '1px solid #ddd' ,borderRadius: '0'  , textAlign: 'center' , backgroundColor: '#ECE6CC' }}>배송 정보</TableCell>
            <TableCell style={{ border: '1px solid #ddd' ,borderRadius: '0' , textAlign: 'center' , backgroundColor: '#ECE6CC'  }}>합계</TableCell>
            <TableCell style={{ border: '1px solid #ddd'  ,borderRadius: '0' , textAlign: 'center' , backgroundColor: '#ECE6CC' }}>선택</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((product) => (
            <TableRow key={product.id}>
              {/* 체크박스 */}
              <TableCell style={{  width: '5px' , borderRadius: '0'  }} >
                <Checkbox />
              </TableCell>

              {/* 이미지 */}
              <TableCell >
                <img src={product.image} alt={product.name} style={{ maxWidth: '100%', height: 'auto' }} />
              </TableCell>

              {/* 상품 정보 */}
              <TableCell style={{ width: '500px' }} >
                <Typography variant="subtitle1">{product.name}</Typography>
                <Typography variant="body2">판매가: {product.price}</Typography>
                <Typography variant="body2">적립금: {product.point}</Typography>
              </TableCell>

              {/* 수량 */}
              <TableCell style={{ border: '1px solid #ddd' , borderRadius: '0'  }} >
                <Typography variant="body2">수량: {product.quantity}</Typography>
              </TableCell>

              {/* 배송 정보 */}
              <TableCell style={{ border: '1px solid #ddd' , borderRadius: '0'  }}>
                <Typography variant="body2">배송 구분: {product.shippingType}</Typography>
                <Typography variant="body2">배송비: {product.shippingCost}</Typography>
              </TableCell>

              {/* 합계 */}
              <TableCell style={{ border: '1px solid #ddd' , borderRadius: '0'  }}>
                <Typography variant="body2">합계: {product.total}</Typography>
              </TableCell>

              {/* 선택 */}
              <TableCell style={{ border: '1px solid #ddd' , borderRadius: '0'  }}>
                <Typography variant="body2">선택</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
     
      <TableRow style={{ border: '1px solid #ddd', borderRadius: '0', backgroundColor: '#ECE6CC' }}>
          {/* colSpan을 사용하여 병합 */}
             <TableCell style={{ border: '1px solid #ddd', borderRadius: '0' ,textAlign: 'right'}} colSpan={7}>
                상품금액 0 + 배송비 10000 = 합계 0원
            </TableCell>
       </TableRow>
       </Table>

    </TableContainer>

    <TableContainer component={Paper} style={{ border: '1px solid #ddd' , borderRadius: '0' , marginTop: '20px'  }}  >
      <Table>
        <TableRow>
            <TableCell style={{ border: '1px solid #ddd' , borderRadius: '0' , textAlign: 'center', backgroundColor: '#ECE6CC'  }}  >총 상품금액</TableCell>
            <TableCell style={{ border: '1px solid #ddd' ,borderRadius: '0'  , textAlign: 'center', backgroundColor: '#ECE6CC' }}>배송비</TableCell>
            <TableCell style={{ border: '1px solid #ddd' ,borderRadius: '0' , textAlign: 'center', backgroundColor: '#ECE6CC' }}>결제예정금액</TableCell>
        </TableRow>
        <TableBody>
        
            <TableRow >
              {/* 체크박스 */}
              <TableCell style={{ border: '1px solid #ddd',width: '300px' , borderRadius: '0', textAlign: 'center', backgroundColor: 'WHITE'  }} >
                                100,000원
              </TableCell>
              <TableCell style={{ border: '1px solid #ddd',width: '300px' , borderRadius: '0', textAlign: 'center', backgroundColor: 'WHITE'  }} >
              100,000원
              </TableCell>
              <TableCell style={{ border: '1px solid #ddd',width: '600px' , borderRadius: '0' , textAlign: 'center', backgroundColor: 'WHITE' }} >
              100,000원
              </TableCell>

            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

  </Box>


      </div>
          




</div>
);
};

export default Cart;