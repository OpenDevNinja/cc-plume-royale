// src/components/payments/SubscriptionForm.jsx
import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../common/Button'
import Modal from '../common/Modal'
import StripePayment from './StripePayment'

const SubscriptionForm = ({ plans, currentPlan, onSubscribe }) => {
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [showPaymentModal, setShowPaymentModal] = useState(false)

    const handleSubscribe = (planId) => {
        setSelectedPlan(planId)
        setShowPaymentModal(true)
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`rounded-lg border ${plan.isPopular ? 'border-primary-500 shadow-lg' : 'border-gray-200'
                            } p-6`}
                    >
                        <h3 className="text-lg font-medium">{plan.name}</h3>
                        <div className="mt-4">
                            <span className="text-4xl font-bold">{plan.price}€</span>
                            <span className="text-base font-medium text-gray-500">/{plan.period}</span>
                        </div>
                        <ul className="mt-6 space-y-3">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <svg
                                        className="h-5 w-5 text-success-500 flex-shrink-0"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="ml-2 text-gray-700">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8">
                            <Button
                                variant={plan.isPopular ? 'primary' : 'outline'}
                                fullWidth
                                onClick={() => handleSubscribe(plan.id)}
                                disabled={currentPlan === plan.id}
                            >
                                {currentPlan === plan.id ? 'Plan actuel' : 'Souscrire'}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                title="Paiement de l'abonnement"
            >
                <StripePayment
                    amount={plans.find(p => p.id === selectedPlan)?.price || 0}
                    onSuccess={() => {
                        onSubscribe(selectedPlan)
                        setShowPaymentModal(false)
                    }}
                    onError={() => setShowPaymentModal(false)}
                />
            </Modal>
        </div>
    )
}

SubscriptionForm.propTypes = {
    plans: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            period: PropTypes.string.isRequired,
            features: PropTypes.arrayOf(PropTypes.string).isRequired,
            isPopular: PropTypes.bool
        })
    ).isRequired,
    currentPlan: PropTypes.string,
    onSubscribe: PropTypes.func.isRequired
}

export default SubscriptionForm