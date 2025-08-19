import React, { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import RadioGroup from '@/components/common/RadioGroup'

import {
    FiCreditCard,     // Credit Card
    FiPlus,           // Plus
    FiTrash2          // Trash (note the '2' suffix)
} from "react-icons/fi";
const paymentMethods = [
    {
        id: '1',
        type: 'card',
        last4: '4242',
        brand: 'visa',
        expiry: '12/25',
        primary: true
    },
    {
        id: '2',
        type: 'card',
        last4: '5555',
        brand: 'mastercard',
        expiry: '08/24',
        primary: false
    }
]

const PaymentMethods = () => {
    const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id)
    const [showAddForm, setShowAddForm] = useState(false)

    const handleSetPrimary = (methodId) => {
        setSelectedMethod(methodId)
    }

    const handleDeleteMethod = (methodId) => {
        console.log('Delete method', methodId)
    }

    return (
        <DashboardLayout title="Moyens de paiement">
            <div className="space-y-6">
                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">Moyens de paiement enregistrés</h3>

                        <RadioGroup value={selectedMethod} onChange={setSelectedMethod}>
                            <div className="space-y-3">
                                {paymentMethods.map(method => (
                                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center">
                                            <RadioGroup.Option value={method.id} className="mr-4" />
                                            <FiCreditCard className="h-8 w-8 text-gray-400 mr-3" />
                                            <div>
                                                <p className="font-medium">
                                                    Carte {method.brand === 'visa' ? 'Visa' : 'Mastercard'} •••• {method.last4}
                                                </p>
                                                <p className="text-sm text-gray-500">Expire le {method.expiry}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            {method.primary && (
                                                <span className="px-2 py-1 text-xs rounded bg-success-100 text-success-800">
                                                    Principal
                                                </span>
                                            )}
                                            <button
                                                onClick={() => handleDeleteMethod(method.id)}
                                                className="text-gray-400 hover:text-danger-500"
                                            >
                                                <FiTrash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>

                        <div className="mt-6">
                            <Button
                                variant="outline"
                                icon={FiPlus}
                                onClick={() => setShowAddForm(!showAddForm)}
                            >
                                Ajouter un moyen de paiement
                            </Button>
                        </div>
                    </div>
                </Card>

                {showAddForm && (
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-medium mb-4">Ajouter une carte</h3>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Numéro de carte</label>
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Titulaire de la carte</label>
                                    <input
                                        type="text"
                                        placeholder="Nom complet"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">Date d'expiration</label>
                                    <input
                                        type="text"
                                        placeholder="MM/AA"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                                    <input
                                        type="text"
                                        placeholder="123"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    Annuler
                                </Button>
                                <Button variant="primary">
                                    Enregistrer la carte
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}

                <div className="flex justify-end">
                    <Button variant="primary">
                        Enregistrer les modifications
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default PaymentMethods