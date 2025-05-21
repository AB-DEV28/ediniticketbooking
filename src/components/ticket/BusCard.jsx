import React from 'react';
import { FaBus, FaStar } from 'react-icons/fa';
import { MdOutlineChair } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BusCard = ({
    icon: Icon,
    busName,
    routeFrom,
    routeTo,
    arrivalTime,
    departureTime,
    price,
    availableSeats
}) => {
    return (

        <motion.h1
            initial={{ opacity: 0, y: -800 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -800 }}
            transition={{ duration: 1.35, ease: "easeOut" }}
            className="text-3xl text-red font-semibold py-5 "
            whileHover={{ scale: 1.05 }} // عند تمرير الفأرة، تتكبير البطاقة قليلاً
        >



            <div className='w-full rounded-xl p-5 border-2 border-neutral-300 space-y-5'>

                <div className="space-y-5 w-full border-neutral-300/60 pb-4">



                    {/* Route */}
                    <div className="space-y-5">

                        {/* bus info */}
                        <div className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-x-3">
                                <FaBus className='h-5 w-5 text-red ' />
                                <p className="text-lg text-neutral-700 font-semibold ">

                                    {busName}

                                </p>
                            </div>

                            <div className="flex items-center gap-x-3">

                                <div className="flex items-center gap-x-1 bg-neutral-200/65 rounded-full px-2 py-1">
                                    <FaStar className='w-4 h-4 text-yellow-600 ' />
                                    <p className="text-xs text-yellow-600 font-normal pt-0.5">
                                        4.5
                                    </p>
                                </div>

                                <div className="flex items-center gap-x-1 bg-neutral-200/65 rounded-full px-2 py-1">
                                    <MdOutlineChair className='w-4 h- text-red -rotate-50' />
                                    <p className="text-xs text-neutral-600 font-normal">
                                        {availableSeats} Seats
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Route */}
                        <div className="space-y-4">
                            <div className="w-full flex items-center justify-between gap-x-3">
                                <h1 className='text-2xl text-neutral-600 font-semibold'>
                                    {arrivalTime}
                                </h1>
                                <div className="flex-1 border-dashed border border-neutral-300 relative">
                                    <div className="absolute w-14 h-14 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-50 border-dashed border border-neutral-400 rounded-full flex items-center justify-center">
                                        <Icon className='w-8 h-8 text-red' />
                                    </div>
                                </div>
                                <h1 className='text-2xl text-neutral-600 font-semibold'>
                                    {departureTime}
                                </h1>
                            </div>

                            <div className="w-full flex items-center justify-between gap-x-5">
                                <p className='text-base text-neutral-500 font-normal'>
                                    {routeFrom}
                                </p>
                                <p className='text-base text-neutral-500 font-normal'>
                                    {routeTo}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price, available seats, and reserve Link */}
                <div className="w-full flex items-center justify-between">
                    {/* Price */}
                    <h1 className="text-xl text-neutral-700 font-semibold">
                        Price: {price} <span className='text-sm text-neutral-500 font-normal'>
                            /per Seat
                        </span>
                    </h1>


                    <h1 className="text-sm neutral-600 font-normal flex items-center justify-center gap-x-1.5 ">
                        <span className='text-lg text-green-700 font-bold pt-0.5'>
                            {availableSeats}
                        </span> seats available
                    </h1>



                    <Link to="/ticket/busdetail" className="px-5 py-1.5 bg-red hover:bg-transparent border-2 border-red hover:border-red rounded-xl text-sm font-normal text-neutral-50 flex items-center justify-center gap-x-2 hover:text-red ease-in-out duration-300">
                        Reserve Seat
                    </Link>
                </div>


            </div>
        </motion.h1>
    )
}

export default BusCard;
