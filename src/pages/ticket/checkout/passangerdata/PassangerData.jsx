import React from 'react'
import Payment from './payment/Payment'



const PassangerData = () => {
    return (
        <div className='w-full col-span-4 py-4 space-y-6'>

            <h1 className='text-xl text-neutral-700 font-semibold '>
                Passenger Information
            </h1>


            <div className="space-y-7">
           

                {/* Payment methode */}
                <Payment />



            </div>

        </div>
    )
}

export default PassangerData