import React from 'react';
import { Link } from 'react-router-dom';

const TicketCard = ({
  icon: Icon,
  busName,
  routeFrom,
  routeTo,
  departureTime,
  arrivalTime,
  price,
  availableSeats,
  scheduleId,
  vehicleType = 'bus' // Default to bus if not specified
}) => {
  return (
    <div className="w-full bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Icon className="text-2xl text-red" />
          <h3 className="text-lg font-medium text-neutral-700">{busName}</h3>
        </div>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          {availableSeats} seats available
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <p className="text-sm text-neutral-500">From</p>
          <p className="text-base font-medium">{routeFrom}</p>
          <p className="text-sm text-neutral-600">{departureTime}</p>
        </div>
        
        <div className="flex-1 border-t-2 border-dashed mx-4 border-neutral-300" />
        
        <div className="space-y-1 text-right">
          <p className="text-sm text-neutral-500">To</p>
          <p className="text-base font-medium">{routeTo}</p>
          <p className="text-sm text-neutral-600">{arrivalTime}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-2">
        <div className="text-lg font-semibold text-red">
          {price} DA
        </div>
        <Link
          to={`/ticket/${vehicleType === 'taxi' ? 'taxidetail' : 'busdetail'}/${scheduleId}`}
          className="px-6 py-2 bg-red text-white rounded-lg hover:bg-red/90 transition-colors"
        >
          Reserve Seat
        </Link>
      </div>
    </div>
  );
};

export default TicketCard;