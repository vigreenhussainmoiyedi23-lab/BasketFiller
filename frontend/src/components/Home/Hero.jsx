import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center items-center w-full min-h-[90vh] px-4 sm:px-8 md:px-12">

      {/* LEFT SECTION */}
      <img
        src="/images/hero1.jpg"
        alt="hero"
        className="w-screen h-screen -z-1 rounded-xl object-center object-cover  shadow-xl absolute top-0 left-0"
      />
      <div
        className="w-full  flex flex-col rounded-4xl overflow-hidden  items-center bg-white/5 backdrop-blur-sm  text-center py-10">
        <h1 className="text-gray-200  p-10
                       text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                       font-extrabold leading-tight z-9">
          Everything You Need,
          <br />
          All in One <span className="text-purple-400 text-5xl sm:text-6xl md:text-7xl font-extrabold">Basket</span>
        </h1>
        <Link to='/products' className="bg-blue-500 z-9 hover:bg-blue-600 transition-all
                           text-xl sm:text-3xl lg:text-4xl 2xl:text-6xl  lg:p-5 lg:font-extrabold tracking-wide  font-bold py-3 px-8 w-[max(40%,200px)]
                           text-gray-50 mt-6 rounded-full shadow-lg">
          Shop Now
        </Link>
      </div>
    </div>
  )
}

export default Hero
