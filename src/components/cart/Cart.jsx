// Cart.jsx
import React, { useState, useEffect } from 'react';
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
import ModatPostCode from "../user/mypage/info/ModatPostCode"


import { Form, InputGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SvgIcon from "@mui/material/SvgIcon";
import { SvgIconComponent } from "@mui/icons-material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isOrder, setIsOrder] = useState(false);
  const size = 10;
  const page = 1;
  const [list, setList] = useState([]);
  const [adrlist, setadrList] = useState([]);
  const [total, setTotal] = useState(0);
  const [sum, setSum] = useState(0);
  const [lcount, setcount] = useState(0);
  const [checkSum, setCheckSum] = useState(0);
  const [useraddress, setUseraddress] = useState([]);

  const [form, setForm] = useState({
    userid: sessionStorage.getItem("userid"),
    selected: 0,
    recipient: "",
    recipient_phone: "",
    address1: "",
    address2: "",
    address3: "",
  });
  const {
    selected,
    recipient,
    recipient_phone,
    address1,
    address2,
    address3,
  } = form;





  const [submitted, setSubmitted] = useState(false);

  const getList = async () => {
    const res = await axios(`/cart/list.json?&userid=4e398468-197c-4b8f-a`);
    const data = res.data.list.map(product => product && { ...product, checked: false });
    setList(data);
    setTotal(res.data.total);
    setSum(res.data.sum);
  }


  const getadrList = async () => {
    try {
      const res = await axios("/address/list", {
        params: { userid: sessionStorage.getItem("userid"), page, size },
      });
  
      const array = res.data.list;
      setadrList(array);
      console.log(adrlist);
    } catch (error) {
      console.error("Error fetching address list:", error);
    }
  };

  const onDelete = async (cartids) => {
    console.log(cartids)

    await axios('/cart/delete', { cartid: cartids });
    console.log("됨?")
    getList();
  }
  const onChangeAll = (e) => {
    const data = list.map(product => product && { ...product, checked: e.target.checked });
    setList(data);
  }

  const onChangeSingle = (e, cartid) => {
    const data = list.map(product => product.cartid === cartid ? { ...product, checked: e.target.checked } : product);
    setList(data);
  }

  const onDeleteChecked = async () => {
    if (lcount == 0) {
      alert("삭제할 상품을 선택하세요!");
    } else {
      for (const product of list) {
        if (product.checked) {
          console.log(product.cartid);
          await axios('/cart/delete', { cartid: product.cartid });
        }
      }
      getList();
    }
  }

  const onChangeQnt = (e, cartid) => {
    const data = list.map(product => product.cartid === cartid ? { ...product, count: e.target.value } : product);
    setList(data);
  }

  const onUpdateQnt = async (cartid, count) => {
    await axios.post("/cart/update/qnt", { cartid, count });
    alert("수정완료!");
    getList();
  }

  const onClickOrder = () => {
    if (lcount === 0) {
      alert("주문할 상품을 선택하세요!");
    } else {
      setIsOrder(true);
    }
  }

  const movetoorderpage = () => {
    // '/order'로 페이지 이동
    if (window.confirm("결제하시겠습니까?")) {

      navigate('/order');
    }

  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form);
  };
  const onSubmit = async () => {
    setSubmitted(true);
    if (!recipient || !recipient_phone || !address1 || !address3) {
      return;
    }
    await axios.post("/address/insert", form);
    alert("배송지가 등록되었습니다.");
    setSubmitted(false);
  
  };

  
  
  useEffect(() => {
    getList();
    getadrList();
    
  }, []);

  useEffect(() => {
    console.log(adrlist);


  }, [adrlist]);


 
  useEffect(() => {
    let lcount = 0;
    let sum = 0;
    list.forEach(product => {
      if (product.checked) {
        lcount++;
        sum += product.sum;
      }
    });
    setcount(lcount);
    setCheckSum(sum);
  }, [list]);


 
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

