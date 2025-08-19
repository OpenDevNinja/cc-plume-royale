// src/pages/admin/Settings/Payment.jsx
import { useState, useEffect } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
 import { getPaymentSettings, updatePaymentSettings } from '@/data/services/paymentService'
import { showSuccessNotification } from '@/utils/notifications'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import Select from '@/components/common/Select'
// import getPaymentSettings from '../../../data/services/paymentService'
// import updatePaymentSettings from '../../../data/services/paymentService'

const PAYMENT_METHODS = [
    { value: 'stripe', label: 'Stripe' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank_transfer', label: 'Virement bancaire' }
]

function PaymentSettings() {
    const [settings, setSettings] = useState({
        paymentMethod: 'stripe',
        stripePublicKey: '',
        stripeSecretKey: '',
        paypalClientId: '',
        bankAccount: ''
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const data = await getPaymentSettings()
                setSettings(data)
            } catch (error) {
                console.error('Failed to load payment settings:', error)
            } finally {
                setIsLoading(false)
            }
        }
        loadSettings()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setSettings(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await updatePaymentSettings(settings)
            showSuccessNotification('Paramètres de paiement mis à jour!')
        } catch (error) {
            console.error('Failed to update payment settings:', error)
        }
    }

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Paramètres de paiement</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
                    <Select
                        label="Méthode de paiement principale"
                        options={PAYMENT_METHODS}
                        value={settings.paymentMethod}
                        onChange={(value) => setSettings(prev => ({ ...prev, paymentMethod: value }))}
                    />

                    {settings.paymentMethod === 'stripe' && (
                        <>
                            <Input
                                label="Clé publique Stripe"
                                name="stripePublicKey"
                                value={settings.stripePublicKey}
                                onChange={handleChange}
                                placeholder="pk_test_..."
                            />
                            <Input
                                label="Clé secrète Stripe"
                                name="stripeSecretKey"
                                value={settings.stripeSecretKey}
                                onChange={handleChange}
                                placeholder="sk_test_..."
                                type="password"
                            />
                        </>
                    )}

                    {settings.paymentMethod === 'paypal' && (
                        <Input
                            label="ID client PayPal"
                            name="paypalClientId"
                            value={settings.paypalClientId}
                            onChange={handleChange}
                            placeholder="AY..."
                        />
                    )}

                    {settings.paymentMethod === 'bank_transfer' && (
                        <Input
                            label="Coordonnées bancaires"
                            name="bankAccount"
                            value={settings.bankAccount}
                            onChange={handleChange}
                            placeholder="IBAN, BIC, etc."
                            multiline
                        />
                    )}

                    <div className="pt-4">
                        <Button type="submit" variant="primary">
                            Enregistrer les modifications
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}

export default PaymentSettings