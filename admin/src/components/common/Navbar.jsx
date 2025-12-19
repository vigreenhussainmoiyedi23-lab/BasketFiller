import React from 'react'
import Sidebar from './Sidebar'
import DropDownMenu from './DropdownMenu'

const Navbar = () => {
  
  return (
    <>
    <div className='md:hidden flex items-center text-2xl h-[10vh] justify-around w-full bg-[#FFFFFF] backdrop-blur-md'>
      <h1 className='max-w-1/2 tracking-tighter h-full flex items-center justify-center'>Admin Panel</h1>
      <DropDownMenu/>
    </div>
    </>
  )
}

export default Navbar
