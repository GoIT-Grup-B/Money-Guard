import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchCurrentUser } from './redux/auth/authOps';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header/Header';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchCurrentUser(token));
    }
  }, [dispatch]);

  const shouldShowHeader = location.pathname === '/dashboard';

  return (
    <>
      {shouldShowHeader && <Header />}
      <main>
        <AppRoutes />
      </main>
    </>
  );
};

export default App;
