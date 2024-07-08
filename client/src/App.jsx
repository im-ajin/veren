import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Vehicles from './pages/Vehicles';
import Vehicle from './pages/Vehicle';
import NavBar from './components/NavBar';
import DashBoard from './pages/DashBoard';
import { SnackbarProvider } from 'notistack'
import BookingPage from './pages/BookingPage';
import EditVehicle from './pages/EditVehicle';
import Bookings from './pages/Bookings';
import FooterComponent from './components/Footer';
import Contact from './pages/Contact';

export default function App() {
  return (
    <div className=''>
    <BrowserRouter>
      {/* header */}
      {/* <Header /> */}
      <SnackbarProvider>
      <NavBar />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/vehicles/vehicle/:id' element={<Vehicle />} />
        <Route path='/booking/:id' element={<BookingPage />} />
        <Route path='/bookings' element={<Bookings />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/editVehicle/:id' element={<EditVehicle />} />
          <Route path='/vehicles' element={<Vehicles />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
      </Routes>
      <FooterComponent />
      </SnackbarProvider>
    </BrowserRouter>
    </div>
  );
}
