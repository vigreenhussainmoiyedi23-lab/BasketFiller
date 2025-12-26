import React, { useEffect } from 'react'
import axiosInstance from '../utils/AxiosInstance'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/utils/Navbar'
import Footer from '../components/Home/Footer'
import Hero from '../components/Home/hero'
import AboutUs from '../components/Home/aboutUs'
import FeaturedProducts from '../components/Home/FeauturedProducts'
import WhyChooseUs from '../components/Home/WhyChooseUs'
import CategoriesSection from '../components/Home/CategoriesSection'

const Home = () => {
  const navigate = useNavigate()
  async function CanAcces() {
    try {
      const res = await axiosInstance.get('/product')

    } catch (error) {
      const data = error.response.data
      if (data) {
        navigate(data.redirectTo)
      }
    }
  }

  useEffect(() => {
    CanAcces()
  }, [])


  return (
    <>
      <Navbar navigate={navigate} />
      <div className=' w-full overflow-x-hidden  backdrop-blur-[10px] min-h-full max-h-max bg-linear-to-br from-black via-black/97  to-black border border-white/10 rounded-xl'
      >
        <Hero />
        <FeaturedProducts />
        <CategoriesSection />
        <WhyChooseUs />
        <AboutUs />
        <Footer />
      </div>
    </>
  )
}

export default Home
