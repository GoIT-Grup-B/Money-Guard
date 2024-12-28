import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from './redux/auth/authOps';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header/Header';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchCurrentUser(token));
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
      <main>
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;
