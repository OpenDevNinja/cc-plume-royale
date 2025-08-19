// src/pages/admin/educational-resources/ListResources.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'
import AdminLayout from '../../../components/layout/AdminLayout'
import Table from '../../../components/common/Table'
import Button from '../../../components/common/Button'
import { useEducationalResources } from '../../../hooks/useEducationalResources'
import SearchInput from '../../../components/common/SearchInput'
import Select from '../../../components/common/Select'
import Pagination from '../../../components/common/Pagination'

const RESOURCE_TYPES = [
    { value: 'all', label: 'Tous les types' },
    { value: 'pdf', label: 'PDF' },
    { value: 'video', label: 'Vidéo' },
    { value: 'article', label: 'Article' }
]

const SUBJECTS = [
    { value: 'all', label: 'Toutes les matières' },
    { value: 'math', label: 'Mathématiques' },
    { value: 'french', label: 'Français' },
    { value: 'science', label: 'Sciences' }
]

function ListResources() {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('all')
    const [subjectFilter, setSubjectFilter] = useState('all')

    const { resources, isLoading, error } = useEducationalResources({
        page,
        search,
        type: typeFilter !== 'all' ? typeFilter : undefined,
        subject: subjectFilter !== 'all' ? subjectFilter : undefined
    })

    const columns = [
        {
            Header: 'Titre',
            accessor: 'title',
            Cell: ({ row }) => (
                <Link
                    to={`${ROUTES.ADMIN_EDIT_RESOURCE}/${row.original.id}`}
                    className="text-primary-600 hover:text-primary-800"
                >
                    {row.original.title}
                </Link>
            )
        },
        {
            Header: 'Type',
            accessor: 'type',
            Cell: ({ value }) => (
                <span className="capitalize">{value}</span>
            )
        },
        {
            Header: 'Matière',
            accessor: 'subject',
            Cell: ({ value }) => (
                <span className="capitalize">{value}</span>
            )
        },
        {
            Header: 'Niveau',
            accessor: 'level',
            Cell: ({ value }) => `Niveau ${value}`
        },
        {
            Header: 'Statut',
            accessor: 'status',
            Cell: ({ value }) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${value === 'published'
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
                <div className="flex space-x-2">
                    <Link
                        to={`${ROUTES.ADMIN_EDIT_RESOURCE}/${value}`}
                        className="text-primary-600 hover:text-primary-900"
                    >
                        Éditer
                    </Link>
                </div>
            )
        }
    ]

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Ressources pédagogiques</h1>
                    <Link to={ROUTES.ADMIN_CREATE_RESOURCE}>
                        <Button>
                            + Ajouter une ressource
                        </Button>
                    </Link>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
                        <div>
                            <SearchInput
                                placeholder="Rechercher des ressources..."
                                value={search}
                                onChange={setSearch}
                            />
                        </div>
                        <div>
                            <Select
                                options={RESOURCE_TYPES}
                                value={typeFilter}
                                onChange={setTypeFilter}
                                label="Filtrer par type"
                            />
                        </div>
                        <div>
                            <Select
                                options={SUBJECTS}
                                value={subjectFilter}
                                onChange={setSubjectFilter}
                                label="Filtrer par matière"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="rounded-md bg-danger-50 p-4 mb-4">
                            <div className="text-danger-700">{error}</div>
                        </div>
                    )}

                    <Table
                        columns={columns}
                        data={resources?.data || []}
                        isLoading={isLoading}
                    />

                    {resources?.meta && (
                        <div className="mt-4">
                            <Pagination
                                currentPage={page}
                                totalPages={resources.meta.totalPages}
                                onPageChange={setPage}
                            />
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}

export default ListResources