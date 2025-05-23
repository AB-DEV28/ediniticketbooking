import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../../services/api';
import { useState } from 'react';

const BookingStatus = ({ bookingData }) => {
    const { selectedSeats = [], schedule = {}, totalFare = 0 } = bookingData || {};
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handlePayAndBook = async () => {
        setLoading(true);
        setError(null);
        try {
            // For demo, use passenger_id = 1
            const bookingPayload = {
                passenger_id: 1,
                schedule_id: schedule.schedule_id,
                seat_list: `{${selectedSeats.join(',')}}`,
                total_amount: totalFare
            };
            const res = await api.createBooking(bookingPayload);
            if (res.success) {
                // Pass all booking info to payment page
                navigate('/ticket/payment', {
                    state: {
                        ...bookingData,
                        booking_id: res.booking_id,
                        payment_status: 'paid',
                    }
                });
            } else {
                setError(res.error || 'Booking failed.');
            }
        } catch (e) {
            setError('Booking failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full col-span-3 sticky top-20 space-y-7'>
            <div className="w-full gb-neutral-50 rounded-xl py-4 px-6 border border-neutral-200 shadow-sm space-y-5">
                <h1 className="text-lg text-neutral-700 font-bold text-center border-b border-neutral-200 pb-4">
                    Your Ticket Report Status
                </h1>
                <div className="space-y-5">
                    <div className="space-y-2 w-full">
                        <h1 className="text-base text-neutral-700 font-medium">
                            Your Destination
                        </h1>


                        <div className="space-y-0.5 w-full">
                            <div className="w-full flex items-center
                             justify-between gap-x-5">
                                <p className='text-sm text-neutral-400 font-normal'>
                                    From <span className='text-xs'>
                                        {schedule.from_location || '-'}
                                    </span>
                                </p>

                                <p className='text-sm text-neutral-400 font-normal'>
                                    To <span className='text-xs'>
                                        {schedule.to_location || '-'}
                                    </span>
                                </p>
                            </div>


                            <div className="w-full flex items-center
                             justify-between gap-x-4">
                                <h1 className='text-sm text-neutral-600 font-normal'>
                                    {schedule.from_location || '-'} <span className='font-medium'>({schedule.departure_time ? new Date(schedule.departure_time).toLocaleTimeString() : '-'})</span>
                                </h1>

                                <div className="flex-1 border-dashed border border-neutral-300 " />

                                <h1 className='text-sm text-neutral-600 font-normal'>
                                    {schedule.to_location || '-'} <span className='font-medium'>({schedule.arrival_time ? new Date(schedule.arrival_time).toLocaleTimeString() : '-'})</span>
                                </h1>


                            </div>


                            {schedule.vehicle_number && (
                              <div className="w-full flex items-center justify-between gap-x-4 !mt1.5">
                                  <h1 className="text-sm text-neutral-600 font-normal">
                                      Vehicle No. :
                                  </h1>
                                  <h1 className="text-base text-neutral-700 font-medium">
                                      {schedule.vehicle_number}
                                  </h1>
                              </div>
                            )}
                        </div>


                    </div>



                    <div className="space-y-2 w-full">
                        <h1 className="text-base text-neutral-700 font-medium">
                            Your Seats
                        </h1>

                        <div className='w-full flex items-center gap-x-3 flex-wrap'>
                          {selectedSeats.length > 0 ? (
                            selectedSeats.map((seatId) => (
                              <div key={seatId} className='w-9 h-9 bg-neutral-200/80 rounded-lg flex items-center justify-center text-base text-neutral-700 font-semibold'>
                                {seatId}
                              </div>
                            ))
                          ) : (
                            <span className='text-sm text-neutral-500'>No seat selected</span>
                          )}
                        </div>
                    </div>

                    <div className="space-y-2 w-full">
                        <h1 className="text-base text-neutral-700 font-medium">
                            Total Fare Price
                        </h1>
                        <div className="flex items-center justify-between gap-x-4">
                            <div className="flex gap-y-0.5 flex-col">
                                <h3 className='text-base text-neutral-500 font-medium'>Total Price:</h3>
                                <span className='text-xs text-neutral-500 font-normal'>
                                    (Including all taxes)
                                </span>

                            </div>

                            {/* Calculate the total price */}
                            <p className='text-base text-neutral-600 font-semibold'>
                                DA {totalFare}
                            </p>


                        </div>

                    </div>






                </div>
            </div>


            <div className="w-full px-1.5">
                <button
                  onClick={handlePayAndBook}
                  disabled={loading}
                  className='w-full bg-red hover:bg:red/90 text-sm text-neutral-50 font-normal py-2.5 flex items-center justify-center uppercase rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed'
                >
                  {loading ? 'Processing...' : 'processed to Pay'}
                  <FaArrowRightLong className='ml-2' />
                </button>
                {error && <div className='text-red-600 text-sm mt-2'>{error}</div>}
            </div>


        </div>
    )
}

export default BookingStatus
