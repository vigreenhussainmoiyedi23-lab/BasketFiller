import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/AxiosInstance'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/utils/Navbar'
import Footer from '../../components/Home/Footer'

const User = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [show, setShow] = useState("Both")
  async function CanAcces() {
    try {
      const result = await axiosInstance.get('/order/user')
      const userRoute = await axiosInstance.get('/user/profile')
      const orders = result.data.orders
      if (result.data.redirectTo) navigate(result.data.redirectTo)
      // Assuming backend sends user & orders data later
      console.log(orders)
      setUser(userRoute.data.user || { username: 'User', email: 'user@gmail.com', profilePic: '/placeholder-user.jpg' })
      setOrders(orders || [1, 2, 3, 4]) // placeholder orders

    } catch (error) {
      const data = error.response?.data
      if (data?.redirectTo) navigate(data.redirectTo)
    }
  }

  useEffect(() => {
    CanAcces()
  }, [])

  return (<>
    <div className="min-h-screen overflow-x-hidden w-full bg-linear-to-br from-gray-900 via-black to-gray-800 text-white  ">

      <Navbar />
      {/* === Profile Section === */}
      <div className='w-full h-max md:px-20 px-5'>

        <section className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mt-5 md:gap-12 bg-gray-800/50 rounded-2xl p-6 shadow-lg border border-gray-700">

          {/* Profile Picture */}
          <div className="shrink-0">
            <img
              src={user?.profilePic || '/images/placeholder-user.jpg'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover object-center border-4 border-purple-400 shadow-md"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <h1 className="text-3xl font-bold">Hi, {user?.username || "User"} 👋</h1>
            <p className="text-gray-400 mt-1">{user?.email || "user@email.com"}</p>

            <div className="flex gap-3 mt-4">

              <button className="px-5 py-2 bg-purple-500 hover:bg-purple-600 rounded-full font-semibold transition-all">
                <Link to={`/profile/edit/${user?._id}`}>Edit Profile</Link>
              </button>
              <button className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-full font-semibold transition-all">
                <Link to={`/profile/security/${user?._id}`}>Change Password</Link>
              </button>
            </div>
          </div>
        </section>

        {/* === Orders Section === */}
        <section className="mt-10 bg-gray-800/40 rounded-2xl p-6 shadow-md border border-gray-700 mb-10">
          <h2 className="text-2xl font-semibold mb-5 border-b border-gray-700 pb-2">
            Your Orders 🛍️
          </h2>
          {/* Placeholder orders list */}
          <div className="space-y-5 mt-5">
            {orders.map((elem, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row justify-between items-center md:items-center bg-gray-900/60 border border-gray-700 p-5 rounded-xl hover:bg-gray-900/80 transition-all"
              >
                {/* Product details placeholder */}
                <div>
                  <h3>Total Products: 
                    <span className='text-yellow-300 font-bold mx-3'>
                      {elem.order.products.length}
                    </span>
                  </h3>
                  <h3>Date:
                    <span className='text-yellow-300 font-bold mx-3'>
                      {new Date(elem.order.createdAt).toLocaleString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
                    </span>
                  </h3>
                  <h3>Total Amount: 
                    <span className='text-yellow-300 font-bold mx-3'>
                      ₹ {elem.order.totalAmount}
                    </span>
                  </h3>
                </div>

                {/* Order Status placeholder */}
                < div className="mt-3 md:mt-0 flex flex-col items-start md:items-end" >
                  <span className="text-yellow-400 font-semibold">Status: {elem.status}</span>
                  <Link to={`/orders/more/${elem.order.id}`} className="mt-2 px-4 py-1 bg-purple-500 hover:bg-purple-600 rounded-full text-sm font-semibold">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state placeholder */}
          {orders.length === 0 && (
            <p className="text-center text-gray-400 mt-6">No orders found yet.</p>
          )}
        </section >
      </div >

      <Footer />
    </div >
  </>
  )
}

export default User
