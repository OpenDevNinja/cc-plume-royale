// src/components/dashboard/StatsCard.jsx
import PropTypes from 'prop-types'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import Badge from '../common/Badge'

const StatsCard = ({ title, value, change, changeType, link }) => {
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-base font-medium text-gray-900">{title}</h3>
            <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{value}</p>
                {change && (
                    <span
                        className={`ml-2 flex items-baseline text-sm font-medium ${changeType === 'positive' ? 'text-success-600' : 'text-danger-600'
                            }`}
                    >
                        {changeType === 'positive' ? (
                            <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-success-500" />
                        ) : (
                            <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-danger-500" />
                        )}
                        <span className="sr-only">
                            {changeType === 'positive' ? 'Increased' : 'Decreased'} by
                        </span>
                        {change}
                    </span>
                )}
            </div>
            {link && (
                <div className="mt-4">
                    <a
                        href={link}
                        className="text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                        Voir plus <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            )}
        </div>
    )
}

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    change: PropTypes.string,
    changeType: PropTypes.oneOf(['positive', 'negative']),
    link: PropTypes.string
}

export default StatsCard