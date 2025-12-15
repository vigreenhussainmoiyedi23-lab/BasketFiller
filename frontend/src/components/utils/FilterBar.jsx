import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react';
import { useState } from 'react'
import FilterOverlay from '../products/FilterOverlay';
import { useEffect } from 'react';

const FilterBar = ({ filters, setFilters }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [tempFilters, setTempFilters] = useState({
        category: '',
        priceRange: [0, Infinity],
        sortBy: '',
        search: ''
    })
useEffect(() => {
    setFilters(tempFilters)
}, [tempFilters])

    const handleFilterClick = () => {
        setIsOpen(prev => !prev)
    }
    return (
        <div
            className='flex justify-around rounded-b-4xl gap-2 w-full m-auto text-2xl text-white items-center min-h-[10vh] max-h-max py-3 px-10 flex-wrap'>
            {isOpen ? <FilterOverlay tempFilters={tempFilters} setTempFilters={setTempFilters} /> : ""}
            <button
                onClick={handleFilterClick}
                className='bg-gray-300 rounded-3xl p-2 text-2xl text-gray-800  font-bold'>
                Filter
            </button>
            <input type="text" placeholder='Search your product over here'
                className='rounded-full text-center  h-full py-2  outline-none bg-gray-500 backdrop-blur-3xl text-white sm:w-[80%] w-full text-sm sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setTempFilters({ ...tempFilters, search: e.target.value });
                    }
                }}
            />
        </div>
    )
}

export default FilterBar
