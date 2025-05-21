import React from 'react'
import { FaCircleCheck, FaPhone } from 'react-icons/fa6'
import { IoMdCloseCircle } from 'react-icons/io'
import { QRCodeCanvas } from "qrcode.react";
import { FaPhoneAlt } from "react-icons/fa";


const PassengerInvoice = () => {
    return (
        <div className='w-full col-span-4 rounded-3xl relative'>

            {/* top bus details */}
            <div className="w-full flex items-center justify-between bg-primary 
            px-6 py-3 rounded-tl-3xl">

                <div className="flex items-center gap-x-3">
                    <img src="/bus.png" alt="Bus" className="w-auto h-12 object-cover object-center" />

                    <h1 className="text-xl text-neutral-50 font-bold
                    uppercase tracking-wider pt-1">
                        al yamama
                    </h1>
                </div>



                <div className="flex items-center gap-x-2">
                    <p className="text-xl text-neutral-50 font-bold">
                        <span className='text-lg'>
                            (Bus No.)
                        </span>
                        Ba.2kha9704
                    </p>

                </div>

            </div>


            <div className="w-full grid grid-cols-5 gap-8 items-center px-5 
            py-6 mb-6">


                <div className="col-span-4 space-y-3.5">


                    {/* Billno, per seat and date */}
                    <div className="w-full flex items-center justify-between
                border-dashed border-b-2 border-neutral-200 pb-3">

                        <p className="text-base text-neutral-500 font-normal">
                            Bill No.:465
                        </p>

                        <p className="text-base text-neutral-500 font-normal">
                            1600 DA <span className='text-xs'>/seat</span>
                        </p>
                        <p className="text-base text-neutral-500 font-normal">
                            Date: 2025-04-13
                        </p>

                    </div>



                    {/* Passenger detail */}
                    <div className="w-full flex items-center justify-between">
                        <div className="space-y-1 5">
                            <p className="text-base text-neutral-600 font-normal">
                                Name of Passenger: <span className="font-medium">Abderrahim Lina</span>
                            </p>

                            <p className="text-base text-neutral-600 font-normal">
                                Total Seat No: <span className="font-medium">A2, A3, A4, B6</span>
                            </p>

                            <p className="text-base text-neutral-600 font-normal">
                                Total No. of Passenger: <span className="font-medium">04 Only</span>
                            </p>


                            <p className="text-base text-neutral-600 font-normal">
                                Pickup Station: <span className="font-medium">lissm ta3ha m3raf wach</span>
                            </p>

                        </div>

                        <div className="space-y-4 flex items-center justify-center flex-col">
                            <div className="space-y-1 text-center">
                                <p className="text-base text-neutral-600 font-normal">
                                    Total Price
                                </p>
                                <h1 className="text-xl text-neutral-600 font-bold">
                                    1600 DA
                                </h1>
                            </div>


                            <div className="w-fit px-3 py-1  rounded-full bg-green-500/5
                            border border-green-600 text-green-600 
                            text-sm font-medium flex items-center justify-center gap-2">

                                <FaCircleCheck size={16} />
                                <span>
                                    Bill paid
                                </span>
                            </div>



                            {/* <div className="w-fit px-3 py-1  rounded-full bg-primary/5
                            border border-primary text-primary 
                            text-sm font-medium flex items-center justify-center gap-2">

                                <IoMdCloseCircle size={16} />
                                <span>
                                    Pending
                                </span>
                            </div>
                            */}
                        </div>

                    </div>


                    {/* Route detail */}
                    <div className="w-full flex items-center justify-between
                border-dashed border-t-2 border-neutral-200 pt-3">
                        <p className='text-base text-neutral-600 font-normal'>
                            Msila <span className='text-neutral-400 px-2'>-------</span>
                            Alger
                        </p>

                        <p className='text-base text-neutral-600 font-normal'>
                            Arrive at 05:45 PM
                        </p>
                        <p className='text-base text-neutral-600 font-normal'>
                            Departure  at 06:15 PM
                        </p>

                    </div>

                </div>

                <div className="col-span-1 border border-neutral-200 rounded-xl shadow-sm p-1">
                    <div className="col-span-1 border border-neutral-200 rounded-xl shadow-sm p-1 flex items-center justify-center">
                        <QRCodeCanvas
                            value="https://example.com/booking/465"
                            size={128}
                            bgColor="#ffffff"
                            fgColor="#000000"
                            level="H"
                            includeMargin={true}
                            className="rounded-xl"
                        />
                    </div>

                </div>





            </div>
            {/* left botton section */}
            <div className="w-full bg-primary absolute bottom-0 left-0 rounded-bl-3xl
            flex items-center justify-between px-5 py-1.5 ">

                <p className="text-xs text-neutral-100 font-light">
                    Note : 40% change for cancellation price 24 hours
                    of program
                </p>
                <div className="flex items-center gap-x-2">
                    <FaPhoneAlt className='w-3 h-3 text-neutral-100' />
                    <p className="text-sm text-neutral-100 font-light">
                        +213 666666666,+3536666666
                    </p>
                </div>

            </div>

        </div>
    )
}

export default PassengerInvoice