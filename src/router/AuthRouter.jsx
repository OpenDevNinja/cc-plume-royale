// src/routes/AuthRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'
import { useAuth } from '../hooks/useAuth'
import VerifyEmail from '../pages/auth/VerifyEmail'

function AuthRoutes() {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return <Navigate to={ROUTES.PARENT_DASHBOARD} replace />
    }

    return (
        <Routes>
            <Route >
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password/:token" element={<ResetPassword />} />
                <Route path="verify-email/:token" element={<VerifyEmail />} />
                <Route index element={<Navigate to={ROUTES.LOGIN} replace />} />
                <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
            </Route>
        </Routes>
    )
}

export default AuthRoutes