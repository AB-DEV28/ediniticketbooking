import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'

const CompanyInvoice = () => {
  return (
    <div className='w-full col-span-1 border-dashed border-l-2 *
    border-neutral-400 relative'>

      <div className="w-full bg-primary px-4 py-5 tounded-tr-3xl">
        <h1 className="text-2xl text-neutral-50 font-bold text-center">
          Bus Ticket
        </h1>
      </div>

      <div className="w-full px-4 py-7 space-y-1">
        <p className="text-sm text-neutral-600 font-normal">
          Bill No.:456
        </p>

        <p className="text-sm text-neutral-600 font-normal">
          Date: 2025-04-13
        </p>

        <p className="text-sm text-neutral-600 font-normal">
          Name: Abderrahim Lina
        </p>

        <p className="text-sm text-neutral-600 font-normal">
          From Msila <span className='text-xs'>
            (Bus No.)
          </span>
        </p>
        <p className="text-sm text-neutral-600 font-normal">
          To Alger <span className='text-xs'>
            (Bus No.)
          </span>
        </p>
        <p className="text-sm text-neutral-600 font-normal">
          Dept. Time: 06:15 PM
        </p>

        <p className="text-sm text-neutral-600 font-normal">
          Seat No: A2, A3, A4, B6
        </p>

        <p className="text-sm text-neutral-600 font-normal">
          Total Passenger: 04 Only
        </p>

        <p className="text-sm text-neutral-600 font-normal">
          Total Price: 1600 DA
        </p>



      </div>


      {/* right bottom section */}


      <div className="w-full bg-primary absolute bottom-0 right-0 rounded-br-3xl
      flex items-center justify-center 
       px-5 py-1.5 ">

        <div className="flex items-center gap-x-2">
          <FaPhoneAlt className='w-3 h-3 text-neutral-100' />
          <p className="text-sm text-neutral-100 font-light">
            +213 666666666
          </p>

        </div>
      </div>

    </div>


  )
}

export default CompanyInvoice