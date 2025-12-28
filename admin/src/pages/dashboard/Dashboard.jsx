
import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/common/Sidebar'
import Navbar from '../../components/common/Navbar'
import axiosInstance from '../../utils/axiosInstance'
import YearlySalesChart from '../../components/dashboard/YearlySalesChart'
import MonthlyDetailChart from '../../components/dashboard/MontlyDetailChart'
import SelectDateYearMonth from '../../components/dashboard/SelectDateYearMonth'
import BestProductShowcase from '../../components/dashboard/BestProductShowcase'



const Dashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(Number(new Date().getMonth() + 1))
  const [date, setDate] = useState(Number(new Date().getDate()))
  const [yearlySalesChart, setYearlySalesChart] = useState(null)
  const [monthlyDetailChart, setMonthlyDetailChart] = useState(null)
  const [productsData, setProductsData] = useState(null)
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
  async function GetProductsData() {
    try {
      const { data } = await axiosInstance.get("/admin/product/graph")
      setProductsData({
        productOfTheDay: data.productOfTheDay,
        productOfTheMonth: data.productOfTheMonth,
        productOfTheYear: data.productOfTheYear}
      )
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    GetChartData()
  }, [month, year])
  useEffect(() => {
    GetProductsData()
  }, [])

  return (
    <div className="flex min-h-screen text-gray-800">
      <Navbar />
      <Sidebar />
      <div className='w-screen min-h-screen h-max  md:w-[calc(100%-256px)] absolute top-[10vh] md:top-0 right-0'>
    <h1 className='text-blue-500 font-semibold text-xl text-center sm:text-2xl lg:text-3xl'>Note From The Creator - <span className='text-green-500 italic font-bold'>Hussain Moiyedi</span> </h1>
    <p className='text-gray-700 font-semibold text-xs sm:text-sm lg:text-xl text-center'>this webpage is just for watching the features that I can build as a full stack devloper for an admin . a Visitor is not allowed for making any changes 🤗. </p>
        <SelectDateYearMonth year={year} setYear={setYear} month={month} setMonth={setMonth} date={date} setDate={setDate} />
        {(!yearlySalesChart || !monthlyDetailChart) ?
          <>Loading essential Items For Charts</> : <>
            <YearlySalesChart data={yearlySalesChart} year={year} />
            <MonthlyDetailChart data={monthlyDetailChart} month={month} year={year} />
          </>
        }
        {(!productsData) ?
          <>Loading essential Items For Charts</> : <BestProductShowcase productOfTheDay={productsData.productOfTheDay} productOfTheMonth={productsData.productOfTheMonth} productOfTheYear={productsData.productOfTheYear}/>
        }
      </div>
    </div>
  )
}

export default Dashboard
