import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'

const CompanyInvoice = ({ bookingData = {}, user }) => {
  const { selectedSeats = [], schedule = {}, totalFare = 0, booking_id } = bookingData;
  const passengerName = user ? `${user.first_name || user.firstName || '-'} ${user.last_name || user.lastName || '-'}` : '-';
  const passengerEmail = user ? user.email || '-' : '-';
  const passengerPhone = user ? user.phone_number || user.phone || '-' : '-';

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
          Bill No.: {booking_id || '-'}
        </p>

        <p className="text-sm text-neutral-600 font-normal">
          Date: {schedule.departure_time ? new Date(schedule.departure_time).toLocaleDateString() : '-'}
        </p>

        <p className="text-sm text-neutral-600 font-normal">
          Name: {passengerName}
        </p>

        <p className="text-sm text-neutral-600 font-normal">
          Email: {passengerEmail}
        </p>

        <p className="text-sm text-neutral-600 font-normal">
          Phone: {passengerPhone}
        </p>

        <p className="text-sm text-neutral-600 font-normal">
          From {schedule.from_location || '-'} <span className='text-xs'>
            ({schedule.vehicle_number || 'Bus/Taxi'})
          </span>
        </p>
        <p className="text-sm text-neutral-600 font-normal">
          To {schedule.to_location || '-'} <span className='text-xs'>
            ({schedule.vehicle_number || 'Bus/Taxi'})
          </span>
        </p>
        <p className="text-sm text-neutral-600 font-normal">
          Dept. Time: {schedule.departure_time ? new Date(schedule.departure_time).toLocaleTimeString() : '-'}
        </p>

        <p className="text-sm text-neutral-600 font-normal">
          Seat No: {selectedSeats && selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}
        </p>

        <p className="text-sm text-neutral-600 font-normal">
          Total Passenger: {selectedSeats && selectedSeats.length > 0 ? selectedSeats.length : '-'}
        </p>

        <p className="text-sm text-neutral-600 font-normal">
          Total Price: {totalFare} DA
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