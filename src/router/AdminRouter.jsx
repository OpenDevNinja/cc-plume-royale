// src/routes/AdminRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import AdminLayout from '../components/layout/AdminLayout'
import AdminDashboard from '../pages/admin/Dashboard'
import ListUsers from '../pages/admin/Users/ListUsers'
import CreateUser from '../pages/admin/Users/CreateUser'
import EditUser from '../pages/admin/Users/EditUser'
import ListQuizzes from '../pages/admin/Quizzes/ListQuizzes'
import CreateQuiz from '../pages/admin/Quizzes/CreateQuiz'
import ListSubscriptions from '../pages/admin/Subscriptions/ListSubscriptions'
import SubscriptionStats from '../pages/admin/Subscriptions/Stats'
import ListTutors from '../pages/admin/Tutors/ListTutors'
import ApproveTutors from '../pages/admin/Tutors/ApproveTutors'
import PaymentSettings from '../pages/admin/Settings/Payment'
import { useAuth } from '../hooks/useAuth'
import NotFound from '../pages/NotFound'

function AdminRoutes() {
    const { user } = useAuth()

    if (!user || user.role !== 'admin') {
        return <Navigate to={ROUTES.LOGIN} replace />
    }

    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />

                {/* Users Management */}
                <Route path="users">
                    <Route index element={<ListUsers />} />
                    <Route path="create" element={<CreateUser />} />
                    <Route path="edit/:id" element={<EditUser />} />
                </Route>

                {/* Quizzes Management */}
                <Route path="quizzes">
                    <Route index element={<ListQuizzes />} />
                    <Route path="create" element={<CreateQuiz />} />
                </Route>

                {/* Subscriptions Management */}
                <Route path="subscriptions">
                    <Route index element={<ListSubscriptions />} />
                    <Route path="stats" element={<SubscriptionStats />} />
                </Route>

                {/* Tutors Management */}
                <Route path="tutors">
                    <Route index element={<ListTutors />} />
                    <Route path="approve" element={<ApproveTutors />} />
                </Route>

                {/* Settings */}
                <Route path="settings">
                    <Route path="payment" element={<PaymentSettings />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default AdminRoutes