import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTicketAlt } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import TopLayout from '../../../layout/toppage/TopLayout';
import RootLayout from '../../../layout/RootLayout';


const TicketRefund = () => {
  const [bookingId, setBookingId] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookingId.trim() && reason.trim()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      }, 2000);
    }
  };

  return (
    <div className="w-full space-y-12 pb-16">
      {/* Header with image */}
      <TopLayout
        bgImg="https://images.pexels.com/photos/7251087/pexels-photo-7251087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        title="Refund your ticket"
      />

      <RootLayout className="relative space-y-10">
        {/* Decorative background icons */}
        {[
          { top: '5%', left: '15%' },
          { top: '18%', left: '70%' },
          { top: '30%', left: '10%' },
          { top: '42%', left: '80%' },
          { top: '50%', left: '25%' },
          { top: '63%', left: '65%' },
          { top: '75%', left: '5%' },
          { top: '82%', left: '50%' },
          { top: '88%', left: '85%' },
          { top: '95%', left: '30%' },
        ].map((pos, i) => (
          <FaTicketAlt
            key={i}
            className="absolute text-red/20 text-[40px] md:text-[50px] lg:text-[60px] rotate-[12deg] pointer-events-none z-0"
            style={{ top: pos.top, left: pos.left }}
            aria-hidden="true"
          />
        ))}
        {/* The form or submitted message here */}
        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative max-w-xl mx-auto bg-white rounded-3xl px-8 py-10 sm:p-12 space-y-8 border border-neutral-200 ring-2 ring-red shadow-lg z-10"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-red flex justify-center items-center gap-2">
                <FaTicketAlt className="text-red" />
                Ticket Refund Form
              </h2>
              <p className="text-sm text-gray-500">
                Fill in the details below to submit your request
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Booking ID
              </label>
              <input
                type="text"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                placeholder="e.g. TCK-2025-0423"
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red focus:border-red"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Refund
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain your reason clearly..."
                rows="4"
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red focus:border-red resize-none"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 flex items-center justify-center gap-2 bg-red text-white font-semibold rounded-xl transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red/90'
                  }`}
              >
                {loading && (
                  <AiOutlineLoading3Quarters className="animate-spin text-white text-xl" />
                )}
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative max-w-xl mx-auto text-center bg-white p-8 rounded-3xl shadow-lg space-y-4 z-10"
            style={{ boxShadow: '0 10px 25px rgb(247, 44, 44)' }}
          >
            <h2 className="text-xl font-semibold text-green-600">
              Request submitted successfully!
            </h2>
            <p className="text-gray-500">
              You will be redirected to the homepage shortly...
            </p>
          </motion.div>
        )}

      </RootLayout>
    </div>
  );
};

export default TicketRefund;
