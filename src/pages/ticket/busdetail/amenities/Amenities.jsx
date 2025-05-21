import React from 'react'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { AiOutlineCloseSquare } from 'react-icons/ai'
const Amenities = () => {
    return (
        <div className='col-span-3 w-full'>
            <div className="w-full space-y-3">
                <h1 className='text-lg text-neutral-600 font-medium text-start'>
                    Amenities
                </h1>



                <div className="w-full grid grid-cols-2 gap-8" >
                    <div className="col-span-1 w-full space-y-1">

                        <div className="flex items-center gap-x-2 w-full">
                            <IoMdCheckboxOutline className='w-5 h-5
                             text-green-500' />
                             <p className="text-base text-neutral-700 font-normal">
                                Super Ac
                             </p>
                        </div>
 
                        <div className="flex items-center gap-x-2 w-full">
                            <IoMdCheckboxOutline className='w-5 h-5
                             text-green-500' />
                             <p className="text-base text-neutral-700 font-normal">
                                Chargin port
                             </p>
                        </div>

                        <div className="flex items-center gap-x-2 w-full">
                            <IoMdCheckboxOutline className='w-5 h-5
                             text-green-500' />
                             <p className="text-base text-neutral-700 font-normal">
                                Ac & Air Supension
                             </p>
                        </div>

                        <div className="flex items-center gap-x-2 w-full">
                            <AiOutlineCloseSquare className='w-5 h-5
                             text-primary' />
                             <p className="text-base text-neutral-700 font-normal">
                                Sleeper Seat
                             </p>
                        </div>

                        <div className="flex items-center gap-x-2 w-full">
                            <AiOutlineCloseSquare className='w-5 h-5
                             text-primary' />
                             <p className="text-base text-neutral-700 font-normal">
                                Snacks
                             </p>
                        </div>

                    </div>

                    <div className="w-full col-span-1">

                    <div className="flex items-center gap-x-2 w-full">
                            <IoMdCheckboxOutline className='w-5 h-5
                             text-green-500' />
                             <p className="text-base text-neutral-700 font-normal">
                             Music or Radio
                             </p>
                        </div>
                        
                        <div className="flex items-center gap-x-2 w-full">
                            <AiOutlineCloseSquare className='w-5 h-5
                             text-primary' />
                             <p className="text-base text-neutral-700 font-normal">
                             Lack of Electronic Systems
                             </p>
                        </div>
 
                        <div className="flex items-center gap-x-2 w-full">
                            <IoMdCheckboxOutline className='w-5 h-5
                             text-green-500' />
                             <p className="text-base text-neutral-700 font-normal">
                             Curtains
                             </p>
                        </div>

                        <div className="flex items-center gap-x-2 w-full">
                            <IoMdCheckboxOutline className='w-5 h-5
                             text-green-500' />
                             <p className="text-base text-neutral-700 font-normal">
                             Random Stops
                             </p>
                        </div>

                        <div className="flex items-center gap-x-2 w-full">
                            <AiOutlineCloseSquare className='w-5 h-5
                             text-primary' />
                             <p className="text-base text-neutral-700 font-normal">
                             Plastic Bags
                             </p>
                        </div>

                        
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Amenities