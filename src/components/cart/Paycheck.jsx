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
  CardMedia ,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper , TextField
  
  } from '@mui/material';
  import Checkbox from '@mui/material/Checkbox';


const Paycheck = () => {


    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Item 1', price: 20, quantity: 2 },
        { id: 2, name: 'Item 2', price: 30, quantity: 1 },
        { id: 3, name: 'Item 2', price: 30, quantity: 1 },
        { id: 4, name: 'Item 2', price: 30, quantity: 1 },
        { id: 5, name: 'Item 2', price: 30, quantity: 1 },
    
        // Add more items as needed
      ]);
  return (
    <div className='ak_wrap'>
    <div className='ak_contents'>
      <Typography variant="h6" style={{ fontSize: '40px', flexGrow: 1 }}>
                            결제완료
      </Typography>
      <hr></hr>

      
       <TableContainer component={Paper} style={{ border: '1px solid #ddd' , borderRadius: '0'   }}  >
            <Table>
              <TableHead>
                  <TableRow style={{ border: '1px solid #ddd', borderRadius: '0', backgroundColor: 'white' }}>
                {/* colSpan을 사용하여 병합 */}
                  <TableCell style={{ border: '1px solid #ddd', borderRadius: '0' }} colSpan={7}>
                      주문번호
                  </TableCell>
                  </TableRow>
                  <TableRow style={{ border: '1px solid #ddd', borderRadius: '0', backgroundColor: 'white' }}>
                {/* colSpan을 사용하여 병합 */}
                  <TableCell style={{ border: '1px solid #ddd', borderRadius: '0' }} colSpan={7}>
                     12314212312
                  </TableCell>
                  </TableRow>
                  <TableRow style={{ border: '1px solid #ddd', borderRadius: '0', backgroundColor: 'white' }}>
                {/* colSpan을 사용하여 병합 */}
                  <TableCell style={{ border: '1px solid #ddd', borderRadius: '0' }} colSpan={7}>
                    주문상태 : 결제완료
                  </TableCell>
                  </TableRow>

                <TableRow>
     
                  <TableCell style={{ border: '1px solid #ddd' ,borderRadius: '0' , textAlign: 'center' , backgroundColor: '#ECE6CC'  }}>이미지</TableCell>
                  <TableCell style={{ border: '1px solid #ddd' ,borderRadius: '0'  , textAlign: 'center' , backgroundColor: '#ECE6CC' }}>상품 정보</TableCell>
                  <TableCell style={{ border: '1px solid #ddd' ,borderRadius: '0' , textAlign: 'center' , backgroundColor: '#ECE6CC' }}>수량</TableCell>
                  <TableCell style={{ border: '1px solid #ddd' ,borderRadius: '0'  , textAlign: 'center' , backgroundColor: '#ECE6CC' }}>배송 정보</TableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((product) => (
                  <TableRow key={product.id}>
                    {/* 체크박스 */}
                

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

    <hr></hr>

    <Typography variant="h6" style={{ fontSize: '25px', flexGrow: 1, color:"black", marginTop: '40px' }}>
             배송정보
    </Typography>


     <TableContainer component={Paper} style={{ border: '1px solid #ddd' , borderRadius: '0'   }}>
     <Grid container spacing={1}>
      <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC' }}>
        <Typography>배송지 선택</Typography>
      </Grid>
      <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
          dd
      </Grid>

       <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography>받으시는 분</Typography>
      </Grid>
      <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
             텍스트
      </Grid>

      <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC' }}>
        <Typography>주소</Typography>
      </Grid>
      <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
      텍스트
      </Grid>

      <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC' }}>
        <Typography>휴대전화</Typography>
      </Grid>
      <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
      텍스트
      </Grid>

      <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC' }}>
        <Typography>이메일</Typography>
      </Grid>
      <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
      텍스트
      </Grid>

      <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC' }}>
        <Typography>배송비</Typography>
      </Grid>
      <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
      텍스트
      </Grid>
    </Grid>



    </TableContainer>

    
</div>
</div>
  )
}

export default Paycheck