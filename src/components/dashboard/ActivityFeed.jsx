// src/components/dashboard/ActivityFeed.jsx
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Badge from '../common/Badge'

const ActivityFeed = ({ activities = [] }) => {
    if (activities.length === 0) {
        return (
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Activité récente</h2>
                <p className="text-sm text-gray-500">Aucune activité récente</p>
            </div>
        )
    }

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Activité récente</h2>
            <div className="flow-root">
                <ul className="-mb-8">
                    {activities.map((activity, activityIdx) => (
                        <li key={activity.id}>
                            <div className="relative pb-8">
                                {activityIdx !== activities.length - 1 ? (
                                    <span
                                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                        aria-hidden="true"
                                    />
                                ) : null}
                                <div className="relative flex space-x-3">
                                    <div>
                                        <Badge variant={activity.type === 'game' ? 'primary' : 'success'}>
                                            {activity.type === 'game' ? 'Jeu' : 'Ressource'}
                                        </Badge>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                        <div>
                                            <p className="text-sm text-gray-800">
                                                {activity.description}
                                            </p>
                                        </div>
                                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                            <time dateTime={activity.datetime}>
                                                {format(new Date(activity.datetime), 'PPp', { locale: fr })}
                                            </time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

ActivityFeed.propTypes = {
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['game', 'resource']).isRequired,
            description: PropTypes.string.isRequired,
            datetime: PropTypes.string.isRequired
        })
    )
}

export default ActivityFeed