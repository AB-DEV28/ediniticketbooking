import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaBus } from 'react-icons/fa';
import { IoIosRefresh } from 'react-icons/io';
import TicketCard from '../../../components/ticketcard/TicketCard';

const SearchResult = ({ searchParams }) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    from_location: '',
    to_location: '',
    date: ''
  });

  // Update filters when search params change
  useEffect(() => {
    if (searchParams) {
      setFilters(prev => ({
        ...prev,
        from_location: searchParams.from || '',
        to_location: searchParams.to || '',
        date: searchParams.date || ''
      }));
    }
  }, [searchParams]);

  const fetchSchedules = useCallback(() => {
    setLoading(true);
    setError(null);
    const queryParams = new URLSearchParams();
    if (filters.from_location) queryParams.append('from_location', filters.from_location);
    if (filters.to_location) queryParams.append('to_location', filters.to_location);
    if (filters.date) queryParams.append('date', filters.date);
    
    fetch(`http://localhost/ediniticketbooking/src/serveur/api/schedules/list.php?${queryParams}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setSchedules(data.schedules || []);
        } else {
          setError(data.error || 'Failed to fetch schedules');
        }
      })
      .catch(error => {
        console.error('Error fetching schedules:', error);
        setError('Failed to connect to server');
        setSchedules([]);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => {
    fetchSchedules();
    const interval = setInterval(fetchSchedules, 30000);
    return () => clearInterval(interval);
  }, [fetchSchedules]);

  return (
    <div className='w-full col-span-3 space-y-10 pt-11'>
      <motion.h1
        initial={{ opacity: 0, y: -800 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -800 }}
        transition={{ duration: 1.35, ease: "easeOut" }}
        className="text-4xl text-red font-semibold text-center pb-2">
        Available Tickets
      </motion.h1>

      {/* Search filters display */}
      {(filters.from_location || filters.to_location) && (
        <div className="text-center text-gray-600">
          Showing results for: {filters.from_location} to {filters.to_location}
          {filters.date && ` on ${new Date(filters.date).toLocaleDateString()}`}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="text-red text-center py-4">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="text-center py-4">
          Loading schedules...
        </div>
      ) : (
        <div className="space-y-6">
          {schedules.length > 0 ? (
            schedules.map((schedule) => (
              <TicketCard
                key={schedule.schedule_id}
                icon={FaBus}
                busName={schedule.vehicle_number}
                routeFrom={schedule.from_location}
                routeTo={schedule.to_location}
                arrivalTime={new Date(schedule.arrival_time).toLocaleTimeString()}
                departureTime={new Date(schedule.departure_time).toLocaleTimeString()}
                price={schedule.price}
                availableSeats={schedule.available_seats}
                scheduleId={schedule.schedule_id}
              />
            ))
          ) : (
            <div className="text-center py-4">
              No schedules found for this route and date
            </div>
          )}
        </div>
      )}

      <div className="w-full flex items-center justify-end">
        <button 
          onClick={fetchSchedules}
          disabled={loading}
          className="px-6 py-2 bg-red hover:bg-transparent border-2 border-red hover:border-red rounded-xl text-base font-normal text-neutral-50 flex items-center justify-center gap-x-2 hover:text-red ease-in-out duration-300">
          <IoIosRefresh className={loading ? 'animate-spin' : ''} />
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
    </div>
  );
};

export default SearchResult;