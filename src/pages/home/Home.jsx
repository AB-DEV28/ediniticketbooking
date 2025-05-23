import React from 'react'
import Hero from './hero/Hero'
import Services from './services/Services'
import TopSearch from './topsearch/TopSearch'
import { SchedulesProvider } from './schedules/SchedulesProvider'
const Home = () => {
  return (
    <SchedulesProvider>
      <div className='space-y-16 w-full min-h-screen pb-16'>
        {/* hero section */}
        <Hero />
        {/* Services */}
        <Services />
        {/* Top Search */}
        <TopSearch />
      </div>
    </SchedulesProvider>
  )
}

export default Home
















