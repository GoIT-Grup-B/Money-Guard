import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import useMedia from '../hooks/useMedia'

const RegistrationPage = lazy(
    () => import('../pages/RegistrationPage/RegistrationPage'),
);
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const DashboardPage = lazy(
    () => import('../pages/DashboardPage/DashboardPage'),
);
const Statistics = lazy(() => import('../components/Statistics/Statistics'));
const DashBoardTable = lazy(
    () => import('../pages/DashboardPage/DashBoardTable'),
);
const Currency = lazy(() => import('../components/Currency/Currency'));

const PrivateRoute = ({ children }) => {
    const token = useSelector((state) => state.user.token);
    return token ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
    const token = useSelector((state) => state.user.token);
    return token ? <Navigate to="/dashboard" replace /> : children;
};

const AppRoutes = () => {
    const { isMobile } = useMedia();

    return (
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
                    <Route path="home" element={<DashBoardTable />} />
                    <Route path="statistics" element={<Statistics />} />
                    <Route 
                        path="currency" 
                        element={isMobile ? <Currency /> : <Navigate to="/dashboard/home" />} 
                    />
                    <Route 
                        index 
                        element={<Navigate to="/dashboard/home" replace />} 
                    />
                </Route>
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
