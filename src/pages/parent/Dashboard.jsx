// src/pages/parent/Dashboard.jsx
import { useEffect, useState } from 'react'
import { ROUTES } from '@/config/routes'
import StatsCard from '@/components/dashboard/StatsCard'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import RecentResources from '@/components/dashboard/RecentResources'
import QuickActions from '@/components/dashboard/QuickActions'
import WelcomeBanner from '@/components/dashboard/WelcomeBanner'
import { useChildren } from '@/hooks/useChildren'
import { useSubscriptions } from '@/hooks/useSubscriptions'
import { useEducationalResources } from '@/hooks/useEducationalResources'

import Loader from '../../components/common/Loader'

/**
 * Tableau de bord parental - Vue d'ensemble des activités et statistiques
 */
function ParentDashboard() {
    // Gestion des données et des états de chargement
    const { children, loading: childrenLoading } = useChildren()
    const { subscription, loading: subscriptionLoading } = useSubscriptions()
    const { resources, loading: resourcesLoading } = useEducationalResources({ limit: 3 })
    const [isLoading, setIsLoading] = useState(true)

    // Synchronisation de l'état de chargement global
    useEffect(() => {
        setIsLoading(childrenLoading || subscriptionLoading || resourcesLoading)
    }, [childrenLoading, subscriptionLoading, resourcesLoading])

    // Configuration des statistiques à afficher
    const dashboardStats = [
        {
            title: 'Enfants inscrits',
            value: children.length,
            change: '+1 récemment',
            changeType: 'positive',
            link: ROUTES.PARENT_CHILDREN
        },
        {
            title: 'Abonnement',
            value: subscription?.plan || 'Aucun',
            change: subscription?.status === 'active' ? 'Actif' : 'Inactif',
            changeType: subscription?.status === 'active' ? 'positive' : 'negative',
            link: ROUTES.PARENT_SUBSCRIPTION
        },
        {
            title: 'Ressources consultées',
            value: '24/30',
            change: '+4 cette semaine',
            changeType: 'positive',
            link: ROUTES.EDUCATIONAL_RESOURCES
        }
    ]

    // Actions rapides configurables
    const quickActions = [
        { title: 'Ajouter un enfant', icon: 'user-add', link: ROUTES.PARENT_ADD_CHILD },
        { title: 'Acheter des ressources', icon: 'book', link: ROUTES.PARENT_SHOP },
        { title: 'Programmer tutorat', icon: 'calendar', link: ROUTES.TUTORS },
        { title: 'Gérer abonnement', icon: 'credit-card', link: ROUTES.PARENT_SUBSCRIPTION }
    ]

    // Affichage pendant le chargement
    if (isLoading) {
        return <Loader fullScreen={false} className="h-64" />
    }

    return (
        <>
            <div className="space-y-8">
                {/* En-tête de bienvenue */}
                <WelcomeBanner
                    title="Bonjour Carine!"
                    subtitle="Voici un aperçu des activités de vos enfants aujourd'hui."
                    className="mb-6"
                />

                {/* Actions rapides */}
                <QuickActions
                    actions={quickActions}
                    className="shadow-sm"
                />

                {/* Statistiques principales */}
                <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {dashboardStats.map((stat, index) => (
                        <StatsCard
                            key={`stat-${index}`}
                            {...stat}
                            animationDelay={index * 100}
                        />
                    ))}
                </section>

                {/* Contenu secondaire */}
                <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <RecentResources
                        resources={resources}
                        className="bg-white rounded-lg shadow"
                    />
                    <ActivityFeed
                        className="bg-white rounded-lg shadow"
                    />
                </section>
            </div>
        </>
    )
}

export default ParentDashboard