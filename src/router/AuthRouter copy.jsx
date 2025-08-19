// src/router/AuthRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import AuthLayout from '../components/layout/AuthLayout'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'

function AuthRouter() {
    return (
        <AuthLayout>
            <Routes>
                <Route index element={<Login />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
                <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
                <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
            </Routes>
        </AuthLayout>
    )
}

export default AuthRouter

