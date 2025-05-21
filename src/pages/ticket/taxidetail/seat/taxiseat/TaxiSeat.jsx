import React, { useState, useEffect } from 'react';
import { MdOutlineChair } from 'react-icons/md';
import { GiReceiveMoney } from "react-icons/gi";
import { Link } from 'react-router-dom';

// Sample taxi seat data with 8 seats
const taxiSeatData = [
  { id: 'A1', status: 'available', price: 600 },
  { id: 'A2', status: 'available', price: 600 },
  { id: 'A3', status: 'available', price: 600 },
  { id: 'A4', status: 'available', price: 600 },
  { id: 'B1', status: 'available', price: 600 },
  { id: 'B2', status: 'available', price: 600 },
  { id: 'B3', status: 'available', price: 600 },
  { id: 'B4', status: 'available', price: 600 },
];

const TaxiSeat = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showError, setShowError] = useState(false);

  const handleSeatClick = (seatId) => {
    const selectedSeat = taxiSeatData.find(seat => seat.id === seatId);
    if (selectedSeat.status === 'booked') return;

    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(seat => seat !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const getSeatStyle = (seat) => {
    if (seat.status === 'booked') return 'text-red cursor-not-allowed';
    if (selectedSeats.includes(seat.id)) return 'text-yellow-600 cursor-pointer';
    return 'text-neutral-500 cursor-pointer';
  };

  const totalFare = selectedSeats.reduce((total, id) => {
    const seat = taxiSeatData.find(seat => seat.id === id);
    return total + (seat ? seat.price : 0);
  }, 0);

  return (
    <div className='w-full grid grid-cols-5 gap-10'>
      {/* Seat layout */}
      <div className="col-span-3 w-full flex items-center justify-center shadow-sm rounded-xl p-4 border border-neutral-200">
        <div className="w-full space-y-7">
          <p className="text-base text-neutral-600 font-medium text-center">
            Click on available seats to reserve your seat.
          </p>

          <div className="w-full grid grid-cols-4 gap-8 justify-center">
            {taxiSeatData.map(seat => (
              <div key={seat.id} onClick={() => handleSeatClick(seat.id)} className='flex flex-col items-center'>
                <MdOutlineChair className={`text-4xl ${getSeatStyle(seat)}`} />
                <span className='text-sm font-semibold text-neutral-600'>{seat.id}</span>
              </div>
            ))}
          </div>

          <div className="w-full flex items-center justify-center gap-6 border-t border-neutral-200 pt-5">
            <div className="flex items-center gap-x-2">
              <MdOutlineChair className='text-xl text-neutral-500' />
              <p className='text-sm text-neutral-500 font-medium'>Available</p>
            </div>
            <div className="flex items-center gap-x-2">
              <MdOutlineChair className='text-xl text-red' />
              <p className='text-sm text-neutral-500 font-medium'>Booked</p>
            </div>
            <div className="flex items-center gap-x-2">
              <MdOutlineChair className='text-xl text-yellow-600' />
              <p className='text-sm text-neutral-500 font-medium'>Selected</p>
            </div>
            <div className="flex items-center gap-x-2">
              <GiReceiveMoney className='text-xl text-neutral-500' />
              <p className='text-sm text-neutral-500 font-medium'>600 DA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation Summary */}
      <div className="col-span-2 w-full space-y-5 bg-neutral-50 rounded-xl py-4 px-6 border border-neutral-200 shadow-sm">
        {/* Route info */}
        <div className="w-full space-y-2">
          <div className="w-full flex items-center justify-between">
            <h1 className='text-lg text-neutral-600 font-medium'>Your Destination</h1>
            <Link to={"/taxi"} className='text-sm text-red font-normal'>Change route</Link>
          </div>
          <div className="space-y-0.5 w-full">
            <div className="w-full flex items-center justify-between">
              <p className='text-sm text-neutral-400 font-normal'>From <span className='text-xs'>(Bouira)</span></p>
              <p className='text-sm text-neutral-400 font-normal'>To <span className='text-xs'>(Tizi Ouzou)</span></p>
            </div>
            <div className="w-full flex items-center justify-between gap-x-4">
              <h1 className='text-sm text-neutral-600 font-normal'>Bouira <span className='font-medium'>(07:00 am)</span></h1>
              <div className="flex-1 border-dashed border border-neutral-300" />
              <h1 className='text-sm text-neutral-600 font-normal'>Tizi <span className='font-medium'>(08:00 am)</span></h1>
            </div>
          </div>
        </div>

        {/* Selected Seats */}
        <div className="w-full space-y-2">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-lg text-neutral-600 font-medium">Selected Seats</h1>
            <div className="bg-red/20 rounded-lg py-0.5 px-1.5 text-xs text-neutral-600 font-normal uppercase">Non-refundable</div>
          </div>
          {
            selectedSeats.length > 0
              ? <div className='flex flex-wrap gap-2'>
                {selectedSeats.map((seatId) => (
                  <div key={seatId} className='w-9 h-9 bg-neutral-200/80 rounded-lg flex items-center justify-center text-base text-neutral-700 font-semibold'>
                    {seatId}
                  </div>
                ))}
              </div>
              : <p className='text-sm text-neutral-500 font-normal'>No seat selected</p>
          }
        </div>

        {/* Fare Details */}
        <div className="w-full space-y-2">
          <h1 className="text-lg text-neutral-600 font-medium">Fare Details</h1>
          <div className="w-full flex items-center justify-between border-dashed border-l-[1.5px] border-neutral-400 pl-2">
            <h3 className='text-sm text-neutral-500 font-medium'>Price per seat:</h3>
            <p className='text-sm text-neutral-600 font-medium'>600 DA</p>
          </div>
          <div className="flex items-center justify-between gap-x-4">
            <div className="flex flex-col gap-y-0.5">
              <h3 className='text-base text-neutral-500 font-medium'>Total Price:</h3>
              <span className='text-xs text-neutral-500 font-normal'>(Including all taxes)</span>
            </div>
            <p className='text-base text-neutral-600 font-semibold'>{totalFare} DA</p>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="w-full flex items-center justify-center">
          {
            selectedSeats.length > 0
              ?
              <Link to="/ticket/checkout" className='w-full bg-red hover:bg:red/90 text-sm text-neutral-50 font-normal py-2.5 flex items-center justify-center uppercase rounded-lg transition '>
                processed to Checkout
              </Link>
              :
              <div className=' w-full space-y-0.5'>
                <button to="/ticket/checkout" className='w-full bg-red hover:bg:red/90 text-sm text-neutral-50 font-normal py-2.5 flex items-center justify-center uppercase rounded-lg transition '>
                  processed to Checkout
                </button>
                <small className="text-xs text-neutral-600 font-normal px-1">
                  Please select at least one seat to proceed to checkout page.
                </small>
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default TaxiSeat;
