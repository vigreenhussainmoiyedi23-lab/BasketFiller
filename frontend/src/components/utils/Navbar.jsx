import React, { useEffect, useState } from 'react'
import {  NavLink } from 'react-router-dom'
import DropDownMenu from '../Home/DropDownMenu'
import axiosInstance from '../../utils/AxiosInstance'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { PhoneIcon, ShoppingCart, User } from 'lucide-react';
const Navbar = ({ navigate }) => {
    const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight })
    useEffect(() => {
        const resizeHandler = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener("resize", resizeHandler)
        return () => {
            window.removeEventListener("resize", resizeHandler)
        }
    }, [])
    const logoutHandler = async () => {
        try {
            const res = await axiosInstance.get('/auth/logout')
            notify()
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        } catch (error) {

        }

    }
    const notify = () => { toast.success('You are being log out') }
    return (
        <> 
        <ToastContainer
            position="top-left"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="dark"
            transition={Bounce}
        />
            <nav
                className='flex justify-around rounded-b-4xl gap-2 w-full m-auto text-2xl text-white bg-white/5 backdrop-blur-2xl items-center min-h-[10vh] max-h-max py-3 px-10 '>
                <div>
                    <NavLink to='/' className='text-purple-400 text-2xl sm:text-4xl md:text-5xl font-bold'>BasketFiller</NavLink>
                </div>

                <div className='flex gap-4 justify-center items-center px-4'>
                    <DropDownMenu logoutHandler={logoutHandler} />
                    <div className='hidden md:flex gap-4 items-center justify-around w-max '>
                        <NavLink
                        to='/cart'
                            className={({isActive})=>isActive?'md:text-xl lg:text-2xl xl:text-3xl flex items-center justify-center':'md:text-xl lg:text-2xl xl:text-3xl flex items-center justify-center font-semibold text-zinc-200'}
                        >Cart
                            <ShoppingCart />
                        </NavLink>
                        <NavLink
                        to='/products'
                            className={({isActive})=>isActive?'md:text-xl lg:text-2xl xl:text-3xl flex items-center justify-center':'md:text-xl lg:text-2xl xl:text-3xl flex items-center justify-center font-semibold text-zinc-200'}
                        >Product

                        </NavLink>
                        <NavLink
                        to='/profile'
                            className={({isActive})=>isActive?'md:text-xl lg:text-2xl xl:text-3xl flex items-center justify-center':'md:text-xl lg:text-2xl xl:text-3xl flex items-center justify-center font-semibold text-zinc-200'}
                        >Profile
                            <User />
                        </NavLink>
                        <NavLink
                        to='/contact'
                            className={({isActive})=>isActive?'md:text-xl lg:text-2xl xl:text-3xl flex items-center justify-center':'md:text-xl lg:text-2xl xl:text-3xl flex items-center justify-center font-semibold text-zinc-200'}
                        >Contact
                            <PhoneIcon />
                        </NavLink>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
