import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { useTutors } from '@/hooks/useTutors'
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
import { FiCheck, FiEdit, FiTrash2 } from 'react-icons/fi'

const ListTutors = () => {
    const { tutors, isLoading, error, approveTutor } = useTutors()
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const filteredTutors = tutors
        .filter(tutor =>
            `${tutor.firstName} ${tutor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tutor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(tutor =>
            statusFilter === 'all' ||
            (statusFilter === 'approved' && tutor.approved) ||
            (statusFilter === 'pending' && !tutor.approved)
        )

    const paginatedTutors = filteredTutors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleApprove = async (tutorId) => {
        await approveTutor(tutorId)
    }

    return (
        <DashboardLayout title="Gestion des tuteurs">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="w-full sm:w-64">
                    <SearchInput
                        placeholder="Rechercher un tuteur..."
                        value={searchTerm}
                        onChange={setSearchTerm}
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <FilterDropdown
                        options={[
                            { value: 'all', label: 'Tous les statuts' },
                            { value: 'approved', label: 'Approuvés' },
                            { value: 'pending', label: 'En attente' }
                        ]}
                        value={statusFilter}
                        onChange={setStatusFilter}
                    />
                </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Nom</Th>
                            <Th>Spécialité</Th>
                            <Th>Disponibilité</Th>
                            <Th>Note</Th>
                            <Th>Statut</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {isLoading ? (
                            <Tr>
                                <Td colSpan="6" className="text-center py-8">
                                    Chargement...
                                </Td>
                            </Tr>
                        ) : error ? (
                            <Tr>
                                <Td colSpan="6" className="text-center text-danger-600 py-8">
                                    {error}
                                </Td>
                            </Tr>
                        ) : paginatedTutors.length === 0 ? (
                            <Tr>
                                <Td colSpan="6" className="text-center text-gray-500 py-8">
                                    Aucun tuteur trouvé
                                </Td>
                            </Tr>
                        ) : (
                            paginatedTutors.map(tutor => (
                                <Tr key={tutor.id}>
                                    <Td>
                                        <div className="flex items-center">
                                            <img
                                                src={tutor.avatar || '/assets/images/avatars/default.png'}
                                                alt={`${tutor.firstName} ${tutor.lastName}`}
                                                className="h-10 w-10 rounded-full mr-3"
                                            />
                                            <span className="font-medium">
                                                {tutor.firstName} {tutor.lastName}
                                            </span>
                                        </div>
                                    </Td>
                                    <Td>{tutor.specialty}</Td>
                                    <Td>
                                        <div className="flex flex-wrap gap-1">
                                            {tutor.availability.slice(0, 3).map(day => (
                                                <Badge key={day} color="primary" size="xs">
                                                    {day}
                                                </Badge>
                                            ))}
                                            {tutor.availability.length > 3 && (
                                                <Badge color="secondary" size="xs">
                                                    +{tutor.availability.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                    </Td>
                                    <Td>
                                        <div className="flex items-center">
                                            <span className="text-warning-500 mr-1">★</span>
                                            {tutor.rating || 'N/A'}
                                        </div>
                                    </Td>
                                    <Td>
                                        <Badge color={tutor.approved ? 'success' : 'warning'}>
                                            {tutor.approved ? 'Approuvé' : 'En attente'}
                                        </Badge>
                                    </Td>
                                    <Td>
                                        <div className="flex space-x-2">
                                            {!tutor.approved && (
                                                <Button
                                                    size="sm"
                                                    variant="success"
                                                    icon={FiCheck}
                                                    onClick={() => handleApprove(tutor.id)}
                                                />
                                            )}
                                            <Button
                                                size="sm"
                                                variant="primary"
                                                icon={FiEdit}
                                                as={Link}
                                                to={ROUTES.ADMIN_EDIT_USER.replace(':id', tutor.userId)}
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
                        totalItems={filteredTutors.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </DashboardLayout>
    )
}

export default ListTutors