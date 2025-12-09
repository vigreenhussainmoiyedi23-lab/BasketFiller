import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DropDownMenu from './DropDownMenu'
import axiosInstance from '../../utils/AxiosInstance'
import { ToastContainer, toast,Bounce } from 'react-toastify';
const Navbar = ({navigate}) => {
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
    const notify = ()=>{toast.success('You are being log out')}
    return (
        <nav className='flex justify-between w-screen text-2xl text-white bg-white/5 backdrop-blur-2xl items-center min-h-[10vh] max-h-max py-3 px-5 '>
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

            <div className='flex gap-4 justify-end items-center'>
                {(windowDimensions.width >= '1200') ?
                    <><Link className='min-w-max px-2 flex gap-1 items-center' to='/products'>Products </Link>
                        <Link className='min-w-max px-2 flex gap-1 items-center' to='/cart'>Cart <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
</svg>
</Link>
                        <Link className='min-w-max px-2 flex gap-1 items-center' to='/profile'>Your Profile <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
</Link>
                        <Link className='min-w-max px-2 flex gap-1 items-center' to='/contact'>Contact Us <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
</svg>
</Link>
                        <button
                        onClick={logoutHandler} className='bg-red-500 block capitalize  p-2 rounded-md'>log out</button>
                    </>
                    : <DropDownMenu logoutHandler={logoutHandler} />}

            </div>

        </nav>
    )
}

export default Navbar
