import { Route, Routes } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
<<<<<<< HEAD
import AddTransactionForm from './components/AddTransactionForm/AddTransactionForm';

function App() {
    return (
        <>
            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegistrationPage />} />
            </Routes>
        </>
    );
=======
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
>>>>>>> feature/add-transaction-gizem
}

export default App;
