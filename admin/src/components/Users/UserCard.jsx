import React from 'react'

const UserCard = ({ user, banHandler, unBanHandler }) => {
    const totalRevenue = user.Orders.reduce((acc, val) => {
        if (val.order.orderStatus == "cancelled") {
            return acc
        }
        return acc + val.order.totalAmount
    }, 0)
    const CancelledOrders = user.Orders.reduce((acc, val) => {
        if (val.order.orderStatus == "cancelled") {
            return acc + 1
        }
        return acc
    }, 0)
    return (
        <div className='bg-gray-100 p-2 rounded-t-4xl rounded-b-2xl  w-50 h-80 flex flex-col items-center gap-2 overflow-hidden'>
            <img src={user?.profilePic || "/images/placeholder-user.jpg"} alt="profile picture"
                className='h-25 object-center object-cover rounded-full border-2 border-zinc-800 bg-cyan-200'
            />
            <div>
                <h1 className='font-bold text-xl whitespace-nowrap text-blue-700'>{user?.username || "username"}</h1>
                <p className='font-medium text-xs text-gray-600 font-sans'>{user?.email || "Email"}</p>
            </div>
            <div className='flex items-start flex-col gap-2 text-sm'>
                <h3 className='text-green-500 font-semibold flex items-center justify-center'>
                    Total Orders:
                    <span className='text-blue-800 font-bold '>{user?.Orders?.length}</span>
                </h3>
                <h3 className='text-red-500 font-semibold flex items-center justify-center'>
                    Orders Cancelled:
                    <span className='text-red-600 font-bold '>{CancelledOrders}</span>
                </h3>
                <h3 className='text-green-500 font-semibold  flex items-center justify-center'>
                    Total Revenue:
                    <span className='text-blue-800 font-bold '>₹ {totalRevenue}</span>
                </h3>
                <details className='relative'>
                    <summary>
                        User  Orders
                    </summary>
                    <div className='absolute'>
                        {user?.Orders?.length == 0 && <h1>No Orders Yet</h1>}
                        {user?.Orders?.map(order => {
                            return <><h1 className='text-sm text-white font-semibold bg-black/50 backdrop-blur-2xl'>#{order.order._id.slice(-6)}</h1></>
                        })}
                    </div>
                </details>
                {user.isBanned?<>
                <button
                className='text-center active:scale:80 hover:bg-green-500 text-white text-sm md:text-lg px-2 py-1 w-full rounded-2xl bg-green-400'
                onClick={()=>{unBanHandler({id:user._id})}}>Unbann</button>
                </>:<>
                <button
                className='text-center active:scale:80 hover:bg-red-600 text-white text-sm md:text-lg px-2 py-1 w-full rounded-2xl bg-red-500'
                onClick={()=>{banHandler({id:user._id})}}>Ban</button>
                </>}
            </div>
        </div>
    )
}

export default UserCard
