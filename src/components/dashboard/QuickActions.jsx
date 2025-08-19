// src/components/dashboard/QuickActions.jsx
import PropTypes from 'prop-types'
import Button from '../common/Button'
import { Link } from 'react-router-dom'

const QuickActions = ({ actions }) => {
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Actions rapides</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {actions.map((action, index) => (
                    <Link key={index} to={action.link}>
                        <Button variant="outline" fullWidth className="flex flex-col items-center py-4">
                            <div className="h-10 w-10 mb-2 flex items-center justify-center rounded-full bg-primary-100 text-primary-600">
                                <action.icon className="h-5 w-5" />
                            </div>
                            <span className="text-sm">{action.title}</span>
                        </Button>
                    </Link>
                ))}
            </div>
        </div>
    )
}

QuickActions.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            icon: PropTypes.elementType.isRequired,
            link: PropTypes.string.isRequired
        })
    ).isRequired
}

export default QuickActions