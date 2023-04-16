import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import MedicalTable from './components/medical-table';
import PetsNavbar from './components/pets-navbar';

function App() {
  return (
    <>
      <PetsNavbar/>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="pet" element={<MedicalTable />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
