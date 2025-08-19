// src/pages/admin/Subscriptions/ListSubscriptions.jsx
import AdminLayout from '../../../components/layout/AdminLayout'
import Table from '../../../components/common/Table'
//import { ROUTES } from '../../../../config/routes'
import {  formatCurrency } from '../../../utils/formatters'
import { useSubscriptions } from '../../../hooks/useSubscriptions'
import { formatDate } from '../../../utils/helpers'

function ListSubscriptions() {
    const { subscriptions, isLoading } = useSubscriptions()

    const columns = [
        {
            Header: 'Utilisateur',
            accessor: 'userName',
        },
        {
            Header: 'Plan',
            accessor: 'plan',
            Cell: ({ value }) => capitalize(value)
        },
        {
            Header: 'Prix',
            accessor: 'price',
            Cell: ({ value }) => formatCurrency(value)
        },
        {
            Header: 'Statut',
            accessor: 'status',
            Cell: ({ value }) => (
                <span className={`px-2 py-1 rounded-full text-xs ${value === 'active'
                        ? 'bg-success-100 text-success-800'
                        : value === 'canceled'
                            ? 'bg-danger-100 text-danger-800'
                            : 'bg-warning-100 text-warning-800'
                    }`}>
                    {value === 'active' ? 'Actif' : value === 'canceled' ? 'Annulé' : 'En attente'}
                </span>
            )
        },
        {
            Header: 'Date de fin',
            accessor: 'endDate',
            Cell: ({ value }) => formatDate(value)
        },
        {
            Header: 'Actions',
            accessor: 'id',
            Cell: ({ row }) => (
                <div className="space-x-2">
                    <button className="text-primary-600 hover:text-primary-900 text-sm">
                        Détails
                    </button>
                    {row.original.status === 'active' && (
                        <button className="text-danger-600 hover:text-danger-900 text-sm">
                            Annuler
                        </button>
                    )}
                </div>
            )
        }
    ]

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Abonnements</h1>
            </div>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <Table
                    columns={columns}
                    data={subscriptions}
                    isLoading={isLoading}
                    emptyText="Aucun abonnement trouvé"
                />
            </div>
        </AdminLayout>
    )
}

export default ListSubscriptions