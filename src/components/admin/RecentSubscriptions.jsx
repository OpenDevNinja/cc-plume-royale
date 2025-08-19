import React from 'react'

import Table from '@/components/common/Table'
import Thead from '@/components/common/Thead'
import Tbody from '@/components/common/Tbody'
import Tr from '@/components/common/Tr'
import Th from '@/components/common/Th'
import Td from '@/components/common/Td'
import Badge from '@/components/common/Badge'
import { formatDate } from '../../utils/helpers'
import { formatCurrency } from '../../utils/formatters'
// import { formatDate, formatCurrency } from '@/utils/helpers'

const RecentSubscriptions = ({ subscriptions = [] }) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium">Abonnements récents</h3>
            </div>

            <Table>
                <Thead>
                    <Tr>
                        <Th>Utilisateur</Th>
                        <Th>Plan</Th>
                        <Th>Prix</Th>
                        <Th>Date</Th>
                        <Th>Statut</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {subscriptions.map((sub) => (
                        <Tr key={sub.id}>
                            <Td>
                                <div className="flex items-center">
                                    <img
                                        src={sub.user.avatar}
                                        alt={sub.user.name}
                                        className="h-8 w-8 rounded-full mr-3"
                                    />
                                    <span>{sub.user.name}</span>
                                </div>
                            </Td>
                            <Td>{sub.plan}</Td>
                            <Td>{formatCurrency(sub.price)}</Td>
                            <Td>{formatDate(sub.date)}</Td>
                            <Td>
                                <Badge color={
                                    sub.status === 'active' ? 'success' :
                                        sub.status === 'pending' ? 'warning' : 'danger'
                                }>
                                    {sub.status}
                                </Badge>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </div>
    )
}

export default RecentSubscriptions