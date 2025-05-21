import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TbArrowsExchange } from 'react-icons/tb'
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value
    });
  };

  const handleExchange = () => {
    setSearchData({
      ...searchData,
      from: searchData.to,
      to: searchData.from
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchData.from || !searchData.to || !searchData.date) {
      alert('Please fill all fields');
      return;
    }

    // Navigate to search results with query parameters
    navigate(`/ticket/searchresult?from=${encodeURIComponent(searchData.from)}&to=${encodeURIComponent(searchData.to)}&date=${encodeURIComponent(searchData.date)}`);
  };

  return (
    <motion.form 
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: -800 }}
      animate={{ opacity: 1, y: 0}}
      exit={{ opacity: 0, y: -800}}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="w-full bg-neutral-50/30 border-2 border-neutral-300 shadow-lg rounded-xl p-3 md:p-5"
    >
      <div className="w-full flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-5 justify-between">
        
        {/* From and To input section */}
        <div className="w-full md:w-[60%] flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-5 relative">
          {/* From */}
          <div className='w-full md:w-1/2 h-12 md:h-14 border border-neutral-300 bg-white/70 text-sm md:text-base text-neutral-700 font-medium px-4 md:px-5 flex items-center gap-x-1 rounded-lg'>
            <input 
              type="text" 
              name="from"
              value={searchData.from}
              onChange={handleInputChange}
              placeholder='From...' 
              className="flex-1 bg-transparent focus:outline-none" 
            />
            <FaMapMarkerAlt className='text-neutral-400' />
          </div>
          
          {/* To */}
          <div className='w-full md:w-1/2 h-12 md:h-14 border border-neutral-300 bg-white/70 text-sm md:text-base text-neutral-700 font-medium px-4 md:px-5 flex items-center gap-x-1 rounded-lg'>
            <input 
              type="text" 
              name="to"
              value={searchData.to}
              onChange={handleInputChange}
              placeholder='To...' 
              className="flex-1 bg-transparent focus:outline-none" 
            />
            <FaMapMarkerAlt className='text-neutral-400' />
          </div>
          
          {/* Exchange button */}
          <button 
            type="button"
            onClick={handleExchange}
            className="absolute w-10 h-10 md:w-11 md:h-11 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center bg-red shadow-md"
          >
            <TbArrowsExchange className='w-5 h-5 md:w-6 md:h-6 text-neutral-50' />
          </button>
        </div>
        
        {/* Date and button section */}
        <div className="w-full md:flex-1 h-12 md:h-14 flex items-center gap-3 md:gap-5">
          {/* Date */}
          <div className='flex-1 h-full border border-neutral-300 bg-white/70 text-sm md:text-base text-neutral-700 font-medium px-4 md:px-5 flex items-center gap-x-1 rounded-lg'>
            <input 
              type="date" 
              name="date"
              value={searchData.date}
              onChange={handleInputChange}
              className="flex-1 bg-transparent focus:outline-none" 
            />
          </div>
          
          {/* Search button */}
          <button 
            type="submit"
            className="w-full md:w-fit px-4 md:px-5 h-full bg-red hover:bg-transparent border-2 border-red hover:border-red rounded-xl text-sm md:text-base font-medium text-neutral-50 flex items-center justify-center gap-x-2 hover:text-red ease-in-out duration-300"
          >
            <FaSearch />  
            Search
          </button>
        </div>
      </div>
    </motion.form>
  )
}

export default Search