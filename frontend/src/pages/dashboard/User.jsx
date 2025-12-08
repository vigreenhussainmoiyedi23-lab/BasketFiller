
import React, { useEffect } from 'react'
import axiosInstance from '../../utils/AxiosInstance'
import { useNavigate } from 'react-router-dom'

const User = () => {
    const navigate=useNavigate()
    async function CanAcces() {
        try {
            const result =await axiosInstance.post('/user')
            if(result.data.redirectTo)navigate(result.data.redirectTo)
            
        } catch (error) {
            const data=error.response.data
            if (data) {
                navigate(data.redirectTo)
            }
        }

   }
   useEffect(() => {
       CanAcces()    
   }, [])
   
    
  return (
    <div>
      hi i am user dashboard
    </div>
  )
}

export default User
