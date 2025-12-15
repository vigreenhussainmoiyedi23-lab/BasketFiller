import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DropDownMenu from '../Home/DropDownMenu'
import axiosInstance from '../../utils/AxiosInstance'
import { ToastContainer, toast, Bounce } from 'react-toastify';
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
            <nav
                className='flex justify-around rounded-b-4xl gap-2 w-full m-auto text-2xl text-white bg-white/5 backdrop-blur-2xl items-center min-h-[10vh] max-h-max py-3 px-10 '>
                <div>
                    <Link to='/' className='text-purple-400 text-2xl sm:text-4xl md:text-5xl font-bold'>BasketFiller</Link>
                </div>
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
                <div className='flex gap-4 justify-center items-center px-4'>
                    <DropDownMenu logoutHandler={logoutHandler} />
                </div>
            </nav>    
        </>
    )
}

export default Navbar
