import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import Footer from '../components/Footer/Footer';

const RegistrationPage = lazy(
  () => import('../pages/RegistrationPage/RegistrationPage'),
);
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const DashboardPage = lazy(
  () => import('../pages/DashboardPage/DashboardPage'),
);
const Statistic = lazy(() => import('../components/Statistick/Statistick'));

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token);
  return token ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const token = useSelector((state) => state.user.token);
  return token ? <Navigate to="/dashboard" replace /> : children;
};

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegistrationPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          >
            <Route path="statistic" element={<Statistic />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default AppRoutes;
