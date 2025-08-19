import React from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Table from '@/components/common/Table'
import Thead from '@/components/common/Thead'
import Tbody from '@/components/common/Tbody'
import Tr from '@/components/common/Tr'
import Th from '@/components/common/Th'
import Td from '@/components/common/Td'
import Badge from '@/components/common/Badge'
import Button from '@/components/common/Button'

import { FiDownload } from "react-icons/fi";
const orders = [
    {
        id: 'ORD-12345',
        date: '2023-05-15',
        items: 2,
        amount: 17.98,
        status: 'completed',
        type: 'digital'
    },
    {
        id: 'ORD-12344',
        date: '2023-04-28',
        items: 1,
        amount: 24.99,
        status: 'shipped',
        type: 'physical'
    },
    {
        id: 'ORD-12343',
        date: '2023-03-10',
        items: 3,
        amount: 32.97,
        status: 'delivered',
        type: 'mixed'
    }
]

const Orders = () => {
    return (
        <DashboardLayout title="Mes commandes">
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Commande</Th>
                            <Th>Date</Th>
                            <Th>Articles</Th>
                            <Th>Montant</Th>
                            <Th>Statut</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orders.map(order => (
                            <Tr key={order.id}>
                                <Td className="font-medium">#{order.id}</Td>
                                <Td>{new Date(order.date).toLocaleDateString('fr-FR')}</Td>
                                <Td>{order.items} article{order.items > 1 ? 's' : ''}</Td>
                                <Td>{order.amount.toFixed(2)} €</Td>
                                <Td>
                                    <Badge
                                        color={
                                            order.status === 'completed' ? 'success' :
                                                order.status === 'shipped' ? 'warning' : 'primary'
                                        }
                                    >
                                        {order.status === 'completed' && 'Terminée'}
                                        {order.status === 'shipped' && 'Expédiée'}
                                        {order.status === 'delivered' && 'Livrée'}
                                    </Badge>
                                </Td>
                                <Td>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        icon={FiDownload}
                                        disabled={order.type !== 'digital'}
                                    >
                                        Facture
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </div>
        </DashboardLayout>
    )
}

export default Orders