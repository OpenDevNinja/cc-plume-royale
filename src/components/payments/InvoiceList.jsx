// src/components/payments/InvoiceList.jsx
import { useState } from 'react'
import Table from '../common/Table'
import Button from '../common/Button'
import { formatCurrency, formatDate } from '../../utils/formatters'

function InvoiceList({ invoices }) {
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 10

    const columns = [
        {
            Header: 'Numéro',
            accessor: 'number',
            Cell: ({ value }) => <span className="font-medium">#{value}</span>
        },
        {
            Header: 'Date',
            accessor: 'date',
            Cell: ({ value }) => formatDate(value)
        },
        {
            Header: 'Montant',
            accessor: 'amount',
            Cell: ({ value }) => formatCurrency(value)
        },
        {
            Header: 'Statut',
            accessor: 'status',
            Cell: ({ value }) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${value === 'paid' ? 'bg-green-100 text-green-800' :
                        value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                    }`}>
                    {value === 'paid' ? 'Payé' : value === 'pending' ? 'En attente' : 'Échoué'}
                </span>
            )
        },
        {
            Header: 'Actions',
            accessor: 'id',
            Cell: ({ row }) => (
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(row.original.downloadUrl, '_blank')}
                    >
                        Télécharger
                    </Button>
                </div>
            )
        }
    ]

    return (
        <div className="space-y-4">
            <Table
                columns={columns}
                data={invoices}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
            />
        </div>
    )
}

export default InvoiceList