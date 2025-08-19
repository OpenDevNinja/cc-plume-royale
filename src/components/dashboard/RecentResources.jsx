// src/components/dashboard/RecentResources.jsx
import PropTypes from 'prop-types'
import ResourceCard from '../educational/ResourceCard'

const RecentResources = ({ resources = [] }) => {
    if (resources.length === 0) {
        return (
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Ressources récentes</h2>
                <p className="text-sm text-gray-500">Aucune ressource récente</p>
            </div>
        )
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Ressources récentes</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {resources.slice(0, 3).map(resource => (
                    <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
        </div>
    )
}

RecentResources.propTypes = {
    resources: PropTypes.array
}

export default RecentResources