import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../../config/routes'
import { useChildren } from '../../../../hooks/useChildren'
import DashboardLayout from '../../../../components/layout/DashboardLayout'
import EmptyState from '../../../../components/common/EmptyState'
import { AcademicCapIcon, PlusIcon } from '@heroicons/react/outline'
import ChildCard from '../../../../components/parent/ChildCard'

const ListChildren = () => {
    const { children, isLoading } = useChildren()
    const navigate = useNavigate()

    return (
        <DashboardLayout
            title="Mes enfants"
            actions={[
                {
                    label: 'Ajouter un enfant',
                    icon: PlusIcon,
                    onClick: () => navigate(ROUTES.PARENT_ADD_CHILD)
                }
            ]}
        >
            {isLoading ? (
                <div className="animate-pulse grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
                    ))}
                </div>
            ) : children?.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {children.map(child => (
                        <Link
                            key={child.id}
                            to={ROUTES.PARENT_CHILD_PROGRESS.replace(':id', child.id)}
                            className="hover:opacity-90 transition-opacity"
                        >
                            <ChildCard child={child} />
                        </Link>
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={AcademicCapIcon}
                    title="Aucun enfant enregistré"
                    description="Commencez par ajouter un enfant pour suivre sa progression."
                    actionText="Ajouter un enfant"
                    onAction={() => navigate(ROUTES.PARENT_ADD_CHILD)}
                />
            )}
        </DashboardLayout>
    )
}

export default ListChildren