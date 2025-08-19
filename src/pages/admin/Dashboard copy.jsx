import React from 'react'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import Card from '../../../components/common/Card'
import StatsCard from '../../../components/dashboard/StatsCard'
import { BarChart, PieChart } from '../../../components/common/Charts'
import { Table, Thead, Tbody, Tr, Th, Td } from '../../../components/common/Table'
import {
    UsersIcon,
    BookOpenIcon,
    CurrencyDollarIcon,
    AcademicCapIcon
} from '@heroicons/react/outline'

const AdminDashboard = () => {
    const stats = [
        { title: "Utilisateurs", value: "1,248", change: "+12%", icon: UsersIcon, color: 'primary' },
        { title: "Ressources", value: "356", change: "+8%", icon: BookOpenIcon, color: 'secondary' },
        { title: "Revenus", value: "8,745€", change: "+23%", icon: CurrencyDollarIcon, color: 'success' },
        { title: "Tuteurs", value: "42", change: "+5", icon: AcademicCapIcon, color: 'warning' }
    ]

    const recentUsers = [
        { id: 1, name: "Marie Dupont", email: "marie@example.com", role: "parent", date: "2023-07-15" },
        { id: 2, name: "Emma Dupont", email: "emma@example.com", role: "child", date: "2023-07-14" },
        { id: 3, name: "Jean Martin", email: "jean@example.com", role: "tutor", date: "2023-07-14" }
    ]

    const userGrowthData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Nouveaux utilisateurs',
                data: [65, 59, 80, 81, 56, 72],
                backgroundColor: '#3B82F6'
            }
        ]
    }

    const revenueData = {
        labels: ['Abonnements', 'Boutique', 'Tutorat'],
        datasets: [
            {
                data: [65, 25, 10],
                backgroundColor: ['#3B82F6', '#EC4899', '#10B981']
            }
        ]
    }

    return (
        <DashboardLayout title="Tableau de bord">
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} {...stat} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2">
                        <div className="p-6">
                            <h3 className="text-lg font-medium mb-4">Croissance des utilisateurs</h3>
                            <BarChart data={userGrowthData} />
                        </div>
                    </Card>
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-medium mb-4">Répartition des revenus</h3>
                            <PieChart data={revenueData} />
                        </div>
                    </Card>
                </div>

                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">Derniers utilisateurs inscrits</h3>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Nom</Th>
                                    <Th>Email</Th>
                                    <Th>Rôle</Th>
                                    <Th>Date</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {recentUsers.map(user => (
                                    <Tr key={user.id}>
                                        <Td>{user.name}</Td>
                                        <Td>{user.email}</Td>
                                        <Td>
                                            <span className={`px-2 py-1 text-xs rounded ${user.role === 'parent' ? 'bg-blue-100 text-blue-800' :
                                                user.role === 'child' ? 'bg-green-100 text-green-800' :
                                                    'bg-purple-100 text-purple-800'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </Td>
                                        <Td>{new Date(user.date).toLocaleDateString()}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default AdminDashboard