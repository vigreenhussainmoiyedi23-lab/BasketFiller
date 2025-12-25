
import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/common/Sidebar'
import Navbar from '../../components/common/Navbar'
import axiosInstance from '../../utils/axiosInstance'
import YearlySalesChart from '../../components/dashboard/YearlySalesChart'
import MonthlyDetailChart from '../../components/dashboard/MontlyDetailChart'



const Dashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [yearlySalesChart, setYearlySalesChart] = useState(null)
  const [monthlyDetailChart, setMonthlyDetailChart] = useState(null)
  async function GetChartData() {
    try {
      const res1 = await axiosInstance.post("/admin/revenue/year", { year })
      const res2 = await axiosInstance.post("/admin/revenue/month", { year, month })
      setYearlySalesChart(res1.data.monthlyStats)
      setMonthlyDetailChart(res2.data.DailyStatus)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    GetChartData()
  }, [])

  return (
    <div className="flex min-h-screen text-gray-800">
      <Navbar />
      <Sidebar />
      <div className='w-screen min-h-screen h-max  md:w-[calc(100%-256px)] absolute top-[10vh] md:top-0 right-0'>
        {(!yearlySalesChart || !monthlyDetailChart) ?
          <>Loading essential Items</> : <>
            <YearlySalesChart data={yearlySalesChart} />
            <MonthlyDetailChart data={monthlyDetailChart} />
          </>
        }
      </div>
    </div>
  )
}

export default Dashboard
