// src/components/common/Tab.jsx
import PropTypes from 'prop-types'

const Tab = ({ tabs, activeTab, onChange, className = '' }) => {
    return (
        <div className={`border-b border-gray-200 ${className}`}>
            <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                ? 'border-primary-500 text-primary-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        {tab.label}
                        {tab.count && (
                            <span
                                className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${activeTab === tab.id
                                        ? 'bg-primary-100 text-primary-800'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}
                            >
                                {tab.count}
                            </span>
                        )}
                    </button>
                ))}
            </nav>
        </div>
    )
}

Tab.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            count: PropTypes.number
        })
    ).isRequired,
    activeTab: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default Tab