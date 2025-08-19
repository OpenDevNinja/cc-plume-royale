// src/components/payments/PaymentMethod.jsx
import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../common/Button'
import Modal from '../common/Modal'
import StripePayment from './StripePayment'

const PaymentMethod = ({ card, onUpdate }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Méthode de paiement</h3>

            {card ? (
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-700">
                            Carte {card.brand} terminant par {card.last4}
                        </p>
                        <p className="text-sm text-gray-500">
                            Expire le {card.expMonth}/{card.expYear}
                        </p>
                    </div>
                    <Button variant="outline" onClick={() => setShowModal(true)}>
                        Modifier
                    </Button>
                </div>
            ) : (
                <div className="text-center py-4">
                    <p className="text-gray-500 mb-4">Aucune méthode de paiement enregistrée</p>
                    <Button onClick={() => setShowModal(true)}>
                        Ajouter une carte
                    </Button>
                </div>
            )}

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={card ? 'Modifier la carte' : 'Ajouter une carte'}
            >
                <StripePayment
                    onSuccess={() => {
                        onUpdate()
                        setShowModal(false)
                    }}
                    onError={() => setShowModal(false)}
                />
            </Modal>
        </div>
    )
}

PaymentMethod.propTypes = {
    card: PropTypes.shape({
        brand: PropTypes.string.isRequired,
        last4: PropTypes.string.isRequired,
        expMonth: PropTypes.number.isRequired,
        expYear: PropTypes.number.isRequired
    }),
    onUpdate: PropTypes.func.isRequired
}

export default PaymentMethod