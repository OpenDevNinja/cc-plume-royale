import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'

import DashboardLayout from '@/components/layout/DashboardLayout'
import Table from '@/components/common/Table'
import Thead from '@/components/common/Thead'
import Tbody from '@/components/common/Tbody'
import Tr from '@/components/common/Tr'
import Th from '@/components/common/Th'
import Td from '@/components/common/Td'
import Badge from '@/components/common/Badge'
import Button from '@/components/common/Button'
import SearchInput from '@/components/common/SearchInput'
import FilterDropdown from '@/components/common/FilterDropdown'
import Pagination from '@/components/common/Pagination'
import { useUsers } from '../../../hooks/useUser'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

const ListUsers = () => {
    const { users, isLoading, error, deleteUser } = useUsers()
    const [searchTerm, setSearchTerm] = useState('')
    const [roleFilter, setRoleFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const filteredUsers = users
        .filter(user =>
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(user =>
            roleFilter === 'all' ||
            user.role === roleFilter
        )

    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleDelete = async (userId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            await deleteUser(userId)
        }
    }

    return (
        <DashboardLayout
            title="Gestion des utilisateurs"
            headerActions={[
                {
                    label: 'Ajouter un utilisateur',
                    as: Link,
                    to: ROUTES.ADMIN_CREATE_USER
                }
            ]}
        >
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="w-full sm:w-64">
                    <SearchInput
                        placeholder="Rechercher un utilisateur..."
                        value={searchTerm}
                        onChange={setSearchTerm}
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <FilterDropdown
                        options={[
                            { value: 'all', label: 'Tous les rôles' },
                            { value: 'admin', label: 'Administrateurs' },
                            { value: 'parent', label: 'Parents' },
                            { value: 'child', label: 'Enfants' },
                            { value: 'tutor', label: 'Tuteurs' }
                        ]}
                        value={roleFilter}
                        onChange={setRoleFilter}
                    />
                </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Nom</Th>
                            <Th>Email</Th>
                            <Th>Rôle</Th>
                            <Th>Statut</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isLoading ? (
                            <Tr>
                                <Td colSpan="5" className="text-center py-8">
                                    Chargement...
                                </Td>
                            </Tr>
                        ) : error ? (
                            <Tr>
                                <Td colSpan="5" className="text-center text-danger-600 py-8">
                                    {error}
                                </Td>
                            </Tr>
                        ) : paginatedUsers.length === 0 ? (
                            <Tr>
                                <Td colSpan="5" className="text-center text-gray-500 py-8">
                                    Aucun utilisateur trouvé
                                </Td>
                            </Tr>
                        ) : (
                            paginatedUsers.map(user => (
                                <Tr key={user.id}>
                                    <Td>
                                        <div className="flex items-center">
                                            <img
                                                src={user.avatar || '/assets/images/avatars/default.png'}
                                                alt={`${user.firstName} ${user.lastName}`}
                                                className="h-10 w-10 rounded-full mr-3"
                                            />
                                            <span className="font-medium">
                                                {user.firstName} {user.lastName}
                                            </span>
                                        </div>
                                    </Td>
                                    <Td>{user.email}</Td>
                                    <Td>
                                        <Badge color={
                                            user.role === 'admin' ? 'danger' :
                                                user.role === 'parent' ? 'primary' :
                                                    user.role === 'tutor' ? 'secondary' : 'success'
                                        }>
                                            {user.role === 'admin' && 'Administrateur'}
                                            {user.role === 'parent' && 'Parent'}
                                            {user.role === 'child' && 'Enfant'}
                                            {user.role === 'tutor' && 'Tuteur'}
                                        </Badge>
                                    </Td>
                                    <Td>
                                        <Badge color={user.active ? 'success' : 'warning'}>
                                            {user.active ? 'Actif' : 'Inactif'}
                                        </Badge>
                                    </Td>
                                    <Td>
                                        <div className="flex space-x-2">
                                            <Button
                                                size="sm"
                                                variant="primary"
                                                icon={FiEdit}
                                                as={Link}
                                                to={ROUTES.ADMIN_EDIT_USER.replace(':id', user.id)}
                                            />
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                icon={FiTrash2}
                                                onClick={() => handleDelete(user.id)}
                                            />
                                        </div>
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>

                <div className="px-6 py-4 border-t border-gray-200">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={filteredUsers.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default ListUsers