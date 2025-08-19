// src/components/educational/ResourceList.jsx
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import Icon from '../common/Icon'

const ResourceList = ({ resources = [] }) => {
    if (resources.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Aucune ressource disponible</p>
            </div>
        )
    }

    return (
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                            Titre
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Matière
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Niveau
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4">
                            <span className="sr-only">Voir</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {resources.map((resource) => (
                        <tr key={resource.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                <div className="flex items-center">
                                    <Icon icon={resource.type === 'pdf' ? 'DocumentTextIcon' : 'FilmIcon'} className="h-5 w-5 mr-2 text-gray-400" />
                                    {resource.title}
                                </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {resource.subject}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                Niveau {resource.level}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                                <Link
                                    to={`${ROUTES.VIEW_RESOURCE}/${resource.id}`}
                                    className="text-primary-600 hover:text-primary-900"
                                >
                                    Voir<span className="sr-only">, {resource.title}</span>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

ResourceList.propTypes = {
    resources: PropTypes.array
}

export default ResourceList