// src/pages/admin/Quizzes/ListQuizzes.jsx
import AdminLayout from '@/components/layout/AdminLayout'
import Table from '@/components/common/Table'
import { ROUTES } from '@/config/routes'
import Button from '@/components/common/Button'
import { Link } from 'react-router-dom'
import { useQuizzes } from '@/hooks/useQuizzes'

function ListQuizzes() {
    const { quizzes, isLoading } = useQuizzes()

    const columns = [
        {
            Header: 'Titre',
            accessor: 'title',
        },
        {
            Header: 'Matière',
            accessor: 'subject',
            Cell: ({ value }) => capitalize(value)
        },
        {
            Header: 'Niveau',
            accessor: 'level',
        },
        {
            Header: 'Questions',
            accessor: 'questionCount',
        },
        {
            Header: 'Statut',
            accessor: 'status',
            Cell: ({ value }) => (
                <span className={`px-2 py-1 rounded-full text-xs ${value === 'published'
                        ? 'bg-success-100 text-success-800'
                        : 'bg-warning-100 text-warning-800'
                    }`}>
                    {value === 'published' ? 'Publié' : 'Brouillon'}
                </span>
            )
        },
        {
            Header: 'Actions',
            accessor: 'id',
            Cell: ({ value }) => (
                <Link
                    to={`${ROUTES.ADMIN_QUIZZES}/edit/${value}`}
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
                <h1 className="text-2xl font-bold text-gray-900">Gestion des quiz</h1>
                <Link to={ROUTES.ADMIN_CREATE_QUIZ}>
                    <Button>
                        + Nouveau quiz
                    </Button>
                </Link>
            </div>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <Table
                    columns={columns}
                    data={quizzes}
                    isLoading={isLoading}
                    emptyText="Aucun quiz disponible"
                />
            </div>
        </AdminLayout>
    )
}

export default ListQuizzes