// src/components/admin/RecentUsers.jsx
import { Link } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import Table from '../common/Table'
import Badge from '../common/Badge'
import Avatar from '../common/Avatar'

function RecentUsers({ users }) {
    const columns = [
        {
            Header: 'Utilisateur',
            accessor: 'name',
            Cell: ({ row }) => (
                <div className="flex items-center">
                    <Avatar
                        src={row.original.avatar}
                        size="sm"
                        className="mr-3"
                    />
                    <div>
                        <Link
                            to={`${ROUTES.ADMIN_EDIT_USER}/${row.original.id}`}
                            className="font-medium text-primary-600 hover:text-primary-900"
                        >
                            {row.original.name}
                        </Link>
                        <div className="text-sm text-gray-500">{row.original.email}</div>
                    </div>
                </div>
            )
        },
        {
            Header: 'Rôle',
            accessor: 'role',
            Cell: ({ value }) => (
                <Badge
                    variant={
                        value === 'admin' ? 'primary' :
                            value === 'parent' ? 'secondary' : 'default'
                    }
                >
                    {value}
                </Badge>
            )
        },
        {
            Header: 'Inscrit le',
            accessor: 'createdAt',
            Cell: ({ value }) => new Date(value).toLocaleDateString()
        },
        {
            Header: 'Statut',
            accessor: 'status',
            Cell: ({ value }) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${value === 'active'
                        ? 'bg-success-100 text-success-800'
                        : 'bg-danger-100 text-danger-800'
                    }`}>
                    {value === 'active' ? 'Actif' : 'Inactif'}
                </span>
            )
        }
    ]

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Utilisateurs récents</h3>
            <Table
                columns={columns}
                data={users}
                showPagination={false}
                pageSize={5}
            />
            <div className="mt-4 text-right">
                <Link
                    to={ROUTES.ADMIN_USERS}
                    className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                    Voir tous les utilisateurs →
                </Link>
            </div>
        </div>
    )
}

export default RecentUsers