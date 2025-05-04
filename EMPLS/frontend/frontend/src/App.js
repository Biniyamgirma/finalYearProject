import React from 'react';
import Home from './pages/admin/home/Home';
import Register from './components/register/Register';
import ManagePoliceOfficers from './pages/admin/managePoliceOfficers/ManagePoliceOfficers';
import ParentForChat from './components/test/ParentForchat';
// import Report from './components/report/Report';
import Login from './pages/login/LogIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/policeOfficer" element={<ManagePoliceOfficers />} />
        <Route path="/notification" element={<Home />} />
        <Route path="/policeCar" element={<Home />} />
        <Route path="/analaytics" element={<Home />} />
        <Route path="/setting" element={<ParentForChat />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
