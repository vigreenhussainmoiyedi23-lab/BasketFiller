
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import axiosInstance from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [revenue, setRevenue] = useState({
    daily:0,
    monthly:0,
    yearly:0
  })
  async function GetRevenue() {
    try {
      const result = await axiosInstance.get('/admin/revenue')
      
    } catch (error) {
      const data = error.response.data
      console.log(error)
      if (data) {
        navigate(data.redirectTo)
      }
    }
  }
  GetRevenue()
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <Sidebar />
      
    </div>
  )
}

export default Dashboard
