import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import VehicleManagement from './pages/admin/vehicles/VehicleManagement'
import { Route } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />

    
  </StrictMode>,
)
