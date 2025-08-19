// src/pages/admin/Dashboard.jsx
import { useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import StatsCard from '@/components/dashboard/StatsCard'
import RecentUsers from '@/components/admin/RecentUsers'
import RecentSubscriptions from '@/components/admin/RecentSubscriptions'
import ResourceUploads from '@/components/admin/ResourceUploads'

import { useSubscriptions } from '@/hooks/useSubscriptions'
import { useEducationalResources } from '@/hooks/useEducationalResources'
import { useUsers } from '../../hooks/useUser'

function AdminDashboard() {
    const [timeRange, setTimeRange] = useState('week')
    const { users } = useUsers({ limit: 5 })
    const { subscriptions } = useSubscriptions({ limit: 5 })
    const { resources } = useEducationalResources({ limit: 5 })

    const stats = [
        {
            title: 'Utilisateurs',
            value: '1,234',
            change: '+24 cette semaine',
            changeType: 'positive'
        },
        {
            title: 'Abonnements',
            value: '876',
            change: '+12 cette semaine',
            changeType: 'positive'
        },
        {
            title: 'Revenus',
            value: '$12,345',
            change: '+$1,234 cette semaine',
            changeType: 'positive'
        },
        {
            title: 'Ressources',
            value: '345',
            change: '+15 cette semaine',
            changeType: 'positive'
        }
    ]

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setTimeRange('day')}
                            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'day' ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            Aujourd'hui
                        </button>
                        <button
                            onClick={() => setTimeRange('week')}
                            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'week' ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            Cette semaine
                        </button>
                        <button
                            onClick={() => setTimeRange('month')}
                            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'month' ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:bg-gray-100'}`}
                        >
                            Ce mois
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} {...stat} />
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <RecentUsers users={users} />
                    <RecentSubscriptions subscriptions={subscriptions} />
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <ResourceUploads resources={resources} />
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminDashboard