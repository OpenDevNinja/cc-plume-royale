// src/pages/admin/Settings/Payment.jsx
import AdminLayout from '../../../../components/layout/AdminLayout'
import { Tab } from '../../../../components/common/Tab'
import PaymentMethods from '../../../../components/payments/PaymentMethod'
import BillingHistory from '../../../../components/payments/InvoiceList'
import { useState } from 'react'

function PaymentSettings() {
    const [activeTab, setActiveTab] = useState('methods')

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Paramètres de paiement</h1>

                <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8">
                        <Tab
                            active={activeTab === 'methods'}
                            onClick={() => setActiveTab('methods')}
                        >
                            Méthodes de paiement
                        </Tab>
                        <Tab
                            active={activeTab === 'history'}
                            onClick={() => setActiveTab('history')}
                        >
                            Historique de facturation
                        </Tab>
                    </nav>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    {activeTab === 'methods' ? (
                        <PaymentMethods />
                    ) : (
                        <BillingHistory />
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}

export default PaymentSettings