import React, { useState } from 'react';

import Purchaseitems from './Purchaseitems';
import OrderList from './OrderList';

const OrderPage = () => {

  const userid = sessionStorage.getItem("userid");
  const orderid = "e91b8eb6-24af-404a-b1705309558426"

  return (
    <div className='ak_wrap'>
      <div className='ak_contents'>
        {/* <OrderList orderid={orderid}/>*/}
        <Purchaseitems userid={userid} />
        
      </div>
    </div>
  )
}

export default OrderPage;
