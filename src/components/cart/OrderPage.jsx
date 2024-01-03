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
    Select, MenuItem, FormControl, InputLabel ,
    TextField
  
  } from '@mui/material';
const OrderPage = () => {
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
  const[user,setUser] = useState([
      { nickname: "박선우", phone:"010-0000-0000" ,addr:"온수역 1번 출구" ,addr2:"알빠임?",point:"1000000"  }

  ])
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleChange = (event) => {
    setSelectedLocation(event.target.value);
  };

//|userid               |email         |password |nickname |phone |avatar                                    |point |regdate  |fmtdate            
//|e91b8eb6-24af-404a-b |seon@test.com |pass1234 |seon     |null  |http://via.placeholder.com/100x100?text=S |3000  |[unread] |2024-01-03 03:48:58 |






  return (
    <Container>
        <AppBar position="static" style={{ background: 'rgb(116, 135, 105)' }}>
                <Toolbar>
                        <Typography variant="h6" style={{ fontSize: '40px', flexGrow: 1 }}>
                            주문 / 결제
                        </Typography>
                </Toolbar>
        </AppBar>

<Box style={{ backgroundColor: 'gray', padding: '15px',  }}>
    
        <Grid container spacing={2}>
      {/* 첫 번째 행 */}
  <Grid item xs={8}>
    <Box style={{ backgroundColor: 'white', padding: '15px',  }}>
    <Typography variant="h6" style={{ fontSize: '20px', flexGrow: 1 }}>
                            배송지
                            
    </Typography>
    
    <hr></hr>
    <Typography variant="h6" style={{ fontSize: '15px', flexGrow: 1 }}>
    <div>{user[0].nickname}</div>
    <div>{user[0].phone}</div>
    <div>{user[0].addr}</div>
    <div>{user[0].addr2}</div>
                            
    </Typography>
 
    

    <FormControl style={{ width: '300px', }} >
        <InputLabel id="location-dropdown-label">배송 요청사항</InputLabel>
        <Select
          labelId="location-dropdown-label"
          id="location-dropdown"
          value={selectedLocation}
          label="Select Location"
          onChange={handleChange}
        >
          <MenuItem value="home">요청사항1</MenuItem>
          <MenuItem value="school">요청사항2</MenuItem>
          <MenuItem value="company">요청사항3</MenuItem>
        </Select>
      </FormControl>
    </Box>
      
    </Grid>
      <Grid item xs={4}>
      <Box style={{ backgroundColor: 'white', padding: '15px',  }}>

      </Box>
       
      </Grid>

      {/* 두 번째 행 */}
      <Grid item xs={8}>
        {/* 첫 번째 열 */}
        <Box style={{ backgroundColor: 'white', padding: '15px',  }}>
        <Typography variant="h6" style={{ fontSize: '20px', flexGrow: 1 }}>
                           주문 목록
      </Typography>
      <hr></hr>
        {cartItems.map((item) => (
            <Grid item key={item.id}>
                <Card style={{ display: 'flex', alignItems: 'center' ,borderBottom: '1px solid black' ,borderRadius:"0px" }}>
                    {/* 기본 이미지 추가 */}
                    <div style={{ backgroundColor: 'rgb(116, 135, 105)', padding: '5px',  marginRight: '16px' }}>
                        <div style={{ backgroundColor: 'white', padding: '8px'}}>
                            <img src="/logo192.png" alt="기본이미지" style={{ width: '100px', height: '100px', objectFit: 'cover' }}/>
                        </div>
                    </div>
                    <CardContent style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '16px'}}>
                        <Typography variant="h6" style={{ borderRight: '2px solid #ddd', paddingRight: '10px', marginRight: '10px' , fontSize: '15px'}}>
                            <div>
                                이름:  닭가슴살
                            </div>
                            <div style={{ marginLeft: '' }}>
                                가격: ${item.price}
                            </div>
                            <div> 
                                수량: {item.quantity}  
                            </div>
                        </Typography>
                      
                        <Typography variant="subtitle1" style={{borderRight: '2px solid #ddd', paddingRight: '10px', marginRight: '10px'}}>
                            금액: $5000
                        </Typography>
                        <Typography variant="subtitle1" style={{ borderRight: '2px solid #ddd', paddingRight: '10px', marginRight: '10px' }}>
                            배송비 : 1000
                        </Typography>
                      
                    </CardContent>
                </Card>
            </Grid>
                  ))}
                <AppBar position="static" style={{ background: '#AFD485' }}>
                  <Toolbar>
                   <Typography variant="h6" style={{ fontSize: '20px', flexGrow: 1 }}>
                      주문 금액 : 
             
                  </Typography>
                  <Typography variant="h6" style={{ fontSize: '20px', flexGrow: 1, marginLeft: '250px' }}>
            
                      {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                  </Typography>
                </Toolbar>

                  </AppBar>
             
        </Box>
        

      </Grid>
      <Grid item xs={4}>
        {/* 두 번째 열 */}


      </Grid>
      <Grid item xs={8}>
      <Box style={{ backgroundColor: 'white', padding: '15px',  }}>

      <Typography variant="h6" style={{ fontSize: '20px', flexGrow: 1 }}>
               포인트 결제
      </Typography>
      <hr></hr>
      <Box style={{ backgroundColor: 'white', padding: '15px',   border: '1px solid #ccc' }}>
      <Toolbar>
      <Typography variant="h6" style={{ fontSize: '17px', flexGrow: 1 }}>
        포인트:
      </Typography>
 
      <Typography variant="h6" style={{ fontSize: '17px', flexGrow: 1 }}>
            <div>{user[0].point}</div>
      </Typography>
 
      </Toolbar>
      <Toolbar>
      <Typography variant="h6" style={{ fontSize: '17px', flexGrow: 1 }}>
        사용금액
     
      </Typography>
 
      <Typography variant="h6" style={{ fontSize: '17px', flexGrow: 1 }}>
      <TextField
        label="입력하세요"
        variant="outlined"
        style={{ marginBottom: '15px', marginLeft:"30px" }}
      />

      </Typography>
 
      </Toolbar>
      </Box>
     
   


      </Box>
      </Grid>
      <Grid item xs={4}>
        {/* 두 번째 열 */}


      </Grid>
      <Grid item xs={8}>
        <Box style={{ backgroundColor: 'white', padding: '15px',  }}>
        <Typography variant="h6" style={{ fontSize: '20px', flexGrow: 1 }}>
             결제 수단
       </Typography>
        <hr></hr>
        <Box style={{ backgroundColor: 'white', padding: '15px',   border: '1px solid #ccc' }}>
        <Typography variant="h6" style={{ fontSize: '15px', flexGrow: 1 }}>
             포인트 결제
       </Typography>
       <hr></hr>
       <Typography variant="h6" style={{ fontSize: '15px', flexGrow: 1 }}>
             계좌 결제
       </Typography>
       <hr></hr>
       <Typography variant="h6" style={{ fontSize: '15px', flexGrow: 1 }}>
             간편 결제
       </Typography>
        </Box>
        </Box>
        </Grid>
        <Grid item xs={4}>
          
        </Grid>

  </Grid>

        <Button></Button>

</Box>
</Container>
  )
}

export default OrderPage