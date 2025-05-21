import React from 'react'
import TopLayout from '../../../layout/toppage/TopLayout'
import RootLayout from '../../../layout/RootLayout'
import { Link } from 'react-router-dom'
import Warning from '../../../components/alertmessage/Warning'
import BusSeat from './seat/busseat/BusSeat'
import busImage from '../../../assets/hero1.png'
import ToggleBtn from '../../../components/togglebtn/ToggleBtn'
import Amenities from './amenities/Amenities'
import ReservationPolicy from './reservationpolicy/ReservationPolicy'
import BusImage from './busimage/BusImage'

const BusDetail = () => {

    // show the warning message box
    const message = (
        <>
            One individual only can book 10 seats. if you want to book more than 10 seats,
            please <Link to={"/support-team"} className='text-yellow-700 font-medium'>Contact our support team.</Link>
        </>
    );


    return (
        <div className='w-full space-y-12 pb-16'>
            {/* Top Layout */}
            <TopLayout
                bgImg={busImage}
                title={"Bus Details"}
            />

            <RootLayout className="space-y-12 w-full pb-16 ">
                {/* seat layout and selection detail */}
                <div className="w-full space-y-8">

                    {/*warning Message */}
                    <Warning message={message} />


                    {/*Seat Layout */}

                    <BusSeat />

                </div>

                {/* bus detail */}

                <div className="w-full flex items-center justify-center flex-col gap-8 text-center">

                    {/* short description about the bus  */}

                    <p className="text-sm text-neutral-500 font-normal text-justify">
                        this is just a sample text for the demo purpose.
                        Lorem ipsum  dolor sit amet consectetur adipisicing elit.
                        Provident quae repudinandae eum unde,  dolor
                        dignissimos consectetur sequi recusandae minima nisi voluptatem eius,
                        ex maxime quibusdam animi, voluptas
                        rem cumque ! At!Provident quae repudinandae eum unde,  dolor
                        dignissimos consectetur sequi recusandae minima nisi voluptatem eius,
                        ex maxime quibusdam
                        <span className="text-lg text-neutral-600 font-medium ml-2">
                            want to see more about the bus?
                        </span>
                    </p>

                    {/* Button */}
                    <div className="w-full flex items-center justify-center gap-6 flex-col">
                        <ToggleBtn
                            buttonText={"See Bus Details"}
                            buttonTextHidden={"Hide Bus Details"}
                        >

                            <div className="w-full space-y-10">
                                {/* reservation policy and amenities */}
                                <div className="w-full grid grid-cols-7 gap-20">

                                    {/* Amenities */}
                                    <Amenities />

                                    {/* Reservation policy */}
                                    <ReservationPolicy />


                                </div>

                                {/* bus images */}
                                < BusImage />
                            </div>


                        </ToggleBtn>
                    </div>

                </div>
            </RootLayout >
        </div >

    )
}

export default BusDetail