import React, { useContext } from 'react'
import RootLayout from '../../../layout/RootLayout';
import { SchedulesContext } from '../schedules/SchedulesProvider';
import HeroSearchBar from './search/HeroSearchBar';
import TopSearchcard from '../../../components/topsearch/TopSearchcard';

const Hero = () => {
    const { filtered, filter } = useContext(SchedulesContext);

    return (
    <div
        className='w-full flex-1 h-screen bg-[url("./assets/hero1.png")] bg-cover bg-no-repeat bg-top relative'
    >
        <RootLayout className="absolute top-0s left-0 w-full h-full py-[6ch] bg-gradient-to-b from-neutral-50/70 via-neutral-50/15 to-neutral-50/5 flex items-center justify-center justify-start text-center flex-col gap-9 ">
            {/* Title section */}
            <div className="space-y-2 mt-[1rem]">
                <p className="text-lg text-white font-medium">Get your bus or taxi ticket now!</p>
                <h1 className="text-5xl text-white font-bold capitalize">Find best bus or taxi for you!</h1>
            </div>
            {/* Search section */}
            <HeroSearchBar />
            {/* Show filtered results if any search is active */}
            {filter.from || filter.to || filter.date ? (
                <div className="w-full mt-8">
                    <h2 className="text-xl text-white font-bold mb-4">Search Results</h2>
                    {filtered.length === 0 ? (
                        <div className="text-white">No schedules found.</div>
                    ) : (
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {filtered.map(schedule => (
                                <TopSearchcard
                                    key={schedule.schedule_id}
                                    routeFrom={schedule.from_location}
                                    routeTo={schedule.to_location}
                                    timeDuration={schedule.duration || schedule.estimated_time || "4 Hours"}
                                    price={`${schedule.price} DA`}
                                    scheduleId={schedule.schedule_id}
                                    vehicleType={schedule.vehicle_type}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ) : null}
        </RootLayout>
    </div>
  )
}

export default Hero