
import React, { useState } from 'react'
import Sidebar from '../components/common/Sidebar'
import Navbar from '../components/common/Navbar'
import axiosInstance from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {


  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <Sidebar />
    </div>
  )
}

export default Dashboard
