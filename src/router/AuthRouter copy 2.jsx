import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import AuthLayout from '../components/layout/AuthLayout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import VerifyEmail from '../pages/auth/VerifyEmail';
import { useAuth } from '../hooks/useAuth';

function AuthRoutes() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={ROUTES.DASHBOARD} replace />;
    }

    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password/:token" element={<ResetPassword />} />
                <Route path="verify-email/:token" element={<VerifyEmail />} />
                <Route index element={<Navigate to={ROUTES.LOGIN} replace />} />
                <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
            </Route>
        </Routes>
    );
}

export default AuthRoutes;