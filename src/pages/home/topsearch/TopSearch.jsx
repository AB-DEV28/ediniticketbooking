import React, { useEffect, useState } from 'react';
import RootLayout from '../../../layout/RootLayout';
import TopSearchcard from '../../../components/topsearch/TopSearchcard';

const TopSearch = () => {
  const [busSchedules, setBusSchedules] = useState([]);
  const [taxiSchedules, setTaxiSchedules] = useState([]);

  useEffect(() => {
    // Fetch all schedules from the API
    fetch('http://localhost/ediniticketbooking/src/serveur/api/schedules/list.php')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setBusSchedules(data.schedules.filter(s => s.vehicle_type === 'bus'));
          setTaxiSchedules(data.schedules.filter(s => s.vehicle_type === 'taxi'));
        }
      })
      .catch(error => console.error('Error fetching schedules:', error));
  }, []);

  return (
    <RootLayout className="space-y-16 px-4">
      {/* Bus Section */}
      <section>
        <div className="w-full flex items-center justify-center text-center mb-6">
          <h1 className="text-3xl text-neutral-800 font-bold">
            Top Search Routes <span className="text-red">Bus</span>
          </h1>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {busSchedules.map((schedule) => (
            <TopSearchcard
              key={schedule.schedule_id}
              routeFrom={schedule.from_location}
              routeTo={schedule.to_location}
              timeDuration={schedule.estimated_time || schedule.duration || "4 Hours"}
              price={`${schedule.price} DA`}
              scheduleId={schedule.schedule_id}
              vehicleType={schedule.vehicle_type}
            />
          ))}
        </div>
      </section>

      {/* Taxi Section */}
      <section>
        <div className="w-full flex items-center justify-center text-center mb-6 mt-10">
          <h1 className="text-3xl text-neutral-800 font-bold">
            Top Search Routes <span className="text-red">Taxi</span>
          </h1>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {taxiSchedules.map((schedule) => (
            <TopSearchcard
              key={schedule.schedule_id}
              routeFrom={schedule.from_location}
              routeTo={schedule.to_location}
              timeDuration={schedule.estimated_time || schedule.duration || "4 Hours"}
              price={`${schedule.price} DA`}
              scheduleId={schedule.schedule_id}
              vehicleType={schedule.vehicle_type}
            />
          ))}
        </div>
      </section>
    </RootLayout>
  );
};

export default TopSearch;
