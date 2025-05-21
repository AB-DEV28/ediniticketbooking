import React, { useContext, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SchedulesContext } from '../../schedules/SchedulesProvider';

const HeroSearchBar = () => {
  const { setFilter } = useContext(SchedulesContext);
  const [local, setLocal] = useState({ from: '', to: '', date: '' });

  const handleChange = (e) => {
    setLocal({ ...local, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter(local);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-neutral-50/30 border-2 border-neutral-300 shadow-lg rounded-xl p-3 md:p-5 flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-5 justify-between">
      <input
        type="text"
        name="from"
        value={local.from}
        onChange={handleChange}
        placeholder="From..."
        className="flex-1 h-12 border border-neutral-300 bg-white/70 text-base text-neutral-700 font-medium px-4 rounded-lg mr-2"
      />
      <input
        type="text"
        name="to"
        value={local.to}
        onChange={handleChange}
        placeholder="To..."
        className="flex-1 h-12 border border-neutral-300 bg-white/70 text-base text-neutral-700 font-medium px-4 rounded-lg mr-2"
      />
      <input
        type="date"
        name="date"
        value={local.date}
        onChange={handleChange}
        className="flex-1 h-12 border border-neutral-300 bg-white/70 text-base text-neutral-700 font-medium px-4 rounded-lg mr-2"
      />
      <button type="submit" className="w-full md:w-fit px-4 h-12 bg-red hover:bg-transparent border-2 border-red hover:border-red rounded-xl text-base font-medium text-neutral-50 flex items-center justify-center gap-x-2 hover:text-red ease-in-out duration-300">
        <FaSearch /> Search
      </button>
    </form>
  );
};

export default HeroSearchBar; 