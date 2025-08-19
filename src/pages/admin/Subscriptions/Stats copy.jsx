// src/pages/admin/Subscriptions/Stats.jsx
import AdminLayout from '../../../../components/layout/AdminLayout'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useSubscriptionStats } from '../../../../hooks/useSubscriptions'
import { formatCurrency } from '../../../../utils/formatters'

const SubscriptionStats = () => {
    const { stats, isLoading } = useSubscriptionStats()

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Statistiques des abonnements</h1>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-medium mb-4">Répartition par plan</h2>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.byPlan}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => [formatCurrency(value), 'Revenu']} />
                                        <Legend />
                                        <Bar dataKey="revenue" fill="#8884d8" name="Revenu" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-lg font-medium mb-4">Évolution mensuelle</h2>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.monthlyTrend}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => [value, 'Abonnements']} />
                                        <Legend />
                                        <Bar dataKey="newSubscriptions" fill="#82ca9d" name="Nouveaux" />
                                        <Bar dataKey="canceledSubscriptions" fill="#ffc658" name="Annulés" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-sm text-blue-600">Revenu mensuel</p>
                                    <p className="text-2xl font-bold">{formatCurrency(stats.totals.monthlyRevenue)}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="text-sm text-green-600">Abonnés actifs</p>
                                    <p className="text-2xl font-bold">{stats.totals.activeSubscribers}</p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <p className="text-sm text-yellow-600">Taux de rétention</p>
                                    <p className="text-2xl font-bold">{stats.totals.retentionRate}%</p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <p className="text-sm text-purple-600">ARPU</p>
                                    <p className="text-2xl font-bold">{formatCurrency(stats.totals.arpu)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}

export default SubscriptionStats