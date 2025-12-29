import React from 'react'

const AboutUs = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center w-full min-h-[90vh] flex-wrap p-5 md:p-10 gap-8">
      
      {/* Left Content */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-5">
        <h1 className="text-purple-400 text-4xl sm:text-5xl md:text-6xl font-bold text-center">
          About Us
        </h1>
        <p className="text-gray-300 text-base sm:text-lg md:text-2xl text-center max-w-3xl">
          <b>BasketFiller</b> was created to make everyday shopping simple.
          We believe that essential items should be easy to find, easy to buy, and easy on your budget.
          From home care to personal care, groceries to small daily-use items — BasketFiller brings all your everyday essentials together in one convenient place.
          Our goal is to deliver fast, affordable, and reliable essentials that fit your lifestyle.
          No stress. No clutter. Just everything you need, all in one basket.
        </p>
      </div>

      {/* Right Placeholder / Image */}
      <div className="w-full md:w-1/2 h-64 md:h-[90vh] flex items-center justify-center">
        {/* You can put an image or illustration here */}
        <div className="w-full h-full bg-gray-700/20 rounded-xl flex items-center justify-center">
          <img className='w-full h-full' src="/images/about1.jpg" alt="BasketFiller Shop" />
        </div>
      </div>
      
    </div>
  )
}

export default AboutUs
