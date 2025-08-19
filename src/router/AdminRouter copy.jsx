// src/router/AdminRouter.jsx
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '../config/routes'
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

function AdminRouter() {
    const { user } = useAuth()

    if (!user || user.role !== 'admin') {
        return <NotFound />
    }

    return (
        <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="users">
                <Route index element={<ListUsers />} />
                <Route path="create" element={<CreateUser />} />
                <Route path="edit/:id" element={<EditUser />} />
            </Route>
            <Route path="quizzes">
                <Route index element={<ListQuizzes />} />
                <Route path="create" element={<CreateQuiz />} />
            </Route>
            <Route path="subscriptions">
                <Route index element={<ListSubscriptions />} />
                <Route path="stats" element={<SubscriptionStats />} />
            </Route>
            <Route path="tutors">
                <Route index element={<ListTutors />} />
                <Route path="approve" element={<ApproveTutors />} />
            </Route>
            <Route path="settings">
                <Route path="payment" element={<PaymentSettings />} />
            </Route>
        </Routes>
    )
}

export default AdminRouter