import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Home from './components/home';
import PetsNavbar from './components/pets-navbar';
import MedicalView from './components/medical-view';

import 'bootstrap/dist/css/bootstrap.min.css';

console.log('Using base url', process.env.BASE_URL);

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter basename={process.env.BASE_URL}>
        <PetsNavbar/>
          <Routes>
            <Route path="/pet" element={<MedicalView/>} />
            <Route path='*' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </>
  );
}

export default App;
