// src/components/payments/PaymentMethod.jsx
import { useState } from 'react'
import Button from '../common/Button'
import Modal from '../common/Modal'
import StripePayment from './StripePayment'
import { showSuccessNotification } from '../../utils/notifications'

const paymentMethods = [
    {
        id: 'card_1',
        type: 'card',
        details: {
            brand: 'visa',
            last4: '4242',
            exp_month: '12',
            exp_year: '2025'
        }
    },
    {
        id: 'card_2',
        type: 'card',
        details: {
            brand: 'mastercard',
            last4: '4444',
            exp_month: '08',
            exp_year: '2024'
        }
    }
]

function PaymentMethod() {
    const [methods, setMethods] = useState(paymentMethods)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(null)

    const handleAddPaymentMethod = async (paymentMethod) => {
        // In a real app, you would save the payment method to your backend
        const newMethod = {
            id: `card_${methods.length + 1}`,
            type: 'card',
            details: {
                brand: paymentMethod.card.brand,
                last4: paymentMethod.card.last4,
                exp_month: paymentMethod.card.exp_month,
                exp_year: paymentMethod.card.exp_year
            }
        }
        setMethods([...methods, newMethod])
        setIsAddModalOpen(false)
        showSuccessNotification('Moyen de paiement ajouté')
    }

    const handleDeletePaymentMethod = async (id) => {
        setIsDeleting(id)
        // In a real app, you would call your API to delete the payment method
        await new Promise(resolve => setTimeout(resolve, 1000))
        setMethods(methods.filter(method => method.id !== id))
        setIsDeleting(null)
        showSuccessNotification('Moyen de paiement supprimé')
    }

    const getCardIcon = (brand) => {
        switch (brand) {
            case 'visa':
                return (
                    <svg className="h-8 w-8" viewBox="0 0 24 16">
                        <path fill="#1A1F71" d="M9.6 5.4h4.8v5.2H9.6z" />
                        <path fill="#1A1F71" d="M16.4 5.3c-1.5 0-2.6.8-2.6 2s1 1.9 2.6 1.9 2.6-.8 2.6-2-1.1-1.9-2.6-1.9z" />
                        <path fill="#1A1F71" d="M22.2 5.3c-.6 0-1 .3-1.3.7v-.6h-1.5v5.2h1.5V8.6c0-.8.5-1.3 1.3-1.3.8 0 1.3.5 1.3 1.3v2.2h1.5V8.5c0-1.7-1.2-3.2-3.3-3.2z" />
                        <path fill="#1A1F71" d="M7.2 5.3C6 5.3 5 6 4.6 7.1L2 5.8v4.7h1.5V8.6c0-1.3.8-2 2-2 .8 0 1.5.4 1.5 1.3v2.2h1.5V8.5c0-1.7-1.2-3.2-3.3-3.2z" />
                    </svg>
                )
            case 'mastercard':
                return (
                    <svg className="h-8 w-8" viewBox="0 0 24 16">
                        <path fill="#FF5F00" d="M15.3 3.2c-2.1 0-3.8 1.7-3.8 3.8s1.7 3.8 3.8 3.8c.9 0 1.7-.3 2.4-.8.7-.5 1.2-1.2 1.4-2.1h-3.8v-1.8h5.3c.1.3.1.7.1 1 0 2.6-2.1 4.7-4.7 4.7-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7c1.1 0 2.1.4 2.9 1 .2.2.4.4.6.6l1.3-1.3c-.3-.3-.7-.6-1.1-.8-.9-.5-1.9-.8-3-.8-3.3 0-6 2.7-6 6s2.7 6 6 6c3.3 0 6-2.7 6-6 0-1.5-.6-2.9-1.5-4l-1.4 1.4c.6.8 1 1.8 1 2.9 0 2.1-1.7 3.8-3.8 3.8s-3.8-1.7-3.8-3.8 1.7-3.8 3.8-3.8z" />
                    </svg>
                )
            default:
                return (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                )
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Moyens de paiement</h2>
                <Button
                    size="sm"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Ajouter un moyen de paiement
                </Button>
            </div>

            <div className="space-y-4">
                {methods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                            {getCardIcon(method.details.brand)}
                            <div>
                                <p className="font-medium">
                                    {method.details.brand.toUpperCase()} •••• {method.details.last4}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Expire le {method.details.exp_month}/{method.details.exp_year}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="danger"
                            size="sm"
                            loading={isDeleting === method.id}
                            onClick={() => handleDeletePaymentMethod(method.id)}
                        >
                            Supprimer
                        </Button>
                    </div>
                ))}

                {methods.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        Aucun moyen de paiement enregistré
                    </div>
                )}
            </div>

            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Ajouter un moyen de paiement"
                actionText="Enregistrer"
                disableBackdropClose
            >
                <StripePayment
                    onSuccess={handleAddPaymentMethod}
                />
            </Modal>
        </div>
    )
}

export default PaymentMethod