// src/components/layout/ChildLayout.jsx
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import { useAuth } from '../../hooks/useAuth'
import ChildHeader from './ChildHeader'
import ChildSidebar from './ChildSidebar'
import Footer from './Footer'

const childNavigation = [
    { name: 'Tableau de bord', icon: 'home', href: ROUTES.CHILD_DASHBOARD },
    { name: 'Ressources', icon: 'book-open', href: ROUTES.CHILD_RESOURCES },
    { name: 'Jeux', icon: 'puzzle', href: ROUTES.CHILD_GAMES },
    { name: 'Quiz', icon: 'question-mark-circle', href: ROUTES.CHILD_QUIZZES },
    { name: 'Mon profil', icon: 'user', href: ROUTES.CHILD_PROFILE }
]

function ChildLayout({ children }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    if (!user || user.role !== 'child') {
        navigate(ROUTES.LOGIN)
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ChildSidebar navigation={childNavigation} />

            <div className="lg:pl-64 flex flex-col">
                <ChildHeader user={user} logout={logout} />

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

export default ChildLayout