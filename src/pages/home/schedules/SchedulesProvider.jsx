import React, { createContext, useState, useEffect } from 'react';

export const SchedulesContext = createContext();

export const SchedulesProvider = ({ children }) => {
  const [schedules, setSchedules] = useState([]);
  const [filter, setFilter] = useState({ from: '', to: '', date: '' });
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost/ediniticketbooking/src/serveur/api/schedules/list.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSchedules(data.schedules);
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = schedules;
    if (filter.from) {
      result = result.filter(s => s.from_location.toLowerCase().includes(filter.from.toLowerCase()));
    }
    if (filter.to) {
      result = result.filter(s => s.to_location.toLowerCase().includes(filter.to.toLowerCase()));
    }
    if (filter.date) {
      result = result.filter(s => s.departure_time.startsWith(filter.date));
    }
    setFiltered(result);
  }, [filter, schedules]);

  return (
    <SchedulesContext.Provider value={{ schedules, filtered, filter, setFilter, loading }}>
      {children}
    </SchedulesContext.Provider>
  );
}; 