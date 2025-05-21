import React from 'react'
import TopLayout from '../../../layout/toppage/TopLayout'
import RootLayout from '../../../layout/RootLayout'
import { Link } from 'react-router-dom'
import Warning from '../../../components/alertmessage/Warning'
import TaxiSeat from './seat/taxiseat/TaxiSeat'
import taxiImage from '../../../assets/hero1.png'
import ToggleBtn from '../../../components/togglebtn/ToggleBtn'
import Amenities from '../busdetail/amenities/Amenities'
import ReservationPolicy from '../busdetail/reservationpolicy/ReservationPolicy'
import TaxiImage from './taxiimage/TaxiImage'

const TaxiDetail = () => {

    // رسالة تحذيرية عند محاولة حجز عدد كبير
    const message = (
        <>
            <Link to={"/support-team"} className='text-yellow-700 font-medium'> Contact our support team.</Link>
        </>
    );

    return (
        <div className='w-full space-y-12 pb-16'>
            {/* خلفية وترويسة الصفحة */}
            <TopLayout
                bgImg={taxiImage} // Update path to the public folder
                title={"Taxi Details"}
            />
            <RootLayout className="space-y-12 w-full pb-16">
                {/* التحذير واختيار المقعد */}
                <div className="w-full space-y-8">

                    {/* رسالة التحذير */}
                    <Warning message={message} />

                    {/* تصميم المقاعد أو تفاصيل الحجز */}
                    <TaxiSeat /> {/* أو أي كومبوننت يعرض خيارات حجز التاكسي */}

                </div>

                {/* معلومات إضافية عن التاكسي */}
                <div className="w-full flex items-center justify-center flex-col gap-8 text-center">
                    {/* هنا ممكن تضيف تفاصيل مثل اسم السائق، نوع السيارة، الخ... */}


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
                    <div className="w-full flex items-center justify-center gap-6 flex-col ">
                        <ToggleBtn
                            buttonText={"See Taxi Details"}
                            buttonTextHidden={"Hide Taxi Details"}
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
                                <TaxiImage />

                            </div>


                        </ToggleBtn>
                    </div>
                </div>
            </RootLayout >
        </div >
    )
}

export default TaxiDetail
