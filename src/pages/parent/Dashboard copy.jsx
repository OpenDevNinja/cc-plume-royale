import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'
import { useChildren } from '../../../hooks/useChildren'
import { useSubscriptions } from '../../../hooks/useSubscriptions'
import { useEducationalResources } from '../../../hooks/useEducationalResources'
import DashboardLayout from '../../../components/layout/DashboardLayout'
import StatsCard from '../../../components/dashboard/StatsCard'
import ProgressChart from '../../../components/dashboard/ProgressChart'
import RecentResources from '../../../components/dashboard/RecentResources'
import ActivityFeed from '../../../components/dashboard/ActivityFeed'
import QuickActions from '../../../components/dashboard/QuickActions'
import WelcomeBanner from '../../../components/dashboard/WelcomeBanner'
import { BookOpenIcon, AcademicCapIcon, TrophyIcon, ClockIcon } from '@heroicons/react/outline'

const ParentDashboard = () => {
    const { children, isLoading: childrenLoading } = useChildren()
    const { subscription } = useSubscriptions()
    const { resources } = useEducationalResources()
    const navigate = useNavigate()
    const [activeChild, setActiveChild] = useState(null)

    useEffect(() => {
        if (children?.length > 0 && !activeChild) {
            setActiveChild(children[0].id)
        }
    }, [children, activeChild])

    const stats = [
        {
            title: "Ressources consultées",
            value: "24",
            change: "+12%",
            icon: BookOpenIcon,
            color: 'primary'
        },
        {
            title: "Heures d'apprentissage",
            value: "18.5",
            change: "+2.5h",
            icon: ClockIcon,
            color: 'secondary'
        },
        {
            title: "Badges obtenus",
            value: "7",
            change: "+3",
            icon: TrophyIcon,
            color: 'success'
        },
        {
            title: "Matières maîtrisées",
            value: "4",
            change: "+1",
            icon: AcademicCapIcon,
            color: 'warning'
        }
    ]

    return (
        <DashboardLayout title="Tableau de bord">
            <div className="space-y-6">
                <WelcomeBanner
                    title="Bienvenue dans votre espace parent !"
                    subtitle="Suivez la progression de vos enfants et accédez à toutes les fonctionnalités."
                    actionText="Ajouter un enfant"
                    onAction={() => navigate(ROUTES.PARENT_ADD_CHILD)}
                />

                {childrenLoading ? (
                    <div className="animate-pulse flex space-x-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex-1 h-32 bg-gray-200 rounded-lg"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <StatsCard key={index} {...stat} />
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <ProgressChart
                            title="Progression globale"
                            data={[
                                { subject: 'Mathématiques', progress: 75 },
                                { subject: 'Français', progress: 68 },
                                { subject: 'Sciences', progress: 82 },
                                { subject: 'Histoire', progress: 59 },
                                { subject: 'Géographie', progress: 71 }
                            ]}
                        />

                        <RecentResources
                            resources={resources?.slice(0, 5) || []}
                            onViewAll={() => navigate(ROUTES.EDUCATIONAL_RESOURCES)}
                        />
                    </div>

                    <div className="space-y-6">
                        <ActivityFeed
                            activities={[
                                {
                                    id: 1,
                                    child: 'Emma',
                                    action: 'a terminé un quiz',
                                    subject: 'Mathématiques',
                                    score: '85%',
                                    time: 'Il y a 2 heures'
                                },
                                {
                                    id: 2,
                                    child: 'Lucas',
                                    action: 'a débloqué un badge',
                                    badge: 'Expert en calcul',
                                    time: 'Il y a 5 heures'
                                },
                                {
                                    id: 3,
                                    child: 'Emma',
                                    action: 'a regardé une vidéo',
                                    resource: 'Les fractions',
                                    time: 'Hier'
                                },
                                {
                                    id: 4,
                                    child: 'Lucas',
                                    action: 'a complété une leçon',
                                    subject: 'Grammaire',
                                    time: 'Hier'
                                }
                            ]}
                        />

                        <QuickActions
                            actions={[
                                {
                                    title: "Programmer un tutorat",
                                    description: "Réservez une session avec un tuteur",
                                    icon: AcademicCapIcon,
                                    onClick: () => navigate(ROUTES.TUTORS)
                                },
                                {
                                    title: "Acheter des ressources",
                                    description: "Parcourez notre boutique",
                                    icon: BookOpenIcon,
                                    onClick: () => navigate(ROUTES.PARENT_SHOP)
                                },
                                {
                                    title: "Gérer l'abonnement",
                                    description: subscription?.status === 'active'
                                        ? `Renouvellement le ${new Date(subscription?.renewalDate).toLocaleDateString()}`
                                        : "Activer votre abonnement",
                                    icon: ClockIcon,
                                    onClick: () => navigate(ROUTES.PARENT_SUBSCRIPTION)
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default ParentDashboard