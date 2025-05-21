import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Footer from './components/footer/Footer'
import Ticket from './pages/ticket/Ticket'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import BusDetail from './pages/ticket/busdetail/BusDetail'
import TaxiDetail from './pages/ticket/taxidetail/TaxiDetail'
import Checkout from './pages/ticket/checkout/Checkout'
import Invoice from './pages/ticket/invoice/Invoice'
import Services from './pages/services/Services'
import TicketRefund from './pages/ticket/refund/TicketRefund'
import VehicleManagement from './pages/admin/vehicles/VehicleManagement'
import RouteManagement from './pages/admin/routes/RouteManagement';
import AdminLayout from './pages/admin/components/AdminLayout';
import Dashboard from './pages/admin/dashboard/Dashboard';
import ScheduleManagement from './pages/admin/schedules/ScheduleManagement';
import BookingManagement from './pages/admin/bookings/BookingManagement';



function App() {
  return (
    <>
      <Router>
        <main className="w-full flex flex-col bg-[rgb(250,250,250)] min-h-screen ">
          {/* Navbar */}
          <Navbar />

          {/* Routing */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/ticket' element={<Ticket />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/services" element={<Services />} />
            <Route path='/ticket/busdetail/:scheduleId' element={<BusDetail />} />
            <Route path='/ticket/taxidetail/:scheduleId' element={<TaxiDetail />} />
            <Route path='/ticket/checkout' element={<Checkout />} />
            <Route path='/ticket/payment' element={<Invoice />} />
            <Route path="/refund" element={<TicketRefund />} />
            {/* Add the new route here for admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="vehicles" element={<VehicleManagement />} />
              <Route path="routes" element={<RouteManagement />} />
              <Route path="schedules" element={<ScheduleManagement />} />
              <Route path="bookings" element={<BookingManagement />} />
            </Route>
          </Routes>

          {/* Footer */}
          <Footer />
        </main>
      </Router>
    </>
  )
}

export default App