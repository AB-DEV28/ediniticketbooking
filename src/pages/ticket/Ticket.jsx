import React, { useContext } from 'react'
import TopLayout from '../../layout/toppage/TopLayout'
import RootLayout from '../../layout/RootLayout'
import HeroSearchBar from '../home/hero/search/HeroSearchBar'
import { SchedulesProvider, SchedulesContext } from '../home/schedules/SchedulesProvider'
import BusCard from '../../components/ticket/BusCard'

const Ticket = () => {
  return (
    <SchedulesProvider>
      <TicketContent />
    </SchedulesProvider>
  )
}

function TicketContent() {
  const { filtered, loading, filter } = useContext(SchedulesContext)
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
          <h1 className="text-4xl text-red font-semibold">
            Want to change the route?
          </h1>
          <HeroSearchBar />
        </div>
        {/* Results section */}
        <div className="w-full flex flex-col items-center justify-center space-y-8">
          {loading ? (
            <div className="text-lg text-neutral-500 py-8">Loading schedules...</div>
          ) : filter.from || filter.to || filter.date ? (
            filtered.length > 0 ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(schedule => (
                  <BusCard
                    key={schedule.schedule_id}
                    icon={() => <span />}
                    busName={schedule.vehicle_number}
                    routeFrom={schedule.from_location}
                    routeTo={schedule.to_location}
                    departureTime={new Date(schedule.departure_time).toLocaleTimeString()}
                    arrivalTime={new Date(schedule.arrival_time).toLocaleTimeString()}
                    price={schedule.price}
                    availableSeats={schedule.available_seats}
                    scheduleId={schedule.schedule_id}
                    vehicleType={schedule.vehicle_type}
                  />
                ))}
              </div>
            ) : (
              <div className="text-lg text-neutral-500 py-8">No schedules found for this route and date.</div>
            )
          ) : null}
        </div>
      </RootLayout>
    </div>
  )
}

export default Ticket
