import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from "./components/Navbar"
import Home from './components/Home';
import Bookings from './components/Bookings';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.scss';
import ContactUs from './components/ContactUs';
import Bikes from './components/Bikes';
import Bike from './components/Bike';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/bikes" element={<Bikes />} />
          <Route path="/bike">
            <Route path=':bikeId' element={<Bike />} />
          </Route>
          <Route path="/bookings" element={<Bookings/>} />
          <Route path='/contactus' element={<ContactUs/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
