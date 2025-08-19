import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../../config/routes'
import { useChildren } from '../../../../hooks/useChildren'
import DashboardLayout from '../../../../components/layout/DashboardLayout'
import { Tab } from '../../../../components/common/Tab'
import ProgressChart from '../../../../components/dashboard/ProgressChart'
import ActivityFeed from '../../../../components/dashboard/ActivityFeed'
import ResourceList from '../../../../components/educational/ResourceList'
import QuizResults from '../../../../components/quizzes/QuizResults'
import BadgeList from '../../../../components/common/BadgeList'

const ChildProgress = () => {
    const { id } = useParams()
    const { getChildById } = useChildren()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('progress')

    const child = getChildById(id)

    if (!child) {
        navigate(ROUTES.PARENT_CHILDREN)
        return null
    }

    const tabs = [
        { id: 'progress', label: 'Progression' },
        { id: 'activities', label: 'Activités' },
        { id: 'resources', label: 'Ressources' },
        { id: 'quizzes', label: 'Quiz' },
        { id: 'badges', label: 'Badges' }
    ]

    return (
        <DashboardLayout
            title={`Progression de ${child.firstName}`}
            backLink={ROUTES.PARENT_CHILDREN}
            headerActions={[
                {
                    label: 'Modifier le profil',
                    onClick: () => navigate(ROUTES.PARENT_ADD_CHILD) // TODO: Add edit route
                }
            ]}
        >
            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map(tab => (
                        <Tab
                            key={tab.id}
                            active={activeTab === tab.id}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </Tab>
                    ))}
                </nav>
            </div>

            <div className="space-y-8">
                {activeTab === 'progress' && (
                    <>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <ProgressChart
                                title="Progression par matière"
                                data={[
                                    { subject: 'Mathématiques', progress: child.mathProgress || 0 },
                                    { subject: 'Français', progress: child.frenchProgress || 0 },
                                    { subject: 'Sciences', progress: child.scienceProgress || 0 },
                                    { subject: 'Histoire', progress: child.historyProgress || 0 }
                                ]}
                            />

                            <ProgressChart
                                title="Compétences clés"
                                type="radial"
                                data={[
                                    { skill: 'Calcul', progress: 75 },
                                    { skill: 'Compréhension', progress: 68 },
                                    { skill: 'Logique', progress: 82 },
                                    { skill: 'Mémorisation', progress: 59 }
                                ]}
                            />
                        </div>

                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Statistiques hebdomadaires</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <p className="text-sm text-gray-500">Temps passé</p>
                                    <p className="text-2xl font-bold text-primary-600">6.5h</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <p className="text-sm text-gray-500">Ressources vues</p>
                                    <p className="text-2xl font-bold text-primary-600">12</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <p className="text-sm text-gray-500">Quiz complétés</p>
                                    <p className="text-2xl font-bold text-primary-600">5</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <p className="text-sm text-gray-500">Nouveaux badges</p>
                                    <p className="text-2xl font-bold text-primary-600">2</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'activities' && (
                    <ActivityFeed
                        activities={child.activities || []}
                        showChild={false}
                    />
                )}

                {activeTab === 'resources' && (
                    <ResourceList
                        resources={child.recentResources || []}
                        title="Ressources récemment consultées"
                        showViewAll={false}
                    />
                )}

                {activeTab === 'quizzes' && (
                    <QuizResults
                        results={child.quizResults || []}
                    />
                )}

                {activeTab === 'badges' && (
                    <BadgeList
                        badges={child.badges || []}
                        title="Badges obtenus"
                    />
                )}
            </div>
        </DashboardLayout>
    )
}

export default ChildProgress