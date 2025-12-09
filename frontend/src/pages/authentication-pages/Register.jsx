import React, { useEffect, useState } from 'react'
import Input from '../../components/authentication/input'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/AxiosInstance'
import { ToastContainer, toast,Bounce } from 'react-toastify';

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const [logInDets, setLogInDets] = useState({
    email: '',
    password: '',
    username: ''
  })
// If user is logged in he cant access this route
  const CanAuthenticate = async () => {
    try {
      const res = await axiosInstance.post("/auth/register", logInDets);

    } catch (error) {
      console.log(error)
      const data = error.response?.data;
      if (data.redirectTo) navigate(data?.redirectTo)
    }
  }
  useEffect(() => {
    CanAuthenticate()
  }, [])
    const notify=()=>{toast.success('Registered Successfully', {
position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: false,
draggable: true,
progress: undefined,
theme: "dark",
transition:Bounce,
});}

// Handling the Input given by user
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/register", logInDets);
      notify()
      setTimeout(() => {
        
        navigate('/')
      }, 2000);
      // You can redirect or update context here
    } catch (error) {


      const data = error.response?.data;
      if (data?.errors?.[0]?.msg) {
        setErrorMessage(data.errors[0].msg);
      } else if (data?.message) {
        setErrorMessage(data.message);
      } else {
        setErrorMessage("Something went wrong");
      }
    }
  };

  return (
    <div className='w-screen h-screen overflow-hidden bg-center bg-cover text-white/90 flex justify-center items-center'
      style={{ backgroundImage: "url('public/images/bg.jpg')" }}>
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
                transition="ease-in"
            />
      <form
        onSubmit={submitHandler}
        className='flex rounded-2xl gap-2 flex-col justify-center items-center shadow shadow-[#11111161] bg-black/20 h-[50%] w-[max(320px,80%)] backdrop-blur-md'>
        <h1 className='text-3xl font-bold font-mono'>Sign Up</h1>
        <label className='text-sm mt-2 text-gray-500 font-semibold' htmlFor="password">Username</label>
        <Input name={'username'} onChange={(e) => { setLogInDets({ ...logInDets, username: e.target.value }) }} value={logInDets.username} placeholder={'Enter your username'} />
        <label className='text-sm mt-2 text-gray-500 font-semibold' htmlFor="email">Email</label>
        <Input type='email' name={'email'} onChange={(e) => { setLogInDets({ ...logInDets, email: e.target.value }) }} value={logInDets.email} placeholder={'Enter your email'} />
        <label className='text-sm mt-2 text-gray-500 font-semibold' htmlFor="password">Password</label>
        <Input type='password' name={'password'} onChange={(e) => { setLogInDets({ ...logInDets, password: e.target.value }) }} value={logInDets.password} placeholder={'Enter your password'} />
        <input type="submit" className='w-[max(200px,20%)] text-gray-700 py-2 px-5 bg-purple-200 text-xl font-semibold rounded-full' />
        {errorMessage != '' ? <p className='font-semibold text-sm text-red-600'>{errorMessage}</p> : ''}

        <Link to='/login' >Have an Account ? SignIn</Link>
      </form>
    </div>
  )
}

export default Register
