import React from 'react';
import RootLayout from '../../layout/RootLayout';
import TopLayout from '../../layout/toppage/TopLayout';



const About = () => {
  return (
    <div className='w-full space-y-12 pb-16'>
      {/* Top section of the page */}

      <TopLayout

        bgImg={"https://images.pexels.com/photos/3829175/pexels-photo-3829175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
        title={"About"} // Title of the page 
      />

      <RootLayout className="space-y-12 w-full pb-16">
        {/* Page content */}
        <div className="w-full flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl text-neutral-800 font-bold">
            Who <span className='text-primary'> We Are</span>
          </h1>
          <p className="text-lg text-neutral-600 font-normal mt-4 px-4">
            Edini is an innovative platform for booking bus and taxi tickets online. We strive to provide a seamless and comfortable travel experience for passengers by offering flexible and secure booking options.
          </p>
          <p className="text-lg text-neutral-600 font-normal mt-4 px-4">
            We believe that travel should be easy and enjoyable, which is why we offer a variety of services that include:
          </p>
        </div>

        {/* Services list */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-4">
          <div className="bg-neutral-200 hover:bg-neutral-300 rounded-xl p-7 flex items-center justify-center flex-col text-center cursor-pointer ease-in-out duration-300">
            <h2 className="text-2xl text-neutral-800 font-bold">Easy Booking</h2>
            <p className="text-sm text-neutral-600 font-normal">
              Book your ticket in just a few simple steps online.
            </p>
          </div>
          <div className="bg-neutral-200 hover:bg-neutral-300 rounded-xl p-7 flex items-center justify-center flex-col text-center cursor-pointer ease-in-out duration-300">
            <h2 className="text-2xl text-neutral-800 font-bold">24/7 Support</h2>
            <p className="text-sm text-neutral-600 font-normal">
              Our support team is available to assist you at any time.
            </p>
          </div>
          <div className="bg-neutral-200 hover:bg-neutral-300 rounded-xl p-7 flex items-center justify-center flex-col text-center cursor-pointer ease-in-out duration-300">
            <h2 className="text-2xl text-neutral-800 font-bold">Secure Payments</h2>
            <p className="text-sm text-neutral-600 font-normal">
              We ensure a safe and smooth payment experience.
            </p>
          </div>
        </div>

        {/* Additional information */}
        <div className="w-full flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl text-neutral-800 font-bold mt-8">
            Why Choose <span className='text-primary'>Edini?</span>
          </h1>
          <p className="text-lg text-neutral-600 font-normal mt-4 px-4">
            We offer you the best prices, multiple options, and a comfortable travel experience. Join us today and enjoy your journey!
          </p>
        </div>
      </RootLayout>
    </div>
  );
};

export default About;