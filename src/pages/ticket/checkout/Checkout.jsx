import React from 'react'
import TopLayout from '../../../layout/toppage/TopLayout'
import RootLayout from '../../../layout/RootLayout'
import busImage from '../../../assets/hero1.png'
import PassangerData from './passangerdata/PassangerData'
import BookingStatus from './bookingstatus/BookingStatus'



const Checkout = () => {
    return (
        <div className='w-full space-y-12 pb-16'>

            {/* Top Layout */}
            <TopLayout
                bgImg={busImage}
                title={"Ckeckout"}
            />

            <RootLayout className="space-y-12 w-full pb-16 ">
                <div className="w-full grid grid-cols-7 items-start gap-44 relative">

                    {/* Passanger detail */}
                   < PassangerData />

                     {/* ticket report status */}
                   <BookingStatus />



                </div>

            </RootLayout>


        </div>
    )
}

export default Checkout