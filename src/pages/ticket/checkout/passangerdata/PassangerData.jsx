import React from 'react'
import Payment from './payment/Payment'



const PassangerData = () => {
    return (
        <div className='w-full col-span-4 py-4 space-y-6'>

            <h1 className='text-xl text-neutral-700 font-semibold '>
                Passenger Information
            </h1>


            <div className="space-y-7">
                <div className="w-full space-y-2">
                    <label htmlFor="fullname" className="text-sm text-neutral-500 font-medium">
                        Full Name
                    </label>
                    <input type="text" placeholder='e.g. Abderrahim Lina'
                        className="w-full h-14 px-4 
                    bg-neutral-100/40 focus:bg-neutral-100/70 border
                    border-neutral-400/50 rounded-xl focus:outline-none
                    focus:border-neutral-400 text-base 
                    text-neutral-600 font-normal
                    placeholder:text-neutral-400" />
                </div>

                <div className="w-full space-y-2">
                    <label htmlFor="email" className="text-sm text-neutral-500 font-medium">
                        Email Address
                    </label>
                    <input type="email" placeholder='e.g. abdlina775@example.com'
                        className="w-full h-14 px-4 
                    bg-neutral-100/40 focus:bg-neutral-100/70 border
                    border-neutral-400/50 rounded-xl focus:outline-none
                    focus:border-neutral-400 text-base 
                    text-neutral-600 font-normal
                    placeholder:text-neutral-400" />
                </div>

                <div className="w-full space-y-2">
                    <label htmlFor="PhoneNumber" className="text-sm text-neutral-500 font-medium">
                        Phone Number
                    </label>
                    <input type="number" placeholder='e.g. +213666666666'
                        className="w-full h-14 px-4 
                    bg-neutral-100/40 focus:bg-neutral-100/70 border
                    border-neutral-400/50 rounded-xl focus:outline-none
                    focus:border-neutral-400 text-base 
                    text-neutral-600 font-normal
                    placeholder:text-neutral-400" />
                </div>

                {/* Payment methode */}
                <Payment />



            </div>

        </div>
    )
}

export default PassangerData