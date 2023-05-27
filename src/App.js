import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Home from './components/home';
import PetsNavbar from './components/pets-navbar';
import MedicalView from './components/medical-view';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <PetsNavbar/>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="pet" element={<MedicalView/>} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </>
  );
}

export default App;
