import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react';
import { useState } from 'react';
import Slider from '@mui/material/Slider';

const FilterOverlay = ({ tempFilters, setTempFilters }) => {
    const [selected, setSelected] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [priceRange, setPriceRange] = useState([0, 10000])
    const categoury = ['electronics', 'fashion', 'home-appliances', 'books', 'groceries', 'beauty-products', 'toys', 'sports', 'automotive', 'furniture', 'jewelry', 'Other']
    const handleSubmit = () => {
        setTempFilters({
            category: selected,
            sortBy,
            priceRange,
        })
    }
    return (
        <div className='absolute z-10 left-0 top-[20vh] w-[50%] min-w-sm max-w-lg h-[80vh] bg-gray-800/90 backdrop-blur-2xl sm:p-4 p-2 rounded-2xl flex flex-col items-start justify-start flex-wrap gap-4 overflow-x-scroll'>
            <h2 className='text-white text-3xl font-bold'>Filters</h2>
            {/* Categoury */}
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative w-64">
                    <h1>Categoury</h1>
                    <Listbox.Button className="bg-gray-800 text-white rounded-xl w-full py-2 px-3 text-left">
                        {selected || "Select a category"}
                    </Listbox.Button>

                    <Transition as={Fragment}>
                        <Listbox.Options className="absolute mt-1 w-full bg-gray-700 rounded-xl shadow-lg z-50 max-h-50 overflow-y-auto">
                            {categoury.map((cat, idx) => (
                                <Listbox.Option
                                    key={idx}
                                    value={cat}
                                    className={({ active }) =>
                                        `cursor-pointer select-none p-2 ${active ? 'bg-gray-600' : ''}`
                                    }
                                >
                                    {cat}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
            {/* sort BY */}
            <Listbox value={sortBy} onChange={setSortBy}>
                <div className="relative w-64">
                    <h1>Sort By</h1>
                    <Listbox.Button className="bg-gray-800 text-white rounded-xl w-full py-2 px-3 text-left">
                        {sortBy || "Select An Option"}
                    </Listbox.Button>

                    <Transition as={Fragment}>
                        <Listbox.Options className="absolute mt-1 w-full bg-gray-700 rounded-xl shadow-lg z-50">
                            <Listbox.Option
                                value={'lowToHigh'}
                                className={({ active }) =>
                                    `cursor-pointer select-none p-2 ${active ? 'bg-gray-600' : ''}`
                                }>lowToHigh</Listbox.Option>
                            <Listbox.Option
                                value={'highToLow'}
                                className={({ active }) =>
                                    `cursor-pointer select-none p-2 ${active ? 'bg-gray-600' : ''}`
                                }>highToLow</Listbox.Option>
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
            <h1>Price Range</h1>
            <div className="w-full max-w-[280px] sm:max-w-[500px]">
                <Slider
                    value={priceRange}
                    onChange={(event, newValue) => setPriceRange(newValue)}
                    valueLabelDisplay="on"
                    min={0}
                    max={10000}
                />
            </div>
            <button
                onClick={handleSubmit}
                className='w-full max-w-sm sm:scale-100 scale-80 bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600 active:scale-75 rounded-full py-2 px-3'>Apply Filters</button>
        </div>
    )
}

export default FilterOverlay
