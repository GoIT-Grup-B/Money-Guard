import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import DashBoardTable from './pages/DashboardPage/DashBoardTable';

function App() {
  return (
    
    <>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
        <Route path="dashboard" element={<DashBoardTable/>} />
      </Routes>
    </>
  );
}

export default App;
