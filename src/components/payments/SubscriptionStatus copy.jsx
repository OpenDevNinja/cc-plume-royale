// src/components/payments/SubscriptionStatus.jsx
import PropTypes from 'prop-types'
import Badge from '../common/Badge'

const SubscriptionStatus = ({ status }) => {
    const statusConfig = {
        active: {
            color: 'success',
            text: 'Actif'
        },
        canceled: {
            color: 'danger',
            text: 'Annulé'
        },
        pending: {
            color: 'warning',
            text: 'En attente'
        },
        expired: {
            color: 'danger',
            text: 'Expiré'
        }
    }

    return (
        <Badge variant={statusConfig[status]?.color || 'gray'}>
            {statusConfig[status]?.text || 'Inconnu'}
        </Badge>
    )
}

SubscriptionStatus.propTypes = {
    status: PropTypes.oneOf(['active', 'canceled', 'pending', 'expired']).isRequired
}

export default SubscriptionStatus