import React, { useState } from 'react'
import TopLayout from '../../layout/toppage/TopLayout'
import RootLayout from '../../layout/RootLayout'
import { motion } from 'framer-motion'
import Search from '../home/hero/search/Search'
import SearchResult from './searchresult/SearchResult'

const Ticket = () => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: ''
  });

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <div className='w-full space-y-12 pb-16'>
      {/* Top Layout */}
      <TopLayout
        bgImg={"https://images.pexels.com/photos/7251524/pexels-photo-7251524.jpeg"}
        title={"Reserve your ticket"}
      />
      <RootLayout className="space-y-12 relative">
        {/* Search section */}
        <div className="space-y-5 w-full bg-neutral-50 flex py-4 items-center justify-center flex-col sticky top-0 z-30">
          <motion.h1
            initial={{ opacity: 0, y: -800 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -800 }}
            transition={{ duration: 1.35, ease: "easeOut" }}
            className="text-4xl text-red font-semibold">
            Want to change the route?
          </motion.h1>
          <Search onSearch={handleSearch} />
          {searchParams.from && searchParams.to && (
            <SearchResult searchParams={searchParams} />
          )}
        </div>
      </RootLayout>
    </div>
  )
}

export default Ticket
