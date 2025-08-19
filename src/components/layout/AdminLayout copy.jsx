// src/components/layout/AdminLayout.jsx
import { Outlet, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import { useAuth } from '../../hooks/useAuth'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import MobileNav from './MobileNav'

const adminNavigation = [
    { name: 'Tableau de bord', icon: 'home', href: ROUTES.ADMIN_DASHBOARD },
    { name: 'Utilisateurs', icon: 'users', href: ROUTES.ADMIN_USERS },
    { name: 'Ressources', icon: 'book-open', href: ROUTES.ADMIN_RESOURCES },
    { name: 'Jeux', icon: 'puzzle', href: ROUTES.ADMIN_GAMES },
    { name: 'Quiz', icon: 'question-mark-circle', href: ROUTES.ADMIN_QUIZZES },
    { name: 'Tuteurs', icon: 'academic-cap', href: ROUTES.ADMIN_TUTORS },
    { name: 'Abonnements', icon: 'credit-card', href: ROUTES.ADMIN_SUBSCRIPTIONS },
    { name: 'Paramètres', icon: 'cog', href: ROUTES.ADMIN_SETTINGS }
]

function AdminLayout({ children }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    if (!user || user.role !== 'admin') {
        navigate(ROUTES.LOGIN)
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar navigation={adminNavigation} />

            <div className="lg:pl-64 flex flex-col">
                <MobileNav navigation={adminNavigation} />
                <Header user={user} logout={logout} />

                <main className="flex-1 pb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {children || <Outlet />}
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    )
}

export default AdminLayout