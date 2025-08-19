// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom'
import PublicRoutes from './PublicRouter'
import AuthRoutes from './AuthRouter'
import ParentRoutes from './ParentRouter'
import ChildRoutes from './ChildRouter'
import AdminRoutes from './AdminRouter'
import { useAuth } from '../hooks/useAuth'
import Loader from '../components/common/Loader'

function AppRoutes() {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return <Loader />
    }

    return (
        <Routes>
            <Route path="/*" element={<PublicRoutes />} />
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/parent/*" element={<ParentRoutes />} />
            <Route path="/child/*" element={<ChildRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
    )
}

export default AppRoutes