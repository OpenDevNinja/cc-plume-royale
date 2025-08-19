// src/router/AppRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import PublicRouter from './PublicRouter'
import AuthRouter from './AuthRouter'
import ParentRouter from './ParentRouter'
import ChildRouter from './ChildRouter'
import AdminRouter from './AdminRouter'
import { useAuth } from '../hooks/useAuth'
import NotFound from '../pages/NotFound'
import Loader from '../components/common/Loader'

function AppRouter() {
    const { user, isLoading, isAuthenticated } = useAuth()

    if (isLoading) {
        return <Loader /> 
    }

    return (
        <Routes>
            {/* Routes publiques - accessibles à tous */}
            <Route path="/auth/*" element={
                !isAuthenticated ? <AuthRouter /> : <Navigate to={
                    user.role === 'parent' ? ROUTES.PARENT_DASHBOARD :
                    user.role === 'child' ? ROUTES.CHILD_DASHBOARD :
                    ROUTES.ADMIN_DASHBOARD
                } replace />
            } />

            {/* Routes protégées */}
            <Route path="/parent/*" element={
                isAuthenticated && user?.role === 'parent' ? <ParentRouter /> : <Navigate to={ROUTES.LOGIN} replace />
            } />
            <Route path="/child/*" element={
                isAuthenticated && user?.role === 'child' ? <ChildRouter /> : <Navigate to={ROUTES.LOGIN} replace />
            } />
            <Route path="/admin/*" element={
                isAuthenticated && user?.role === 'admin' ? <AdminRouter /> : <Navigate to={ROUTES.LOGIN} replace />
            } />

            {/* Route publique par défaut */}
            <Route path="/*" element={<PublicRouter />} />
        </Routes>
    )
}

export default AppRouter