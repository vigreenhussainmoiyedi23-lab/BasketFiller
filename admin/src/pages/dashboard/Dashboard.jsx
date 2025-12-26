
import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/common/Sidebar'
import Navbar from '../../components/common/Navbar'
import axiosInstance from '../../utils/axiosInstance'
import YearlySalesChart from '../../components/dashboard/YearlySalesChart'
import MonthlyDetailChart from '../../components/dashboard/MontlyDetailChart'



const Dashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(Number(new Date().getMonth() + 1))
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
  }, [month])
  return (
    <div className="flex min-h-screen text-gray-800">
      <Navbar />
      <Sidebar />
      <div className='w-screen min-h-screen h-max  md:w-[calc(100%-256px)] absolute top-[10vh] md:top-0 right-0'>

        {(!yearlySalesChart || !monthlyDetailChart) ?
          <>Loading essential Items</> : <>
            <div className='flex flex-col items-center justify-center p-2 mt-5'>
              <h1>Select Year</h1>
              <input
                className='border-zinc-800 rounded-4xl bg-gray-200 px-5 py-2'
                type="number" min={2025} max={new Date().getFullYear()} value={year} onChange={(e) => { setYear(e.target.value) }} />
            </div>
            <YearlySalesChart data={yearlySalesChart} year={year} />
            <div className='flex flex-col items-center justify-center p-2 mt-5'>
              <h1>select Month</h1>
              <input
                className='border-zinc-800 rounded-4xl bg-gray-200 px-5 py-2'
                type="number" min={1} max={12} value={month} onChange={(e) => { setMonth(e.target.value) }} />
            </div>

            <MonthlyDetailChart data={monthlyDetailChart} month={month} year={year}/>
          </>
        }
      </div>
    </div>
  )
}

export default Dashboard
