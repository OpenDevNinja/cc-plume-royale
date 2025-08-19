import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import DashboardLayout from '@/components/layout/AdminLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import RadioGroup from '@/components/common/RadioGroup'

import { FiCheck } from "react-icons/fi";
const plans = [
    {
        id: 'monthly',
        name: 'Abonnement Mensuel',
        price: 12,
        description: 'Facturation mensuelle récurrente',
        features: [
            'Accès à toutes les ressources',
            '1 nouveau cahier par mois',
            '10% de réduction sur la boutique'
        ],
        recommended: false
    },
    {
        id: 'annual',
        name: 'Abonnement Annuel',
        price: 120,
        description: 'Facturation annuelle (économisez 20%)',
        features: [
            'Accès illimité à toutes les ressources',
            '3 nouveaux cahiers par mois',
            '2 sessions de tutorat offertes',
            '10% de réduction sur la boutique'
        ],
        recommended: true
    }
]

const ChangePlan = () => {
    const [selectedPlan, setSelectedPlan] = useState(plans[1].id)
    const navigate = useNavigate()

    const handleSubmit = () => {
        // Ici, on intégrerait avec l'API de paiement
        console.log('Changing to plan:', selectedPlan)
        navigate(ROUTES.PARENT_SUBSCRIPTION)
    }

    return (
        <DashboardLayout
            title="Changer d'abonnement"
            backLink={ROUTES.PARENT_SUBSCRIPTION}
        >
            <div className="space-y-6">
                <Card>
                    <div className="p-6">
                        <RadioGroup value={selectedPlan} onChange={setSelectedPlan}>
                            <div className="space-y-4">
                                {plans.map((plan) => (
                                    <div
                                        key={plan.id}
                                        className={`relative border rounded-lg p-6 cursor-pointer transition-all ${selectedPlan === plan.id
                                            ? 'border-primary-500 ring-2 ring-primary-500'
                                            : 'border-gray-200 hover:border-primary-300'
                                            }`}
                                    >
                                        {plan.recommended && (
                                            <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-tr-lg rounded-bl-lg">
                                                Recommandé
                                            </div>
                                        )}
                                        <div className="flex items-start">
                                            <RadioGroup.Option value={plan.id} className="mt-1 mr-4" />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-medium">{plan.name}</h3>
                                                    <p className="text-xl font-bold">
                                                        {plan.price} €{plan.id === 'monthly' ? '/mois' : '/an'}
                                                    </p>
                                                </div>
                                                <p className="text-gray-600 mt-1">{plan.description}</p>
                                                <ul className="mt-4 space-y-2">
                                                    {plan.features.map((feature, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <FiCheck className="h-5 w-5 text-success-500 mr-2 mt-0.5" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>

                        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">Récapitulatif</h4>
                            <div className="flex justify-between">
                                <span>Nouvel abonnement :</span>
                                <span className="font-medium">
                                    {plans.find(p => p.id === selectedPlan)?.name}
                                </span>
                            </div>
                            <div className="flex justify-between mt-1">
                                <span>Prix :</span>
                                <span className="font-bold text-lg">
                                    {plans.find(p => p.id === selectedPlan)?.price} €
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-4">
                            <Button
                                variant="outline"
                                onClick={() => navigate(ROUTES.PARENT_SUBSCRIPTION)}
                            >
                                Annuler
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleSubmit}
                            >
                                Confirmer le changement
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default ChangePlan