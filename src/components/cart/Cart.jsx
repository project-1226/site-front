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
import { Link } from 'react-router-dom';



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
import Chatbot from '../chatbot/Chatbot';

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
  const [checkpayok, setCheckpayok] = useState(0);
  const [useraddress, setUseraddress] = useState([]);
  const currentTime = new Date().getTime();


  const [form, setForm] = useState({
    userid: sessionStorage.getItem("userid")?sessionStorage.getItem("userid"):"",
    selected: 0,
    recipient: "",
    recipient_phone: "",
    address1: "",
    address2: "",
    address3: "",
    orderid:`${sessionStorage.getItem("userid")}${new Date().getTime()}`,
    totalprice:"",
    card:"",
    status:1,
    request:"",
    addressid:0
  });
  const {
    addressid,
    selected,
    recipient,
    recipient_phone,
    address1,
    address2,
    address3,
    card,
    request,
    totalprice
  } = form;


  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const getList = async () => {
    const res = await axios(`/cart/list.json?&userid=${sessionStorage.getItem("userid")}`);
    const data = res.data.list.map(product => product && { ...product, checked: false });
   
    setTotal(res.data.total);
    setSum(res.data.sum);
    setList(data);
  }


  const getadrList = async () => {
    try {
      const res = await axios("/address/list", {
        params: { userid: sessionStorage.getItem("userid"), page, size },
      });
      console.log(res)
      const array = res.data.list;
      setadrList(array);
      const selectedAddress = array.find(address => address.selected === 1);
      if (selectedAddress) {
        // 찾은 주소 정보를 사용할 수 있습니다.
        const selectedAddressId = selectedAddress.addressid;
        setForm({
          ...form, 
          recipient: selectedAddress.recipient,
          recipient_phone: selectedAddress.recipient_phone,
          address1: selectedAddress.address1,
          address2: selectedAddress.address2,
          address3: selectedAddress.address3,
        });
      } else {
        console.log("No address with selected === 1 found.");
      }
      console.log(adrlist);
    } catch (error) {
      console.error("Error fetching address list:", error);
    }
  };

  const onDelete = async (cartid) => {
    console.log(cartid);
  
    await axios.post('/cart/delete', { cartid});
    alert("삭제완료!");
    getList();
  };
  
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
    //console.log(form);
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
  // console.log(form);


  }, [form]);



 
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


 
const onclickmainadr = ()=>{
    // adrlist 배열의 각 요소의 selected 속성을 0으로 설정
    const updatedAdrList = adrlist.map(ad => ({ ...ad, selected: 0 }));
    // 변경된 배열을 다시 설정
  

}



