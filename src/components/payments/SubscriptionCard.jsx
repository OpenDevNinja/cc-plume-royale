// src/components/payments/SubscriptionCard.jsx
import { useState } from 'react'
import Button from '../common/Button'
import Badge from '../common/Badge'

const PLANS = [
    {
        id: 'monthly',
        name: 'Mensuel',
        price: 12,
        description: 'Facturé chaque mois',
        features: [
            'Accès à toutes les ressources',
            '3 jeux éducatifs',
            '10 quiz/mois',
            'Support par email'
        ]
    },
    {
        id: 'yearly',
        name: 'Annuel',
        price: 120,
        description: 'Économisez 20%',
        features: [
            'Tout le mensuel, plus...',
            'Accès illimité aux jeux',
            'Quiz illimités',
            '1 session de tutorat offerte'
        ],
        popular: true
    }
]

function SubscriptionCard({ currentPlan, onSubscribe }) {
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubscribe = async (planId) => {
        setIsProcessing(true)
        try {
            await onSubscribe(planId)
        } catch (error) {
            console.error('Subscription failed:', error)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PLANS.map((plan) => (
                <div
                    key={plan.id}
                    className={`relative border rounded-lg p-6 shadow-sm ${plan.popular ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200'
                        }`}
                >
                    {plan.popular && (
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4">
                            <Badge variant="primary">Populaire</Badge>
                        </div>
                    )}

                    <div className="flex flex-col h-full">
                        <h3 className="text-lg font-medium">{plan.name}</h3>
                        <p className="text-gray-500 text-sm">{plan.description}</p>

                        <div className="my-4">
                            <span className="text-4xl font-bold">${plan.price}</span>
                            <span className="text-gray-500">/{plan.id === 'monthly' ? 'mois' : 'an'}</span>
                        </div>

                        <ul className="space-y-2 flex-1">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <svg className="h-5 w-5 text-success-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6">
                            {currentPlan === plan.id ? (
                                <Button variant="outline" fullWidth disabled>
                                    Plan actuel
                                </Button>
                            ) : (
                                <Button
                                    variant={plan.popular ? 'primary' : 'outline'}
                                    fullWidth
                                    loading={isProcessing && selectedPlan === plan.id}
                                    onClick={() => {
                                        setSelectedPlan(plan.id)
                                        handleSubscribe(plan.id)
                                    }}
                                >
                                    S'abonner
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SubscriptionCard