import React from 'react'

import { NavLink, useNavigate } from 'react-router-dom'

import { Package, PhoneIcon, ShoppingCart, User } from 'lucide-react';
const FootBar = () => {
    return (
        <div className='fixed bottom-0 text-xl text-white sm:text-2xl font-bold py-3 right-0 w-screen max-h-[10vh] h-max bg-black/70 px-2 flex md:hidden z-50 items-center justify-between'>
            <NavLink
                to='/contact'
                className={({ isActive }) => isActive ? ' flex items-center justify-center' : '  flex items-center justify-center  font-semibold text-gray-400'}
            >Contact
                <PhoneIcon />
            </NavLink>
            <NavLink
                to='/products'
                className={({ isActive }) => isActive ? ' flex items-center justify-center' : '  flex items-center justify-center  font-semibold text-gray-400'}
            >Product
            <Package/>
            </NavLink>

           
            <NavLink
                to='/profile'
                className={({ isActive }) => isActive ? ' flex items-center justify-center' : '  flex items-center justify-center  font-semibold text-gray-400'}
            >Profile
                <User />
            </NavLink>
         
        </div>
    )
}

export default FootBar
