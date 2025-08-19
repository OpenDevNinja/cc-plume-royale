// src/components/layout/ParentLayout.jsx
import { Outlet, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import { useAuth } from '../../hooks/useAuth'
import Sidebar from './Sidebar'

const parentNavigation = [
    { name: 'Tableau de bord', icon: 'home', href: ROUTES.PARENT_DASHBOARD },
    { name: 'Mes enfants', icon: 'users', href: ROUTES.PARENT_CHILDREN },
    { name: 'Ressources', icon: 'book-open', href: ROUTES.EDUCATIONAL_RESOURCES },
    { name: 'Boutique', icon: 'shopping-bag', href: ROUTES.PARENT_SHOP },
    { name: 'Tutorat', icon: 'academic-cap', href: ROUTES.TUTORS },
    { name: 'Facturation', icon: 'credit-card', href: ROUTES.PARENT_BILLING },
    { name: 'Paramètres', icon: 'cog', href: ROUTES.PARENT_SETTINGS }
]

function ParentLayout() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    if (!user || user.role !== 'parent') {
        navigate(ROUTES.LOGIN)
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar navigation={parentNavigation} />

            <div className="flex-1 ">
                <main className="">
                    <div className=" mx-auto">
                        <div className="bg-white rounded-lg shadow p-6">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ParentLayout