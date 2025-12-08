import React, { useState } from 'react'
import Input from '../../components/authentication/input'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/AxiosInstance'

const Login = () => {
const [errorMessage, setErrorMessage] = useState('')
const navigate=useNavigate()
    const [logInDets, setLogInDets] = useState({
        email: '',
        password: ''
    })
  const submitHandler = async (e) => {
  e.preventDefault();
  try {
    const res = await axiosInstance.post("/auth/login", logInDets);

    navigate('/')
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
        style={{backgroundImage:"url('public/images/bg.jpg')"}}>
            <form
                onSubmit={submitHandler}
                className='flex rounded-2xl gap-2 flex-col justify-center items-center shadow shadow-[#11111161] bg-black/20 h-[50%] w-[max(320px,80%)] backdrop-blur-md'>
                <h1 className='text-3xl font-bold font-mono'>Sign In</h1>
                <label className='text-sm mt-2 text-gray-500 font-semibold' htmlFor="email">Email</label>
                <Input name={'email'} onChange={(e) => { setLogInDets({ ...logInDets, email: e.target.value }) }} value={logInDets.email} placeholder={'Enter your email'} />
                <label className='text-sm mt-2 text-gray-500 font-semibold' htmlFor="password">Password</label>
                <Input name={'password'} onChange={(e) => { setLogInDets({ ...logInDets, password: e.target.value }) }} value={logInDets.password} placeholder={'Enter your password'} />
                <input type="submit" className='w-[max(200px,20%)] text-gray-700 py-2 px-5 bg-purple-200 text-xl font-semibold rounded-full' />
    {errorMessage!=''?<p className='font-semibold text-sm text-red-600'>{errorMessage}</p>:''}
           <Link to='/register' >Don't have an Account ? SignUp</Link>
            </form>
        </div>
    )
}

export default Login
