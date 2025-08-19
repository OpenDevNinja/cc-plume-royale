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

function AppRouter() {
    const { user, isLoading } = useAuth()

    if (isLoading) return null

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/*" element={<PublicRouter />} />

            {/* Auth routes */}
            {!user && <Route path="/auth/*" element={<AuthRouter />} />}

            {/* Protected routes */}
            {user?.role === 'parent' && <Route path="/parent/*" element={<ParentRouter />} />}
            {user?.role === 'child' && <Route path="/child/*" element={<ChildRouter />} />}
            {user?.role === 'admin' && <Route path="/admin/*" element={<AdminRouter />} />}

            {/* Redirects */}
            {user?.role === 'parent' && <Route path="/auth/*" element={<Navigate to={ROUTES.PARENT_DASHBOARD} />} />}
            {user?.role === 'child' && <Route path="/auth/*" element={<Navigate to={ROUTES.CHILD_DASHBOARD} />} />}
            {user?.role === 'admin' && <Route path="/auth/*" element={<Navigate to={ROUTES.ADMIN_DASHBOARD} />} />}

            {/* Fallback route */}
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
    )
}

export default AppRouter