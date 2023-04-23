import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import MedicalTable from './components/medical-table';
import PetsNavbar from './components/pets-navbar';
import MedicalView from 'components/medical-view';

function App() {
  return (
    <>
      <PetsNavbar/>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="pet" element={<MedicalView/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
