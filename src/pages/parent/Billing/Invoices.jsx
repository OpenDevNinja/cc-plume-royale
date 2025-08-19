import React from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/common/Card'
import Table from '@/components/common/Table'
import Thead from '@/components/common/Thead'
import Tbody from '@/components/common/Tbody'
import Tr from '@/components/common/Tr'
import Th from '@/components/common/Th'
import Td from '@/components/common/Td'
import Button from '@/components/common/Button'
import { FiDownload } from "react-icons/fi";
const invoices = [
    {
        id: 'INV-2023-07-001',
        date: '2023-07-15',
        amount: 12.00,
        status: 'paid',
        type: 'subscription'
    },
    {
        id: 'INV-2023-06-001',
        date: '2023-06-15',
        amount: 12.00,
        status: 'paid',
        type: 'subscription'
    },
    {
        id: 'INV-2023-05-003',
        date: '2023-05-20',
        amount: 24.99,
        status: 'paid',
        type: 'purchase'
    }
]

const Invoices = () => {
    const handleDownload = (invoiceId) => {
        console.log('Download invoice', invoiceId)
        // Générer ou télécharger la facture
    }

    return (
        <DashboardLayout title="Mes factures">
            <Card>
                <div className="p-6">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Facture</Th>
                                <Th>Date</Th>
                                <Th>Montant</Th>
                                <Th>Type</Th>
                                <Th>Statut</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {invoices.map(invoice => (
                                <Tr key={invoice.id}>
                                    <Td className="font-medium">#{invoice.id}</Td>
                                    <Td>{new Date(invoice.date).toLocaleDateString('fr-FR')}</Td>
                                    <Td>{invoice.amount.toFixed(2)} €</Td>
                                    <Td>
                                        {invoice.type === 'subscription' ? 'Abonnement' : 'Achat'}
                                    </Td>
                                    <Td>
                                        <span className={`px-2 py-1 text-xs rounded ${invoice.status === 'paid'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {invoice.status === 'paid' ? 'Payée' : 'En attente'}
                                        </span>
                                    </Td>
                                    <Td>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            icon={FiDownload}
                                            onClick={() => handleDownload(invoice.id)}
                                        >
                                            PDF
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>
            </Card>
        </DashboardLayout>
    )
}

export default Invoices