// src/pages/admin/Subscriptions/Stats.jsx
import AdminLayout from '@/components/layout/AdminLayout'
import { BarChart, PieChart } from '@/components/common/Charts'
import StatsCard from '@/components/dashboard/StatsCard'
import { useSubscriptions } from '@/hooks/useSubscriptions'

function SubscriptionStats() {
    const { stats, isLoading } = useSubscriptions()

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Statistiques des abonnements</h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <StatsCard
                        title="Abonnements actifs"
                        value={stats.activeCount}
                        change={`${stats.activeGrowth}%`}
                        changeType={stats.activeGrowth >= 0 ? 'positive' : 'negative'}
                    />
                    <StatsCard
                        title="Revenu mensuel"
                        value={`$${stats.monthlyRevenue}`}
                        change={`${stats.revenueGrowth}%`}
                        changeType={stats.revenueGrowth >= 0 ? 'positive' : 'negative'}
                    />
                    <StatsCard
                        title="Taux de rétention"
                        value={`${stats.retentionRate}%`}
                        change={`${stats.retentionChange}%`}
                        changeType={stats.retentionChange >= 0 ? 'positive' : 'negative'}
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">Abonnements par type</h2>
                        <PieChart
                            data={[
                                { name: 'Mensuel', value: stats.monthlyCount },
                                { name: 'Annuel', value: stats.yearlyCount }
                            ]}
                            colors={['#3B82F6', '#10B981']}
                        />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">Revenus des 6 derniers mois</h2>
                        <BarChart
                            data={stats.revenueByMonth}
                            xAxis="month"
                            yAxis="revenue"
                            color="#3B82F6"
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default SubscriptionStats