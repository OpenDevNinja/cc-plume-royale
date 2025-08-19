import React from 'react'
import { useTutors } from '@/hooks/useTutors'

import DashboardLayout from '@/components/layout/AdminLayout'
import Card from '../../../components/common/Card'
import Button from '../../../components/common/Button'

import { FiCheck, FiX } from 'react-icons/fi'

const ApproveTutors = () => {
    const { pendingTutors, approveTutor, rejectTutor } = useTutors()

    return (
        <DashboardLayout title="Approbation des tuteurs">
            <div className="space-y-4">
                {pendingTutors.length === 0 ? (
                    <Card>
                        <div className="text-center py-8">
                            <p className="text-gray-500">Aucune demande d'approbation en attente</p>
                        </div>
                    </Card>
                ) : (
                    pendingTutors.map(tutor => (
                        <Card key={tutor.id}>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={tutor.avatar || '/assets/images/avatars/default.png'}
                                        alt={`${tutor.firstName} ${tutor.lastName}`}
                                        className="h-16 w-16 rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-medium text-lg">
                                            {tutor.firstName} {tutor.lastName}
                                        </h3>
                                        <p className="text-gray-600">{tutor.specialty}</p>
                                        <div className="mt-1 flex flex-wrap gap-1">
                                            {tutor.qualifications.map((qual, index) => (
                                                <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                    {qual}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="success"
                                        icon={FiCheck}
                                        onClick={() => approveTutor(tutor.id)}
                                    >
                                        Approuver
                                    </Button>
                                    <Button
                                        variant="danger"
                                        icon={FiX}
                                        onClick={() => rejectTutor(tutor.id)}
                                    >
                                        Rejeter
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </DashboardLayout>
    )
}

export default ApproveTutors