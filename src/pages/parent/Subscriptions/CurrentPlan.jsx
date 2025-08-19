import React from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import Badge from '@/components/common/Badge'
import {
    FiCreditCard,     // Feather Icons
    FiCalendar        // Style identique à Heroicons outline
} from "react-icons/fi"

const CurrentPlan = () => {
    const subscription = {
        plan: 'Annuel',
        price: 120,
        status: 'active',
        renewalDate: '2025-12-15',
        children: 2,
        benefits: [
            'Accès illimité à toutes les ressources',
            '3 nouveaux cahiers par mois',
            '2 sessions de tutorat offertes',
            '10% de réduction sur la boutique'
        ]
    }

    return (
        <DashboardLayout title="Mon abonnement">
            <div className="space-y-6">
                <Card>
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold">
                                    Abonnement {subscription.plan}
                                </h3>
                                <div className="mt-2 flex items-center">
                                    <Badge color={subscription.status === 'active' ? 'success' : 'warning'}>
                                        {subscription.status === 'active' ? 'Actif' : 'Inactif'}
                                    </Badge>
                                    <span className="ml-4 text-gray-600">
                                        <FiCreditCard className="h-5 w-5 inline mr-1" />
                                        {subscription.price} € / an
                                    </span>
                                </div>
                            </div>
                            <div className="bg-primary-50 p-4 rounded-lg">
                                <div className="flex items-center">
                                    <FiCalendar className="h-5 w-5 text-primary-600 mr-2" />
                                    <span>
                                        Renouvellement le {new Date(subscription.renewalDate).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="font-medium mb-4">Avantages de votre abonnement :</h4>
                            <ul className="space-y-3">
                                {subscription.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="h-5 w-5 text-success-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">Enfants couverts</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4">
                                <div className="flex items-center">
                                    <img
                                        src="/assets/images/avatars/child1.png"
                                        alt="Emma"
                                        className="h-12 w-12 rounded-full mr-3"
                                    />
                                    <div>
                                        <h4 className="font-medium">Emma Dupont</h4>
                                        <p className="text-sm text-gray-500">CM1</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border rounded-lg p-4">
                                <div className="flex items-center">
                                    <img
                                        src="/assets/images/avatars/child2.png"
                                        alt="Lucas"
                                        className="h-12 w-12 rounded-full mr-3"
                                    />
                                    <div>
                                        <h4 className="font-medium">Lucas Dupont</h4>
                                        <p className="text-sm text-gray-500">CE2</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="flex justify-end">
                    <Button variant="primary">
                        Gérer l'abonnement
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default CurrentPlan