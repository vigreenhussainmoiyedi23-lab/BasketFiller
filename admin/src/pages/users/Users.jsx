import React from 'react'
import Navbar from '../../components/common/Navbar'
import Sidebar from '../../components/common/Sidebar'
import UserCard from '../../components/Users/UserCard'
import axiosInstance from '../../utils/axiosInstance'
import { useState } from 'react'
import { useEffect } from 'react'

const Users = () => {
  const [users, setUsers] = useState(null)
  async function GetAllUsers() {
    try {
      const { data } = await axiosInstance.get("/admin/all")
      setUsers(data.users)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    GetAllUsers()
  }, [])

  if (!users) {
    return <>Loading user</>
  }
  return (
    <div className='relative'>
      <Navbar />
      <Sidebar />
      <div className='w-screen absolute  top-[10vh] px-5 py-3  md:top-0 right-0 md:w-[calc(100vw-256px)] min-h-screen'>
          <h1 className='font-bold text-3xl text-sky-500'>All Users</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {users.map(user => {
            return <UserCard user={user} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Users
