import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,TextField,
  InputAdornment
} from '@mui/material';
const OrderList= ({ orderid }) => {

    const [purchaseList, setPurchaseList] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
   
    const [adrlist, setadrlist] = useState({
      recipient:"",
      address2:"",
      address3:"",
      address1:"",
      request:"",
      recipient_phone:"",
      card:"",
    });
  



    useEffect(() => {
        const fetchData = async () => {
          try {
            // Send a POST request to the server
            const response = await axios.post(
              '/purchase/listfromorderid',
              { orderid: orderid } // Include the user ID in the request body
            );
    
            // Set the data received from the server
            setPurchaseList(response.data.purchaseList);
            setSum(response.data.purchaseList);
            
            setadrlist({
              ...adrlist,
              recipient: response.data.purchaseList[0].recipient,
              address2: response.data.purchaseList[0].address2,
              address3: response.data.purchaseList[0].address3,
              address1: response.data.purchaseList[0].address1,
              request: response.data.purchaseList[0].request,
              recipient_phone: response.data.purchaseList[0].recipient_phone,
              card: response.data.purchaseList[0].card
              // ... 추가 필요한 속성들
            });
          
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // Call the function to fetch data
        fetchData();
        console.log(adrlist)
       
     
      }, [orderid]);
    

      const setSum = (list) => {
        let sum = 0;
        list.forEach((purchase) => {
          sum += purchase.purchase_price * purchase.count;
        });
        setTotalSum(sum);
        console.log(adrlist)
      };
    
  return (
    <div>
      
    <div>
     
      {Array.isArray(purchaseList) && purchaseList.length > 0 ? (
        <ul>
        
<TableContainer component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0' }}  >
          <Table>
            <TableHead>

              <TableRow style={{ border: '1px solid #ddd', borderRadius: '0', backgroundColor: 'white' }}>
                <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', fontSize: '20px', fontWeight: 'bold' }} colSpan={5}>
                  주문번호 : {orderid}
                </TableCell>
              </TableRow>
              <TableRow>
              
                <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>이미지</TableCell>
                <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>상품 정보</TableCell>
                <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>수량</TableCell>
                <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>배송 정보</TableCell>
                <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>금액</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchaseList.map((purchase) => (
                <TableRow key={purchase.purchasedetailid}>
      

                  {/* 이미지 */}
                  <TableCell >
                    <img src={purchase.image_url} style={{ maxWidth: '100px', height: 'auto' }} />
                  </TableCell>

                  {/* 상품 정보 */}
                  <TableCell style={{ width: '500px' }} >
                    <Typography variant="subtitle1">{purchase.name}</Typography>
                    <Typography variant="body2">판매가: {purchase.purchase_price}</Typography>

                  </TableCell>

                  {/* 수량 */}
                  <TableCell style={{ border: '1px solid #ddd', borderRadius: '0' }} >
               
                    <Typography variant="body2">{purchase.count} 개</Typography>
           
                  </TableCell>

                  {/* 배송 정보 */}
                  <TableCell style={{ border: '1px solid #ddd', borderRadius: '0' }}>

                    <Typography variant="body2">배송비: 무료 </Typography>
                  </TableCell>

                  {/* 합계 */}
                  <TableCell style={{ border: '1px solid #ddd', borderRadius: '0' }}>
                    <Typography variant="body2"> </Typography>
                  </TableCell>

                  {/* 선택 */}
            
                </TableRow>
              ))}
            </TableBody>

            <TableRow style={{ border: '1px solid #ddd', borderRadius: '0', backgroundColor: '#748769' }}>
              {/* colSpan을 사용하여 병합 */}
              <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'right', color: 'white', fontSize: '16px', fontWeight: 'bold' }} colSpan={7}>
                결제된 금액:{totalSum} 
              </TableCell>
            </TableRow>
          </Table>

        </TableContainer>

      

        <TableContainer component={Paper} style={{ width: '50%', border: '1px solid #ddd', borderRadius: '0',marginTop:"10px" }}>
                <Grid container spacing={1}>
                  <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#748769' }}>
                    <Typography   style={{ borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>받는분 성함</Typography>
                  </Grid>
                  <Grid item xs={9} style={{ border: '1px solid #ddd', borderRadius: '0' }} >
                  <Typography>{adrlist.recipient}</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#748769' }}>
                  <Typography   style={{ borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>주소</Typography>
                  </Grid>
                  <Grid item xs={9} style={{ border: '1px solid #ddd', borderRadius: '0' }} >
                  <Typography >우편번호: {adrlist.address1} {adrlist.address2}  {adrlist.address3} </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#748769' }}>
                  <Typography   style={{ borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>전화번호</Typography>
                  </Grid>
                  <Grid item xs={9} style={{ border: '1px solid #ddd', borderRadius: '0' }} >
                  <Typography >{adrlist.recipient_phone} </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#748769' }}>
                  <Typography   style={{ borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>결제수단</Typography>
                  </Grid>
                  <Grid item xs={9} style={{ border: '1px solid #ddd', borderRadius: '0' }} >
                  <Typography >{adrlist.card} </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={1}>
                  <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#748769' }}>
                  <Typography   style={{ borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>배송시 요청사항</Typography>
                  </Grid>
                  <Grid item xs={9} style={{ border: '1px solid #ddd', borderRadius: '0' }} >
                  <Typography>{adrlist.request ? adrlist.request : "없음"}</Typography>
                  </Grid>
                </Grid>

         </TableContainer>

        </ul>

      ) : (
        <p>No purchases found</p>
      )}

    </div>
  </div>
);
};

export default OrderList