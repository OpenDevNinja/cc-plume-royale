// src/components/payments/SubscriptionCard.jsx
import PropTypes from 'prop-types'
import Button from '../common/Button'

const SubscriptionCard = ({ subscription, onCancel, onRenew }) => {
    if (!subscription) {
        return (
            <div className="bg-white shadow rounded-lg p-6 text-center">
                <p className="text-gray-500">Aucun abonnement actif</p>
            </div>
        )
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">{subscription.plan}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Prochain paiement: {subscription.nextPaymentDate}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        Statut: <span className="font-medium">{subscription.status}</span>
                    </p>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={onRenew}>
                        Renouveler
                    </Button>
                    <Button variant="danger" size="sm" onClick={onCancel}>
                        Annuler
                    </Button>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900">Historique des paiements</h4>
                <ul className="mt-2 space-y-2">
                    {subscription.payments.map((payment, index) => (
                        <li key={index} className="flex justify-between text-sm">
                            <span className="text-gray-500">{payment.date}</span>
                            <span className="font-medium">{payment.amount} €</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

SubscriptionCard.propTypes = {
    subscription: PropTypes.shape({
        plan: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        nextPaymentDate: PropTypes.string.isRequired,
        payments: PropTypes.arrayOf(
            PropTypes.shape({
                date: PropTypes.string.isRequired,
                amount: PropTypes.number.isRequired
            })
        ).isRequired
    }),
    onCancel: PropTypes.func.isRequired,
    onRenew: PropTypes.func.isRequired
}

export default SubscriptionCard