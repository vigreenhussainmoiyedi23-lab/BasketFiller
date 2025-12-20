import React, { useEffect, useState } from 'react'
import  axiosInstance from "../../utils/axiosInstance";
import OrderCard from './OrderCard';
const OrderContainer = () => {
  const [orders, setOrders] = useState([])
const getAllOrders=async ()=>{
try {
  const {data}=await axiosInstance.get("/order")
  setOrders(data.orders)
} catch (err) {
  console.error(err)
}
}
useEffect(() => {
  getAllOrders()
}, [])


if (orders.length==0) {
  return <><h1>No orders Yet</h1></>
}
if (!orders) {
  return <><h1>Loading orders</h1></>
}
  return (
    <div>
      {orders.map((n,idx)=>{return  <OrderCard key={idx} order={n}/>})}
    </div>
  )
}

export default OrderContainer
