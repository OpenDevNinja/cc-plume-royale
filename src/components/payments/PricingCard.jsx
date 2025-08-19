// src/components/payments/PricingCard.jsx
import PropTypes from 'prop-types'
import Button from '../common/Button'

const PricingCard = ({
    title,
    price,
    period,
    features,
    isPopular = false,
    isCurrent = false,
    onClick
}) => {
    return (
        <div
            className={`relative rounded-lg border ${isPopular ? 'border-primary-500 shadow-lg' : 'border-gray-200'
                } p-6`}
        >
            {isPopular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4">
                    <span className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Populaire
                    </span>
                </div>
            )}

            <h3 className="text-lg font-medium">{title}</h3>
            <div className="mt-4">
                <span className="text-4xl font-bold">{price}€</span>
                <span className="text-base font-medium text-gray-500">/{period}</span>
            </div>

            <ul className="mt-6 space-y-3">
                {features.map((feature, index) => (
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
                    variant={isPopular ? 'primary' : 'outline'}
                    fullWidth
                    onClick={onClick}
                    disabled={isCurrent}
                >
                    {isCurrent ? 'Plan actuel' : 'Choisir ce plan'}
                </Button>
            </div>
        </div>
    )
}

PricingCard.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    period: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    isPopular: PropTypes.bool,
    isCurrent: PropTypes.bool,
    onClick: PropTypes.func.isRequired
}

export default PricingCard