const handleRadioChange = (addressid) => {
    setSelectedAddressId(addressid);

    // 선택한 주소가 새로운 배송지인 경우 폼 데이터 초기화
    if (addressid === 'newAddress') {
      setForm({
        recipient: '',
        recipient_phone: '',
        address1: '',
        address2: '',
        address3: '',
      });
    } else {
      // 기존 주소를 선택한 경우 해당 주소 데이터로 폼 초기화
      const selectedAddress = adrlist.find((address) => address.addressid === addressid);
      if (selectedAddress) {
        setForm({
          recipient: selectedAddress.recipient,
          recipient_phone: selectedAddress.recipient_phone,
          address1: selectedAddress.address1,
          address2: selectedAddress.address2,
          address3: selectedAddress.address3,
        });
      }
    }
  };

  const handleShowNewAddressForm = () => {
    setSelectedAddressId('newAddress');
    setShowNewAddressForm(true);
  };
  const handleAddNewAddress = () => {
    // TODO: 새로운 주소를 추가하는 로직을 구현하세요.
    // 서버에 새로운 주소 정보를 전송하거나, 로컬 상태에 추가하는 등의 작업을 수행합니다.
    // 주소 추가가 완료되면 setShowNewAddressForm(false); 를 호출하여 폼을 닫습니다.
  };





  return (
    <div className='ak_wrap'>
      <div className='ak_contents'>
        <Box style={{ backgroundColor: 'white', padding: '15px', }}>
          <Typography variant="h6" style={{ fontSize: '25px', flexGrow: 1, color: "black" }}>
            장바구니
          </Typography>
          <hr></hr>




          <TableContainer component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0' }}  >
            <Table>
              <TableHead>

                <TableRow style={{ border: '1px solid #ddd', borderRadius: '0', backgroundColor: 'white' }}>
                  {/* colSpan을 사용하여 병합 */}

                  <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', fontSize: '20px', fontWeight: 'bold' }} colSpan={5}>
                    일반상품
                  </TableCell>
                  <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'right' }} colSpan={2}>
                    <Button onClick={onDeleteChecked}> <SvgIcon component={DeleteForeverIcon} inheritViewBox /></Button>
                  </TableCell>

                </TableRow>
                <TableRow>
                  <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'center', backgroundColor: '#748769' }}  >
                    <input checked={list.length === lcount} type="checkbox" onChange={onChangeAll} /></TableCell>
                  <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>이미지</TableCell>
                  <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>상품 정보</TableCell>
                  <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>수량</TableCell>
                  <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>배송 정보</TableCell>
                  <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>금액</TableCell>
                  <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>삭제</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((product) => (
                  <TableRow key={product.cartid}>
                    {/* 체크박스 */}
                    <TableCell style={{ width: '5px', borderRadius: '0' }} >
                      <input onChange={(e) => onChangeSingle(e, product.cartid)}
                        type="checkbox" checked={product.checked} />
                    </TableCell>

                    {/* 이미지 */}
                    <TableCell >
                      <img src={product.image} style={{ maxWidth: '100%', height: 'auto' }} />
                    </TableCell>

                    {/* 상품 정보 */}
                    <TableCell style={{ width: '500px' }} >
                      <Typography variant="subtitle1">{product.name}</Typography>
                      <Typography variant="body2">판매가: {product.price}</Typography>
                      <Typography variant="body2">적립금: {product.point}</Typography>
                    </TableCell>

                    {/* 수량 */}
                    <TableCell style={{ border: '1px solid #ddd', borderRadius: '0' }} >
                      <Typography variant="body2">
                        <InputGroup >
                          <Form.Control onChange={(e) => { onChangeQnt(e, product.cartid) }}
                            value={product.count} type="number" />
                          <Button onClick={() => onUpdateQnt(product.cartid, product.count)}
                            variant='outline-dark'>수정</Button>
                        </InputGroup>

                      </Typography>
                    </TableCell>

                    {/* 배송 정보 */}
                    <TableCell style={{ border: '1px solid #ddd', borderRadius: '0' }}>

                      <Typography variant="body2">배송비: 무료 </Typography>
                    </TableCell>

                    {/* 합계 */}
                    <TableCell style={{ border: '1px solid #ddd', borderRadius: '0' }}>
                      <Typography variant="body2"> {product.fmtsum}</Typography>
                    </TableCell>

                    {/* 선택 */}
                    <TableCell style={{ border: '1px solid #ddd', borderRadius: '0' }}>
                      <Typography variant="body2">
                        <Button onClick={() => onDelete(product.cartid)}>  <SvgIcon component={DeleteForeverIcon} inheritViewBox /> </Button>

                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableRow style={{ border: '1px solid #ddd', borderRadius: '0', backgroundColor: '#748769' }}>
                {/* colSpan을 사용하여 병합 */}
                <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'right', color: 'white', fontSize: '16px', fontWeight: 'bold' }} colSpan={7}>
                  결제금액: {sum}
                </TableCell>
              </TableRow>
            </Table>

          </TableContainer>

          <TableContainer component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', marginTop: '20px' }}  >
            <Table>
              <TableRow>
                <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}  >총 상품금액</TableCell>
                <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>배송비</TableCell>
                <TableCell style={{ border: '1px solid #ddd', borderRadius: '0', textAlign: 'center', backgroundColor: '#748769', color: 'white', fontSize: '16px', fontWeight: 'bold' }}>결제예정금액</TableCell>

              </TableRow>
              <TableBody>

                <TableRow >
                  {/* 체크박스 */}
                  <TableCell style={{ border: '1px solid #ddd', width: '300px', borderRadius: '0', textAlign: 'center', backgroundColor: 'WHITE' }} >
                    {sum}
                  </TableCell>
                  <TableCell style={{ border: '1px solid #ddd', width: '300px', borderRadius: '0', textAlign: 'center', backgroundColor: 'WHITE' }} >
                    무료
                  </TableCell>
                  <TableCell style={{ border: '1px solid #ddd', width: '600px', borderRadius: '0', textAlign: 'center', backgroundColor: 'WHITE' }} >
                    {sum}
                  </TableCell>

                </TableRow>
              </TableBody>
            </Table>

          </TableContainer>
          <hr></hr>

          <Typography variant="h6" style={{ fontSize: '25px', flexGrow: 1, color: "black", marginTop: '40px' }}>
            배송정보
          </Typography>
          

      {selectedAddressId !== null && (
        <div>
       
          {/* 다른 주소 정보도 필요하다면 추가하세요 */}
          <TableContainer component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0' }}>
            <Grid container spacing={1}>
              <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC' }}>
                <Typography>배송지 명</Typography>
              </Grid>
              <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {adrlist.map((address) => (
          <div key={address.addressid} style={{ marginRight: '10px', marginBottom: '10px' }}>
            <input
              type="radio"
              name="recipientRadio"
              checked={address.addressid === selectedAddressId}
              onChange={() => handleRadioChange(address.addressid)}
            />
            {address.recipient} 
          </div>

        ))}
           <Button variant="outlined" color="primary" onClick={handleShowNewAddressForm}>
            새로운 배송지
          </Button>
        </div>
              </Grid>

              <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography>받으시는 분</Typography>
              </Grid>
              <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
              {adrlist.find((address) => address.addressid === selectedAddressId)?.recipient}

              {selectedAddressId === "newAddress" && (
                               < TextField id="input-with-sx" variant="standard" 
                     
                               type="text"
                               placeholder="받는 사람"
                               name="recipient"
                               value={recipient}
                               onChange={onChange}
                               helperText={
                                !recipient &&
                                submitted && (
                                  <Typography variant="caption" color="error">
                                    받는 사람 이름을 입력하세요.
                                  </Typography>
                                )
                              }
                               /> )}
              </Grid>

           

              <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC' }}>
                <Typography>휴대전화</Typography>
              </Grid>
              <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
              {adrlist.find((address) => address.addressid === selectedAddressId)?.recipient_phone}
              {selectedAddressId === "newAddress" && (
                                < TextField id="input-with-sx" variant="standard" 
                     
                                type="text"
                                placeholder="받는 사람"
                                name="recipient_phone"
                                value={recipient_phone}
                                onChange={onChange}
                                helperText={
                                 !recipient_phone &&
                                 submitted && (
                                   <Typography variant="caption" color="error">
                                     받는 사람 전화번호를 입력하세요.
                                   </Typography>
                                 )
                               }
                                /> )}
              </Grid>
              <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC' }}>
                <Typography>주소</Typography>
              </Grid>
              <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
              {adrlist.find((address) => address.addressid === selectedAddressId)?.address1}
              {selectedAddressId === "newAddress" && (
                               < TextField id="input-with-sx" variant="standard" 
                     
                               type="text"
                               placeholder="주소"
                               name="recipient"
                               value={address1}
                               InputProps={{
                                readOnly: true,
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <ModatPostCode form={form} setForm={setForm} />
                                  </InputAdornment>
                                ),
                              }}
                               onChange={onChange}
                               helperText={
                                !address1 &&
                                submitted && (
                                  <Typography variant="caption" color="error">
                                    주소 검색을 해주세요.
                                  </Typography>
                                )
                              }
                               />  )}
                  
              </Grid>
              <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC' }}>
                <Typography>상세주소</Typography>
              </Grid>
              <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
              {adrlist.find((address) => address.addressid === selectedAddressId)?.address2}
              {selectedAddressId === "newAddress" && (
                                <TextField
                                fullWidth
                                type="text"
                                placeholder="주소"
                                name="address2"
                                value={address2}
                                InputProps={{
                                  readOnly: true,
                                }}
                                onChange={onChange}
                              /> )}
              </Grid>
              <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#ECE6CC' }}>
                <Typography>상세주소</Typography>
              </Grid>
              <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
              {adrlist.find((address) => address.addressid === selectedAddressId)?.address3}
              {selectedAddressId === "newAddress" && (
                                <TextField
                                fullWidth
                                type="text"
                                placeholder="상세주소"
                                name="address3"
                                value={address3}
                                onChange={onChange}
                                helperText={
                                  !address3 &&
                                  submitted && (
                                    <Typography variant="caption" color="error">
                                      상세 주소를 입력해주세요.
                                    </Typography>
                                  )
                                }
                              /> )}
              </Grid>

          
            </Grid>



          </TableContainer>


        </div>
      )}

        
          
          <Button  onClick={onSubmit} style={{ border: '1px solid #ddd', width: '200px', height: '30px', borderRadius: '0', backgroundColor: '#748769', color: 'white', fontSize: '13px', fontWeight: 'bold', textAlign: 'center',marginTop: '10px' }}>배송지 추가</Button>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>

            <Button onClick={movetoorderpage} style={{ border: '1px solid #ddd', width: '600px', height: '100px', borderRadius: '0', backgroundColor: '#748769', color: 'white', fontSize: '40px', fontWeight: 'bold', textAlign: 'center' }}>{sum}원 결제하기</Button>



          </div>

        </Box>
      

      </div>
                 
      <div>
      <h2>주소 목록</h2>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {adrlist.map((address) => (
          <div key={address.addressid} style={{ marginRight: '10px', marginBottom: '10px' }}>
            <input
              type="radio"
              name="recipientRadio"
              checked={address.addressid === selectedAddressId}
              onChange={() => handleRadioChange(address.addressid)}
            />
            {address.recipient}
          </div>
        ))}
        <div style={{ marginRight: '10px', marginBottom: '10px' }}>
          <Button variant="outlined" color="primary" onClick={handleShowNewAddressForm}>
            새로운 배송지
          </Button>
        </div>
      </div>

      {showNewAddressForm && (
        <div>
          <h2>새로운 주소 입력</h2>
          {/* TODO: 새로운 주소 입력 폼을 구현하세요. */}
          {/* 필요한 입력 필드 및 버튼 등을 추가하세요. */}
          {/* 주소 추가가 완료되면 setShowNewAddressForm(false); 를 호출하여 폼을 닫습니다. */}
        </div>
      )}

      {/* 선택된 주소 정보 표시 */}
      <h2>선택된 주소 정보</h2>
      {selectedAddressId !== null && (
        <div>
          <p>선택된 주소의 수령인: {adrlist.find((address) => address.addressid === selectedAddressId)?.recipient}</p>
          {/* 다른 주소 정보도 필요하다면 추가하세요 */}
        </div>
      )}
    </div>




    </div>
  );
};

export default Cart;