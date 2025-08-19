// src/components/educational/ResourceCard.jsx
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Badge from '../common/Badge'
import Icon from '../common/Icon'
import { ROUTES } from '../../config/routes'

const ResourceCard = ({ resource }) => {
    const getIcon = (type) => {
        switch (type) {
            case 'pdf':
                return 'DocumentTextIcon'
            case 'video':
                return 'FilmIcon'
            case 'article':
                return 'NewspaperIcon'
            default:
                return 'DocumentIcon'
        }
    }

    return (
        <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary-100 p-3 rounded-lg">
                        <Icon icon={getIcon(resource.type)} className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                            <Link to={`${ROUTES.VIEW_RESOURCE}/${resource.id}`}>
                                {resource.title}
                            </Link>
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <Badge>{resource.subject}</Badge>
                            <Badge variant="secondary">Niveau {resource.level}</Badge>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                        {resource.duration && `${resource.duration} min`}
                    </span>
                    <Link
                        to={`${ROUTES.VIEW_RESOURCE}/${resource.id}`}
                        className="text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                        Voir plus
                    </Link>
                </div>
            </div>
        </div>
    )
}

ResourceCard.propTypes = {
    resource: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['pdf', 'video', 'article']).isRequired,
        subject: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
        duration: PropTypes.number
    }).isRequired
}

export default ResourceCard