const handleRadioChange = (addressid) => {
    setSelectedAddressId(addressid);

    // 선택한 주소가 새로운 배송지인 경우 폼 데이터 초기화
    if (addressid === 'newAddress') {
      setForm({
        ...form, 
       
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
          ...form, 
          recipient: selectedAddress.recipient,
          recipient_phone: selectedAddress.recipient_phone,
          address1: selectedAddress.address1,
          address2: selectedAddress.address2,
          address3: selectedAddress.address3,
          addressid: selectedAddressId
        });
      }
    }
  };

  const handleShowNewAddressForm = () => {
    setSelectedAddressId('newAddress');
    setShowNewAddressForm(true);
  };




  // const [dvrform, setdvrForm] = useState({
  //   orderid:"",
  //   addressid: 0,
  //   userid: "",
  //   totalprice: 0,
  //   card: "",
  //   status: 0,
  //   request: ""

  // });

  // const {
  //   orderid,
  //   addressid,
  //   userid,
  //   totalprice,
  //   card,
  //   status,
  //   request
  // } = dvrform;


  useEffect(() => {
    // 주소 목록이 로드되었을 때 실행되는 코드 블록
  
    // selected가 1인 첫 번째 주소를 찾기
    const selectedAddress = adrlist.find(address => address.selected === 1);
  
    // 찾은 경우 해당 주소의 addressid를 selectedAddressId로 설정
    if (selectedAddress) {
      setSelectedAddressId(selectedAddress.addressid);
    }
  }, [adrlist]); // adrlist가 업데이트될 때마다 useEffect가 실행됩니다.

  function onClickPayment() {
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init('imp24566351');

    /* 2. 결제 데이터 정의하기 */
    const paydata = {
      pg: card,                           // PG사
      pay_method: 'card',                           // 결제수단
      merchant_uid: `${sessionStorage.getItem("userid")}${currentTime}`,   // 주문번호
      amount: sum,                                 // 결제금액
      name: '밀조이 결제',                  // 주문명
      buyer_name: recipient,                           // 구매자 이름
      buyer_tel: recipient_phone,                     // 구매자 전화번호
      buyer_email: 'example@example.com',               // 구매자 이메일
      buyer_addr:  address2 + address3 ,                    // 구매자 주소
      buyer_postcode: address1 ,                      // 구매자 우편번호

    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(paydata, callback);
  }
  async function callback(response) {
    const {
      success,
      merchant_uid,
      error_msg,
    } = response;
    console.log("--------------------------",selectedAddressId);
  
    if (success) {
      alert('결제 성공');
      console.log(response);
      if (selectedAddressId === "newAddress") {
        console.log("새배송지결제");
        try {
          await axios.post("/order/insert", form);
          // 추가로 처리할 로직이 있다면 여기에 작성하세요.
          navigate('/order');
        } catch (error) {
          console.error("새 배송지 추가 중 오류 발생:", error);
          // 오류 처리 로직을 여기에 작성하세요.
        }
      } else {
        console.log("기존로직",selectedAddressId); 
            
        setForm({
            ...form,
            addressid: selectedAddressId
          })
        console.log(form)
        try {
          await axios.post("/order/insertpd", form);
          // 추가로 처리할 로직이 있다면 여기에 작성하세요.

          navigate('/order');
        } catch (error) {
          console.error("주문추가중오류발생:", error);
          // 오류 처리 로직을 여기에 작성하세요.
        }




      }
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }
    

  const orderBtnClick = async(selectedAddressId) => {
    if(selectedAddressId =="newAddress"){
    
      onClickPayment()
    
    }else{
      onClickPayment()
      console.log("기존")
      console.log(selectedAddressId)
    }
};


const handlecardradiochange = (event) => {
  // 라디오 버튼이 변경될 때 호출되는 함수
  setForm({
    ...form,
    [event.target.name]: event.target.value,
  });
  
};

  return (
    <div className='ak_wrap'>
      <div className='ak_contents'>
        <Box style={{ backgroundColor: 'white', padding: '15px', }}>
          <Typography variant="h6" style={{ fontSize: '25px', flexGrow: 1, color: "black" }}>
            장바구니
          </Typography>
          <hr></hr>



  {list.length > 0 ? (
    <>
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
                   </TableCell>
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
                     
                    </TableCell>

                    {/* 이미지 */}
                    <TableCell >
          
                      <img src={product.image_url} style={{ maxWidth: '100px', height: 'auto' }} />
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

              <TableRow style={{ border: '1px solid #ddd', borderRadius: '0', backgroundColor: '#748769' , color: 'white'}}>
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
          

    
        <div>
       
          {/* 다른 주소 정보도 필요하다면 추가하세요 */}
          <TableContainer component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0' }}>
            <Grid container spacing={1}>
              <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#748769' , color: 'white'}}>
                <Typography>배송지 명</Typography>
              </Grid>
              <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {adrlist.map((address) => (
          <div key={address.addressid} style={{ marginRight: '10px', marginBottom: '10px' }}>
            <input
              type="radio"
              name="recipientRadio"
              checked={address.addressid == selectedAddressId}
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

              <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#748769', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white' }}>
                <Typography>받으시는 분</Typography>
              </Grid>
              <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
              {adrlist.find((address) => address.addressid === selectedAddressId)?.recipient}
              <Button   >기본 배송지로 설정</Button>
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

           

              <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#748769', color: 'white' }}>
                <Typography>휴대전화</Typography>
              </Grid>
              <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
              {adrlist.find((address) => address.addressid === selectedAddressId)?.recipient_phone}
              {selectedAddressId === "newAddress" && (
                    <TextField
                        id="input-with-sx"
                        variant="standard"
                        type="text"
                        placeholder="전화번호"
                        name="recipient_phone"
                        value={recipient_phone}
                        onChange={onChange}
                        helperText={
                            selectedAddressId === "newAddress" &&
                            !recipient_phone &&
                            submitted && (
                                <Typography variant="caption" color="error">
                                    받는 사람 전화번호를 입력하세요.
                                </Typography>
                            )
                        }
                    />
                )}
                                              </Grid>
              <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#748769' , color: 'white'}}>
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
              <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#748769', color: 'white' }}>
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
              <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#748769' , color: 'white'}}>
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
              <Grid item xs={3} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px',backgroundColor: '#748769', color: 'white' }}>
                <Typography>배송시 요청사항</Typography>
              </Grid>
              <Grid item xs={9} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px' }}>
 
                                <TextField
                                fullWidth
                                type="text"
                                placeholder="배송시 요청사항"
                                name="request"
                                value={request}
                                onChange={onChange}
                               
                              /> 
              </Grid>

          
            </Grid>



          </TableContainer>


        </div>
    

        
          
          <Button  onClick={onSubmit} style={{ border: '1px solid #ddd', width: '200px', height: '30px', borderRadius: '0', backgroundColor: '#748769', color: 'white', fontSize: '13px', fontWeight: 'bold', textAlign: 'center',marginTop: '10px' }}>배송지 추가</Button>
  
  
          <div style={{ width: '600px', margin: 'auto' }}>
            <TableContainer component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', marginTop: '40px' }}>
    <Grid container spacing={1}>
      <Grid item xs={6} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#748769', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white' }}>
        <Typography>결제방식</Typography>
      </Grid>
      <Grid item xs={6} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <label>
          <input
            type="radio"
            name="card"
            value="kcp"
            checked={card === 'kcp'} // 선택된 값에 따라 checked 상태 설정
            onChange={handlecardradiochange} 
          />
          실시간 계좌이체
        </label>
        <label>
          <input
            type="radio"
            name="card"
            value="danal"
            checked={card === 'danal'} // 선택된 값에 따라 checked 상태 설정
            onChange={handlecardradiochange}
          />
          휴대폰결제
        </label>
        <label>
          <input
            type="radio"
            name="card"
            value="kakaopay"
            checked={card === 'kakaopay'} // 선택된 값에 따라 checked 상태 설정
            onChange={handlecardradiochange} 
          />
          카카오페이
        </label>
      </Grid>
    </Grid>
    <Grid item xs={12} component={Paper} style={{ border: '1px solid #ddd', borderRadius: '0', padding: '10px', backgroundColor: '#748769', color: 'white' }}>
      <Typography>결제예정금액 : {sum} </Typography>
    </Grid>
  </TableContainer>
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <Button onClick={() => orderBtnClick(selectedAddressId)} style={{ border: '1px solid #ddd', width: '300px', height: '50px', borderRadius: '0', backgroundColor: '#748769', color: 'white', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
      {sum}원 결제하기
    </Button>
  </div>
</div>


          </>                   
      ) : (
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          장바구니가 비어 있습니다.

          <Button variant="contained" color="primary" component={Link} to="/">
         쇼핑하러가기
       </Button>
       
        </Typography>
        
      )}

        </Box>
        <Chatbot/>
     
      </div>

      


                
    </div>
  );
};

export default Cart;