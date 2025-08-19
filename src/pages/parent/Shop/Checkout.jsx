import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import RadioGroup from '@/components/common/RadioGroup'
//import { CheckIcon } from '@heroicons/react/outline'
import { FiCheck } from "react-icons/fi";
const CheckoutPage = () => {
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState('card')
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'France',
        cardNumber: '',
        cardExpiry: '',
        cardCvv: ''
    })

    const cartItems = [
        {
            id: '1',
            name: 'Cahier d\'activités Mathématiques CM1',
            price: 7.99,
            quantity: 1
        },
        {
            id: '2',
            name: 'Kit scientifique',
            price: 24.99,
            quantity: 1
        }
    ]

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shipping = 4.99
    const total = subtotal + shipping

    const handleSubmit = (e) => {
        e.preventDefault()
        // Ici, on intégrerait avec l'API de paiement
        console.log('Order submitted', { ...formData, paymentMethod })
        navigate(ROUTES.PARENT_ORDERS)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <DashboardLayout title="Finaliser la commande">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <Card>
                            <div className="p-6">
                                <h3 className="text-lg font-medium mb-4">Informations de livraison</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input
                                        label="Prénom"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Input
                                        label="Nom"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <Input
                                    label="Adresse"
                                    name="address"
                                    className="mt-4"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                                    <Input
                                        label="Code postal"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <div className="sm:col-span-2">
                                        <Input
                                            label="Ville"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <Input
                                    label="Pays"
                                    name="country"
                                    className="mt-4"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </Card>

                        <Card>
                            <div className="p-6">
                                <h3 className="text-lg font-medium mb-4">Méthode de paiement</h3>
                                <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                                    <div className="space-y-3">
                                        <div className="flex items-center p-4 border rounded-lg">
                                            <RadioGroup.Option value="card" className="mr-4" />
                                            <div>
                                                <h4 className="font-medium">Carte de crédit</h4>
                                                <p className="text-sm text-gray-500">Paiement sécurisé par carte bancaire</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-4 border rounded-lg">
                                            <RadioGroup.Option value="paypal" className="mr-4" />
                                            <div>
                                                <h4 className="font-medium">PayPal</h4>
                                                <p className="text-sm text-gray-500">Payer avec votre compte PayPal</p>
                                            </div>
                                        </div>
                                    </div>
                                </RadioGroup>

                                {paymentMethod === 'card' && (
                                    <div className="mt-6 space-y-4">
                                        <Input
                                            label="Numéro de carte"
                                            name="cardNumber"
                                            placeholder="1234 5678 9012 3456"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input
                                                label="Date d'expiration"
                                                name="cardExpiry"
                                                placeholder="MM/AA"
                                                value={formData.cardExpiry}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <Input
                                                label="CVV"
                                                name="cardCvv"
                                                placeholder="123"
                                                value={formData.cardCvv}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <div className="p-6">
                                <h3 className="text-lg font-medium mb-4">Votre commande</h3>
                                <div className="divide-y divide-gray-200">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="py-3 flex justify-between">
                                            <span>
                                                {item.name} × {item.quantity}
                                            </span>
                                            <span>{(item.price * item.quantity).toFixed(2)} €</span>
                                        </div>
                                    ))}
                                    <div className="py-3 flex justify-between">
                                        <span>Livraison</span>
                                        <span>{shipping.toFixed(2)} €</span>
                                    </div>
                                    <div className="py-3 flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>{total.toFixed(2)} €</span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-full"
                                        icon={FiCheck}
                                    >
                                        Confirmer et payer
                                    </Button>
                                </div>

                                <p className="mt-4 text-xs text-gray-500">
                                    En cliquant sur ce bouton, vous acceptez nos Conditions Générales de Vente et confirmez avoir pris connaissance de notre Politique de Confidentialité.
                                </p>
                            </div>
                        </Card>

                        <Card>
                            <div className="p-6">
                                <h3 className="text-lg font-medium mb-2">Livraison</h3>
                                <p className="text-sm text-gray-500">
                                    Les articles numériques seront disponibles immédiatement après le paiement. Les articles physiques seront expédiés sous 2-3 jours ouvrés.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </form>
        </DashboardLayout>
    )
}

export default CheckoutPage