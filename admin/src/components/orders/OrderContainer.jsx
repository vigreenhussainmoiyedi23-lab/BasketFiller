import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import OrderCard from "./OrderCard";
const OrderContainer = () => {
  const [orderDets, setOrderDets] = useState({
    orderStatus: null,
    paymentStatus: null,
  });
  const [orders, setOrders] = useState([]);
  const getAllOrders = async (e) => {
    try {
      const { data } = await axiosInstance.post("/order", orderDets);
      setOrders(data.orders);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (orderDets.paymentStatus && orderDets.orderStatus) {
            getAllOrders();
          } else {
            alert("Both the things must be picked");
          }
        }}
        className="flex flex-wrap gap-3 mb-4 justify-between w-full h-max px-5 py-2 items-center"
      >
        <div className=" font-bold flex-col capitalize text-xl text-blue-400 w-full md:w-[60%] md:flex-row flex justify-between items-center ">
          <div>
            <h1 className="text-sky-700  ">payment Status</h1>
            <select
            className="outline-none"
              name="paymentStatus"
              value={orderDets.paymentStatus}
              onChange={(e) =>
                setOrderDets({ ...orderDets, paymentStatus: e.target.value })
              }
              required
              id="paymentStatus"
            >
              <option value={null}>select Payment Status</option>
              <option value="paid">paid</option>
              <option value="pending">pending</option>
              <option value="refunded">refunded</option>
            </select>
          </div>
          <div>
            <h1 className="text-sky-700  ">order Status</h1>
            <select
            className="outline-none"

              name="orderStatus"
              value={orderDets.orderStatus}
              onChange={(e) =>
                setOrderDets({ ...orderDets, orderStatus: e.target.value })
              }
              required
              id="orderStatus"
            >
              <option value={null}>select Order Status</option>
              <option value="placed">placed</option>
              <option value="shipped">shipped</option>
              <option value="cancelled">cancelled</option>
              <option value="delivered">delivered</option>
            </select>
          </div>
        </div>
        <button className="bg-sky-300 text-slate-950 rounded-2xl px-3 py-2 font-bold text-center">
          Apply filters
        </button>
      </form>
      {!orders && <>No orders Yet</>}
      {orders.length == 0 && <>No orders Found</>}
      {orders?.length > 0 &&
        orders?.map((n, idx) => {
          return <OrderCard key={idx} order={n} />;
        })}
    </div>
  );
};

export default OrderContainer;
