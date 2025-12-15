import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-center items-center w-full min-h-[90vh] px-4 sm:px-8 md:px-12">

      {/* LEFT SECTION */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left py-10">
        <h1 className="text-gray-100 
                       text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                       font-extrabold leading-tight">
          Everything You Need, 
          All in One <span className="text-purple-400 text-5xl sm:text-6xl md:text-7xl font-extrabold">Basket</span>
        </h1>

        <Link to='/products' className="bg-blue-500 hover:bg-blue-600 transition-all
                           text-xl sm:text-2xl font-bold py-3 px-8 
                           text-gray-100 mt-6 rounded-full shadow-lg">
          Shop Now
        </Link>
      </div>

      {/* RIGHT SECTION (IMAGE) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <img
          src="/images/hero1.avif"
          alt="hero"
          className="w-full max-w-[450px] rounded-xl object-cover shadow-xl"
        />
      </div>

    </div>
  )
}

export default Hero
