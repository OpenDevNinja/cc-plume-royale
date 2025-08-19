// src/pages/admin/Games/ListGames.jsx
import AdminLayout from '../../../../components/layout/AdminLayout'
import Table from '../../../../components/common/Table'
import { useGames } from '../../../../hooks/useGames'
import { ROUTES } from '../../../../config/routes'
import Button from '../../../../components/common/Button'
import { Link } from 'react-router-dom'

function ListGames() {
    const { games, isLoading } = useGames()

    const columns = [
        {
            Header: 'Nom',
            accessor: 'name',
        },
        {
            Header: 'Catégorie',
            accessor: 'category',
        },
        {
            Header: 'Niveau',
            accessor: 'level',
        },
        {
            Header: 'Statut',
            accessor: 'status',
            Cell: ({ value }) => (
                <span className={`px-2 py-1 rounded-full text-xs ${value === 'active'
                        ? 'bg-success-100 text-success-800'
                        : 'bg-warning-100 text-warning-800'
                    }`}>
                    {value === 'active' ? 'Actif' : 'Inactif'}
                </span>
            )
        },
        {
            Header: 'Actions',
            accessor: 'id',
            Cell: ({ value }) => (
                <Link
                    to={`${ROUTES.ADMIN_GAMES}/edit/${value}`}
                    className="text-primary-600 hover:text-primary-900 text-sm"
                >
                    Éditer
                </Link>
            )
        }
    ]

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Jeux éducatifs</h1>
                <Link to={ROUTES.ADMIN_CREATE_GAME}>
                    <Button>
                        + Ajouter un jeu
                    </Button>
                </Link>
            </div>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <Table
                    columns={columns}
                    data={games}
                    isLoading={isLoading}
                    emptyText="Aucun jeu disponible"
                />
            </div>
        </AdminLayout>
    )
}

export default ListGames