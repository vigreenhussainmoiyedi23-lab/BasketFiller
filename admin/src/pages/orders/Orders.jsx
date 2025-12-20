import React from 'react'
import Navbar from '../../components/common/Navbar'
import Sidebar from '../../components/common/Sidebar'
import OrderContainer from '../../components/orders/OrderContainer'

const Orders = () => {
  return (
    <div className='relative w-screen min-h-screen '>
      <Navbar />
      <Sidebar />
      <div className='md:w-[calc(100%-256px)] bg-cyan-100 px-5 py-3 absolute right-0 md:top-0 top-[10vh] w-full min-h-screen'>
        <h1 className='lg:text-4xl md:text-3xl font-bold text-blue-400 sm:text-2xl text-xl'>Orders</h1>
        <OrderContainer />
      </div>
    </div>
  )
}

export default Orders
