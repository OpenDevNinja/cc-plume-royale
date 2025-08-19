// src/components/educational/ResourceGrid.jsx
import PropTypes from 'prop-types'
import ResourceCard from './ResourceCard'

const ResourceGrid = ({ resources = [] }) => {
    if (resources.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Aucune ressource disponible</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
            ))}
        </div>
    )
}

ResourceGrid.propTypes = {
    resources: PropTypes.array
}

export default ResourceGrid