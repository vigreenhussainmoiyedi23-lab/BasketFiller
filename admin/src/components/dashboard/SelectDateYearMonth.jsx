import React from 'react'

const SelectDateYearMonth = ({ date, setDate, year, setYear, month, setMonth }) => {
    return (
        <div className='flex items-center flex-wrap justify-center p-2 mt-5'>
            <div>
                <h1 className='text-xl p-2 font-bold capitalize text-zinc-950'>
                    Select Year</h1>
                <input
                    required
                    className='border-zinc-800 rounded-4xl bg-gray-200 px-5 py-2'
                    type="number" min={2025} max={new Date().getFullYear()} value={year} onChange={(e) => { setYear(e.target.value) }} />
            </div>
            <div>
                <h1 className='text-xl p-2 font-bold capitalize text-zinc-950'>
                    select Month</h1>
                <input
                    required
                    className='border-zinc-800 rounded-4xl bg-gray-200 px-5 py-2'
                    type="number" min={1} max={12} value={month} onChange={(e) => { setMonth(e.target.value) }} />
            </div>
            <div>
                <h1 className='text-xl p-2 font-bold capitalize text-zinc-950'>
                    select Date</h1>
                <input
                    required
                    className='border-zinc-800 rounded-4xl bg-gray-200 px-5 py-2'
                    type="number" min={1} max={new Date(year, month + 1, 0).getDate()} value={date} onChange={(e) => { setDate(e.target.value) }} />
            </div>
        </div>
    )
}

export default SelectDateYearMonth
