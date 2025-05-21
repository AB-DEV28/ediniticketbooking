import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import TicketCard from '../../components/ticketcard/TicketCard';

const HomeSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [search, setSearch] = useState({ from: '', to: '', date: '' });
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost/ediniticketbooking/src/serveur/api/schedules/list.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSchedules(data.schedules);
          setFiltered(data.schedules);
        }
        setLoading(false);
      });
  }, []);

  // Filter schedules client-side
  const handleSearch = (e) => {
    e.preventDefault();
    let result = schedules;
    if (search.from) {
      result = result.filter(s => s.from_location.toLowerCase().includes(search.from.toLowerCase()));
    }
    if (search.to) {
      result = result.filter(s => s.to_location.toLowerCase().includes(search.to.toLowerCase()));
    }
    if (search.date) {
      result = result.filter(s => s.departure_time.startsWith(search.date));
    }
    setFiltered(result);
  };

  // Split schedules by type
  const busSchedules = filtered.filter(s => s.vehicle_type === 'bus');
  const taxiSchedules = filtered.filter(s => s.vehicle_type === 'taxi');

  return (
    <div className="w-full space-y-12">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full bg-neutral-50/30 border-2 border-neutral-300 shadow-lg rounded-xl p-3 md:p-5 flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-5 justify-between">
        <input
          type="text"
          name="from"
          value={search.from}
          onChange={e => setSearch({ ...search, from: e.target.value })}
          placeholder="From..."
          className="flex-1 h-12 border border-neutral-300 bg-white/70 text-base text-neutral-700 font-medium px-4 rounded-lg mr-2"
        />
        <input
          type="text"
          name="to"
          value={search.to}
          onChange={e => setSearch({ ...search, to: e.target.value })}
          placeholder="To..."
          className="flex-1 h-12 border border-neutral-300 bg-white/70 text-base text-neutral-700 font-medium px-4 rounded-lg mr-2"
        />
        <input
          type="date"
          name="date"
          value={search.date}
          onChange={e => setSearch({ ...search, date: e.target.value })}
          className="flex-1 h-12 border border-neutral-300 bg-white/70 text-base text-neutral-700 font-medium px-4 rounded-lg mr-2"
        />
        <button type="submit" className="w-full md:w-fit px-4 h-12 bg-red hover:bg-transparent border-2 border-red hover:border-red rounded-xl text-base font-medium text-neutral-50 flex items-center justify-center gap-x-2 hover:text-red ease-in-out duration-300">
          <FaSearch /> Search
        </button>
      </form>

      {/* Bus Schedules Section */}
      <div>
        <h2 className="text-2xl font-bold text-red mb-4">Bus Schedules</h2>
        {loading ? (
          <div>Loading...</div>
        ) : busSchedules.length === 0 ? (
          <div>No bus schedules found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {busSchedules.map(s => (
              <TicketCard
                key={s.schedule_id}
                icon={() => <span role="img" aria-label="bus">🚌</span>}
                busName={s.vehicle_number}
                routeFrom={s.from_location}
                routeTo={s.to_location}
                departureTime={new Date(s.departure_time).toLocaleTimeString()}
                arrivalTime={new Date(s.arrival_time).toLocaleTimeString()}
                price={s.price}
                availableSeats={s.available_seats}
                scheduleId={s.schedule_id}
                vehicleType={s.vehicle_type}
              />
            ))}
          </div>
        )}
      </div>

      {/* Taxi Schedules Section */}
      <div>
        <h2 className="text-2xl font-bold text-red mb-4">Taxi Schedules</h2>
        {loading ? (
          <div>Loading...</div>
        ) : taxiSchedules.length === 0 ? (
          <div>No taxi schedules found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taxiSchedules.map(s => (
              <TicketCard
                key={s.schedule_id}
                icon={() => <span role="img" aria-label="taxi">🚕</span>}
                busName={s.vehicle_number}
                routeFrom={s.from_location}
                routeTo={s.to_location}
                departureTime={new Date(s.departure_time).toLocaleTimeString()}
                arrivalTime={new Date(s.arrival_time).toLocaleTimeString()}
                price={s.price}
                availableSeats={s.available_seats}
                scheduleId={s.schedule_id}
                vehicleType={s.vehicle_type}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeSchedules; 