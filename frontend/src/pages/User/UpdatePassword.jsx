import React, { useState, useEffect } from 'react';
import Input from '../../components/authentication/input';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/AxiosInstance';

const UpdateProfile = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [updateDets, setUpdateDets] = useState({
        oldPassword: '',
        newPassword: ''
    })
    // 🧩 Fetch current user
    const CanAccess = async () => {
        try {
            const res = await axiosInstance.get('/user/profile');
            setUser(res.data.user);
        } catch (error) {
            const data = error.response?.data;
            if (data?.redirectTo) navigate(data.redirectTo);
        }
    };

    useEffect(() => {
        CanAccess();
    }, []);


    // Handle form submit
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(updateDets)
        try {
            const res = await axiosInstance.post(`/user/profile/security/${user?._id}`, updateDets, Headers = { 'Content-Type': 'application/json' });
            navigate('/profile')
        } catch (error) {
            const data = error.response?.data;
            if (data?.errors?.[0]?.msg) {
                setErrorMessage(data.errors[0].msg);
            } else if (data?.message) {
                setErrorMessage(data.message);
            } else {
                setErrorMessage('Something went wrong.');
            }
        }
    };

    return (
        <div
            className="w-screen h-screen overflow-hidden bg-center bg-cover text-white/90 flex justify-center items-center"
            style={{ backgroundImage: "url('/images/bg.jpg')" }}
        >
            <form
                onSubmit={submitHandler}
                className="flex rounded-2xl gap-2 flex-col justify-center items-center shadow shadow-[#11111161] bg-black/20 h-[50%] w-[max(320px,80%)] backdrop-blur-md"
            >
                <h1 className="sm:text-2xl md:text-3xl text-xl font-bold font-mono">Update Profile Picture</h1>

                <label className="text-sm mt-2 text-gray-500 font-semibold" htmlFor="username">
                    Username
                </label>
                <Input
                    name="oldPassword"
                    className='sm:scale-100 scale-75'
                    onChange={(e) => setUpdateDets({ ...updateDets, oldPassword: e.target.value })}
                    value={updateDets.oldPassword}
                    placeholder="Your Current Password"
                />

                <label className="text-sm mt-2 text-gray-500 font-semibold" htmlFor="profilePic">
                    Profile Picture
                </label>
                <Input
                    name="newPassword"
                    className='sm:scale-100 scale-75'
                    onChange={(e) => setUpdateDets({ ...updateDets, newPassword: e.target.value })}
                    value={updateDets.newPassword}
                    placeholder='Enter New Password'
                />
                <div className='w-full h-max flex items-center justify-evenly '>

                    <button
                        type="submit"
                        
                        className="w-[max(200px,20%)] sm:scale-100 scale-75 text-gray-700 py-2 px-5 bg-purple-200 text-xl font-semibold rounded-full"
                    >
                        Update
                    </button>
                    <button
                        onClick={(e) => {e.preventDefault(); navigate('/profile') }}
                        className="w-[max(200px,20%)] sm:scale-100 scale-75 text-gray-700 py-2 px-5 bg-purple-200 text-xl font-semibold rounded-full"
                    >
                        Go back
                    </button>
                </div>

                {errorMessage && <p className="font-semibold text-sm text-red-600">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default UpdateProfile;
