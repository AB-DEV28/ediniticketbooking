import React, { useEffect, useState, useMemo } from 'react';
import { GiSteeringWheel } from 'react-icons/gi'
import { MdOutlineChair } from 'react-icons/md';
import { GiReceiveMoney } from "react-icons/gi";
import { useNavigate, Link } from 'react-router-dom';
import ErrorMessage from '../../../../../components/alertmessage/errormsg/ErrorMessage';

//هنا لازم نعاود نفهم مليح منيش فاهمة مليح

const BusSeat = ({ bookings, schedule }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showError, setShowError] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [apiError, setApiError] = useState(null);
    const navigate = useNavigate();

    // Get all reserved seats for this schedule
    const reservedSeats = useMemo(() => {
        const reserved = new Set();
        bookings.forEach(booking => {
            let seatStr = booking.seat_list || booking.seat_numbers;
            if (seatStr) {
                seatStr.replace(/[{}\]]/g, '').split(',').forEach(s => {
                    if (s.trim()) reserved.add(s.trim());
                });
            }
        });
        return reserved;
    }, [bookings]);

    // Generate seat data dynamically based on schedule.total_seats (or fallback to 40)
    const totalSeats = schedule && schedule.total_seats ? Number(schedule.total_seats) : 40;
    const seatData = useMemo(() => {
        // Generate seat IDs as 1, 2, 3, ... N
        return Array.from({ length: totalSeats }, (_, i) => {
            const seatId = (i + 1).toString();
            return {
                id: seatId,
                status: reservedSeats.has(seatId) ? 'booked' : 'available',
            };
        });
    }, [reservedSeats, totalSeats]);

    //toggle seat selection
    const handleSeatClick = (seatId) => {
        const selectedSeat = seatData.find((seat) => seat.id === seatId);
        if (selectedSeat.status === 'booked') {
            return;
        }
        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seatId)) {
                return prevSelectedSeats.filter((seat) => seat !== seatId);
            } else {
                if (prevSelectedSeats.length >= 10) {
                    setShowError(true);
                    return prevSelectedSeats;
                } else {
                    return [...prevSelectedSeats, seatId];
                }
            }
        })
    };

    //hide the error message after 10 seconds 
    useEffect(() => {
        if (showError) {
            const timer = setTimeout(() => {
                setShowError(false);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [showError]);

    //function to determin seat class or seat name on status 
    const getSeatName = (seat) => {
        if (seat.status === 'booked') {
            return 'text-red cursor-not-allowed'
        } if (selectedSeats.includes(seat.id)) {
            return 'text-yellow-600 cursor-pointer'
        }
        return 'text-neutral-500 cursor-pointer'
    };

    // Calculate total price
    const totalPrice = schedule && schedule.price
        ? selectedSeats.length * Number(schedule.price)
        : 0;

    // Handle checkout: pass booking data to /ticket/checkout
    const handleCheckout = () => {
        setProcessing(true);
        setApiError(null);
        try {
            navigate('/ticket/checkout', {
                state: {
                    selectedSeats,
                    schedule,
                    totalFare: totalPrice
                }
            });
        } catch {
            setApiError('Navigation failed.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className='w-full grid grid-cols-5 gap-10'>
            {/* Seat layout*/}
            <div className="col-span-3 w-full flex items-center justify-center shadow-sm rounded-xl p-4 border border-neutral-200">
                <div className="w-full space-y-7">
                    <p className="text-base text-neutral-600 font-medium text-center">
                        Click on available seats to reserve your seat.
                    </p>
                    {/* Seat layout*/}
                    <div className="w-full flex items-stretch gap-x-1.5">
                        <div className="w-10 h-fit">
                            <GiSteeringWheel className='text-3xl mt-7 text-red -rotate-90' />
                        </div>
                        {/* Seat rows */}
                        <div className="flex flex-col items-center border-l-2 border-dashed border-neutral-300 pl-7">
                            <div className="flex-1 space-y-5">
                                {/* Dynamic seat rows based on total_seats */}
                                {(() => {
                                    const total = seatData.length;
                                    const rows = [[], [], [], [], []];
                                    if (total === 0) return rows.map((_, idx) => <div key={idx} className="h-10" />);
                                    if (total % 2 === 0) {
                                        // Even: 3rd row empty
                                        const perRow = Math.floor(total / 4);
                                        let remainder = total % 4;
                                        let seatIdx = 0;
                                        for (let r = 0; r < 5; r++) {
                                            if (r === 2) continue; // skip row 3
                                            let count = perRow + (remainder > 0 ? 1 : 0);
                                            remainder = Math.max(0, remainder - 1);
                                            rows[r] = seatData.slice(seatIdx, seatIdx + count);
                                            seatIdx += count;
                                        }
                                    } else {
                                        // Odd: 3rd row gets last seat
                                        const perRow = Math.floor((total - 1) / 4);
                                        let remainder = (total - 1) % 4;
                                        let seatIdx = 0;
                                        for (let r = 0; r < 5; r++) {
                                            if (r === 2) {
                                                // 3rd row gets last seat
                                                rows[r] = [seatData[total - 1]];
                                            } else {
                                                let count = perRow + (remainder > 0 ? 1 : 0);
                                                remainder = Math.max(0, remainder - 1);
                                                rows[r] = seatData.slice(seatIdx, seatIdx + count);
                                                seatIdx += count;
                                            }
                                        }
                                    }
                                    // Find the max row length
                                    const maxCols = Math.max(...rows.map(r => r.length));
                                    return rows.map((row, idx) => (
                                        <div key={idx} className="w-full h-auto flex flex-row gap-x-5 justify-end">
                                            {row.map((seat) => (
                                                <div
                                                    key={seat.id}
                                                    className='flex items-center gap-x-0'
                                                    onClick={() => handleSeatClick(seat.id)}>
                                                    <h6 className='text-base text-neutral-600 font-bold'>
                                                        {seat.id}
                                                    </h6>
                                                    <MdOutlineChair className={`text-3xl -rotate-90 ${getSeatName(seat)}`} />
                                                </div>
                                            ))}
                                            {/* Fill empty columns for alignment */}
                                            {Array.from({ length: maxCols - row.length }).map((_, i) => (
                                                <div key={`empty-${i}`} style={{ visibility: 'hidden' }} className='flex items-center gap-x-0'>
                                                    <h6 className='text-base'>-</h6>
                                                    <MdOutlineChair className='text-3xl' />
                                                </div>
                                            ))}
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>
                    </div>
                    {/* reservation info */}
                    <div className="w-full flex items-center justify-center gap-6 border-t border-neutral-200 pt-5">
                        <div className="flex items-center gap-x-2">
                            <MdOutlineChair className='text-cl text-neutral-500 -rotate-90' />
                            <p className='text-sm text-neutral-500 font-medium'>
                                Available
                            </p>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <MdOutlineChair className='text-xl text-red -rotate-90' />
                            <p className='text-sm text-neutral-500 font-medium'>
                                Booked
                            </p>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <MdOutlineChair className='text-xl text-yellow-600 -rotate-90' />
                            <p className='text-sm text-neutral-500 font-medium'>
                                Selected
                            </p>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <GiReceiveMoney className='text-xl text-neutral-500' />
                            <p className='text-sm text-neutral-500 font-medium'>
                                {schedule.price} DA
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Seat selection action */}
            <div className="col-span-2 w-full space-y-5 bg-neutral-50 rounded-xl py-4 px-6 border border-neutral-200 shadow-sm">

                <div className="w-full space-y-2">
                    <div className="w-full flex items-center justify-between">
                        <h1 className='text-lg text-neutral-600 font-medium'>
                            Your Destination
                        </h1>
                        <Link to={"/ticket"} className='text-sm text-red font-normal'>
                            Change route
                        </Link>
                    </div>
                    <div className="space-y-0.5 w-full">
                        <div className="w-full flex items-center justify-between gap-x-5">
                            <p className='text-sm text-neutral-400 font-normal'>
                                From <span className='text-xs'>{schedule ? schedule.from_location : '-'}</span>
                            </p>
                            <p className='text-sm text-neutral-400 font-normal'>
                                To <span className='text-xs'>{schedule ? schedule.to_location : '-'}</span>
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-between gap-x-4">
                            <h1 className='text-sm text-neutral-600 font-normal'>
                                {schedule ? schedule.from_location : '-'} <span className='font-medium'>({schedule ? new Date(schedule.departure_time).toLocaleTimeString() : '-'})</span>
                            </h1>
                            <div className="flex-1 border-dashed border border-neutral-300 " />
                            <h1 className='text-sm text-neutral-600 font-normal'>
                                {schedule ? schedule.to_location : '-'} <span className='font-medium'>({schedule ? new Date(schedule.arrival_time).toLocaleTimeString() : '-'})</span>
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="w-full space-y-2">
                    <div className="w-full flex items-center justify-between">
                        <h1 className="text-lg text-neutral-600 font-medium">
                            Selected Seats
                        </h1>
                        <div className="bg-red/20 rounded-lg py-0.5 px-1.5 text-xs text-neutral-600 font-normal uppercase">
                            Non-refundable</div>
                    </div>
                    {selectedSeats.length > 0
                        ? <div className='w-full flex items-center gap-x-3'>
                            {selectedSeats.map((seatId) => (
                                <div key={seatId} className='w-9 h-9 bg-neutral-200/80 rounded-lg flex items-center justify-center text-base text-neutral-700 font-semibold'>
                                    {seatId}
                                </div>
                            ))}
                        </div>
                        : <div className='w-full flex items-center gap-x-3'>
                            <p className='text-sm text-neutral-500 font-normal'>No seat selected</p>
                        </div>
                    }
                </div>
                <div className="w-full space-y-2">
                    <h1 className="text-lg text-neutral-600 font-medium">
                        Fare Details
                    </h1>
                    <div className="w-full flex items-center justify-between border-dashed border-l-[1.5px] border-neutral-400 pl-2">
                        <h3 className='text-sm text-neutral-500 font-medium'>Basic Fare:</h3>
                        <p className='text-sm text-neutral-600 font-medium'>{schedule.price} DA</p>
                    </div>
                    <div className="flex items-center justify-between gap-x-4">
                        <div className="flex gap-y-0.5 flex-col">
                            <h3 className='text-base text-neutral-500 font-medium'>Total Price:</h3>
                            <span className='text-xs text-neutral-500 font-normal'>(Including all taxes)</span>
                        </div>
                        <p className='text-base text-neutral-600 font-semibold'>{totalPrice} DA</p>
                    </div>
                </div>
                {/* Checkout Button */}
                <div className="w-full flex items-center justify-center">
                    {selectedSeats.length > 0
                        ? <button
                            className={`w-full bg-red hover:bg:red/90 text-sm text-neutral-50 font-normal py-2.5 flex items-center justify-center uppercase rounded-lg transition ${processing ? 'opacity-60 cursor-not-allowed' : ''}`}
                            onClick={handleCheckout}
                            disabled={processing}
                        >
                            {processing ? 'Processing...' : 'Proceed to Checkout'}
                        </button>
                        : <div className=' w-full space-y-0.5'>
                            <button className='w-full bg-red hover:bg:red/90 text-sm text-neutral-50 font-normal py-2.5 flex items-center justify-center uppercase rounded-lg transition ' disabled>
                                Proceed to Checkout
                            </button>
                            <small className="text-xs text-neutral-600 font-normal px-1">
                                Please select at least one seat to proceed to checkout page.
                            </small>
                        </div>
                    }
                </div>
                {apiError && <ErrorMessage message={apiError} />}
            </div>
            {/* Show the errormessage if more than 10 seats are selected */}
            {showError && <ErrorMessage message="You can't select more than 10 seats!" />}
        </div>
    )
}

export default BusSeat