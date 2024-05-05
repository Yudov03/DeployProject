import Home from './Home/Home'
import Login from './Login/Login'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Patient from './Patients/Patient'
import AddPatient from './Patients/AddPatient'
import ReadPatient from './Patients/ReadPatient'
import UpdatePatient from './Patients/UpdatePatient'
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoutes'
import PasswordResetRequest from './components/PasswordResetRequest'
import PasswordReset from './components/PasswordReset'
import Staff from './Staffs/Staff'
import AddStaff from './Staffs/AddStaff'
import ReadStaff from './Staffs/ReadStaff'
import UpdateStaff from './Staffs/UpdateStaff'
import Medicine from './Medicine/Medicine'
import AddMedicine from './Medicine/AddMedicine'
import ReadMedicine from './Medicine/ReadMedicine'
import UpdateMedicine from './Medicine/UpdateMedicine'
import Device from './Device/Device'
import AddDevice from './Device/AddDevice'
import ReadDevice from './Device/ReadDevice'
import UpdateDevice from './Device/UpdateDevice'
import Dashboard from './Dashboard/Dashboard'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Schedule from './Schedule/Schedule'
import AddSchedule from './Schedule/AddShedule'
import ReadSchedule from './Schedule/ReadSchedule'
import UpdateSchedule from './Schedule/UpdateSchedule'
import Appointment from './Appointment/Appointment'
import AddApointment from './Appointment/AddAppointment'
import ReadAppointment from './Appointment/ReadAppointment'
import UpdateAppointment from './Appointment/UpdateAppointment'
// import ReadMaintainAndRepair from './Maintain/ReadMaintainAndRepair'
import AddMaintainAndRepair from './Maintain/AddMaintainAndRepair'
import UpdateMaintainAndRepair from './Maintain/UpdateMaintainAndRepair'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation()
  const noNavbar = location.pathname === "/register" || location.pathname === "/" || location.pathname.includes("password")
  return (
    <>
      <ToastContainer />
      {
        noNavbar ?
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/request/password_reset" element={<PasswordResetRequest />} />
            <Route path="/password-reset/:token" element={<PasswordReset />} />
          </Routes>
          :
          <Navbar
            content={
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route path="/home" element={<Home />} />
                  <Route path='/patient' element={<Patient />} />
                  <Route path='/patient/add' element={<AddPatient />} />
                  <Route path='/patient/read/:id' element={<ReadPatient />} />
                  <Route path='/patient/update/:id' element={<UpdatePatient />} />
                  <Route path='/staff' element={<Staff />} />
                  <Route path='/staff/add' element={<AddStaff />} />
                  <Route path='/staff/read/:id' element={<ReadStaff />} />
                  <Route path='/staff/update/:id' element={<UpdateStaff />} />
                  <Route path='/medicine' element={<Medicine />} />
                  <Route path='/medicine/add' element={<AddMedicine />} />
                  <Route path='/medicine/read/:id' element={<ReadMedicine />} />
                  <Route path='/medicine/update/:id' element={<UpdateMedicine />} />
                  <Route path='/device' element={<Device />} />
                  <Route path='/device/add' element={<AddDevice />} />
                  <Route path='/device/read/:id' element={<ReadDevice />} />
                  <Route path='/device/update/:id' element={<UpdateDevice />} />
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/schedule' element={<Schedule />} />
                  <Route path='/schedule/add' element={<AddSchedule />} />
                  <Route path='/schedule/read/:id' element={<ReadSchedule />} />
                  <Route path='/schedule/update/:id' element={<UpdateSchedule />} />
                  <Route path='/appointment' element={<Appointment />} />
                  <Route path='/appointment/add' element={<AddApointment />} />
                  <Route path='/appointment/read/:id' element={<ReadAppointment />} />
                  <Route path='/appointment/update/:id' element={<UpdateAppointment />} />
                  <Route path='/maintainandrepair/add' element={<AddMaintainAndRepair />} />
                  {/* <Route path='/maintainandrepair/read/:id' element={<ReadMaintainAndRepair />} /> */}
                  <Route path='/maintainandrepair/update/:id' element={<UpdateMaintainAndRepair />} />
                </Route>
              </Routes>
            }
          />
      }
    </>
  )
}

export default App
