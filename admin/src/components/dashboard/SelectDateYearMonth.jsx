import React from 'react'

const SelectDateYearMonth = ({ date, setDate, year, setYear, month, setMonth }) => {
    return (
        <div className='flex flex-col items-center flex-wrap justify-center p-2 mt-5'>
            <div className='flex'>
                <h1 className='text-xl p-2 font-bold capitalize text-zinc-950'>
                    Select Year</h1>
                <h1 className='text-xl p-2 font-bold capitalize text-zinc-950'>
                    select Month</h1>
            </div>
            <div >
                <input
                    required
                    className='border-zinc-900 rounded-r-sm rounded-l-2xl border  outline-none text-start bg-sky-100 text-black font-semibold px-5 py-2'
                    type="number" min={2025} max={new Date().getFullYear()} value={year} onChange={(e) => { setYear(e.target.value) }} />

                <input
                    required
                    className='border-zinc-900  rounded-l-sm rounded-r-2xl  border outline-none text-end  bg-sky-100 text-black font-semibold px-5 py-2'
                    type="number" min={1} max={12} value={month} onChange={(e) => { setMonth(e.target.value) }} />
            </div>
        </div>
    )
}

export default SelectDateYearMonth
