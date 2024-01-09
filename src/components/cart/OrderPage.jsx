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
  
const OrderPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 20, quantity: 2 },
    { id: 2, name: 'Item 2', price: 30, quantity: 1 },
    { id: 3, name: 'Item 2', price: 30, quantity: 1 },
    { id: 4, name: 'Item 2', price: 30, quantity: 1 },
    { id: 5, name: 'Item 2', price: 30, quantity: 1 },

    // Add more items as needed
  ]);
  const[user,setUser] = useState([
      { nickname: "박선우", phone:"010-0000-0000" ,addr:"온수역 1번 출구" ,addr2:"알빠임?",point:"1000000"  }

  ])
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleChange = (event) => {
    setSelectedLocation(event.target.value);
  };

//|userid               |email         |password |nickname |phone |avatar                                    |point |regdate  |fmtdate            
//|e91b8eb6-24af-404a-b |seon@test.com |pass1234 |seon     |null  |http://via.placeholder.com/100x100?text=S |3000  |[unread] |2024-01-03 03:48:58 |

function onClickPayment() {
  /* 1. 가맹점 식별하기 */
  const { IMP } = window;
  IMP.init('imp24566351');

  /* 2. 결제 데이터 정의하기 */
  const data = {
    pg: 'kakaopay',                           // PG사
    pay_method: 'card',                           // 결제수단
    merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
    amount: 1000,                                 // 결제금액
    name: '아임포트 결제 데이터 분석',                  // 주문명
    buyer_name: '홍길동',                           // 구매자 이름
    buyer_tel: '01012341234',                     // 구매자 전화번호
    buyer_email: 'example@example.com',               // 구매자 이메일
    buyer_addr: '신사동 661-16',                    // 구매자 주소
    buyer_postcode: '06018',                      // 구매자 우편번호

  };

  /* 4. 결제 창 호출하기 */
  IMP.request_pay(data, callback);
}


function callback(response) {
  const {
    success,
    merchant_uid,
    error_msg,
   
  } = response;

  if (success) {
    alert('결제 성공');
    console.log(response)
  } else {
    alert(`결제 실패: ${error_msg}`);
  }
}



  return (
    <div className='ak_wrap'>
    <div className='ak_contents'>
      <Typography variant="h6" style={{ fontSize: '40px', flexGrow: 1 }}>
                            주문 / 결제
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
      <TextField id="input-with-sx" label="With sx" variant="standard" />
      </Grid>

       <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography>받으시는 분</Typography>
      </Grid>
      <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
      <TextField id="input-with-sx" label="With sx" variant="standard" />
      </Grid>

      <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC' }}>
        <Typography>주소</Typography>
      </Grid>
      <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
      <TextField id="input-with-sx" label="With sx" variant="standard" />
      </Grid>

      <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC' }}>
        <Typography>휴대전화</Typography>
      </Grid>
      <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
      <TextField id="input-with-sx" label="With sx" variant="standard" />
      </Grid>

      <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC' }}>
        <Typography>이메일</Typography>
      </Grid>
      <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
      <TextField id="input-with-sx" label="With sx" variant="standard" />
      </Grid>

      <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC' }}>
        <Typography>배송비</Typography>
      </Grid>
      <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
      <TextField id="input-with-sx" label="With sx" variant="standard" />
      </Grid>
    </Grid>



    </TableContainer>

    
    <TableContainer component={Paper} style={{ border: '1px solid #ddd' , borderRadius: '0', marginTop: '40px'   }}>
    <Grid container spacing={1}>
          <Grid item xs={12} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC' }}>
            <Typography>결제예정금액 : </Typography>
          </Grid>
       

          <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography>결제방식</Typography>
          </Grid>
          <Grid item xs={6} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <label>
              <input
                type="radio"
                name="paymentOption"
                value="실시간 계좌이체"

        
                    />
              실시간 계좌이체
            </label>
            <label>
              <input
                type="radio"
                name="paymentOption"
                value="휴대폰결제"

        
                    />
              휴대폰결제
            </label>
            <label>
              <input
                type="radio"
                name="paymentOption"
                value="무통장입금"

        
                    />
              무통장입금
            </label>
            <label>
              <input
                type="radio"
                name="paymentOption"
                value="간편결제"

        
                    />
              간편결제
            </label>

          </Grid>
          <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
             <button onClick={onClickPayment}>결제하기</button>
          </Grid>
       
    </Grid>
    </TableContainer>

</div>
</div>
  )
}

export default OrderPage