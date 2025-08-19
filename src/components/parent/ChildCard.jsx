import React from 'react'
import PropTypes from 'prop-types'
import ProgressBar from '../common/ProgressBar'
import Badge from '../common/Badge'

const ChildCard = ({ child }) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <img
                            className="h-16 w-16 rounded-full object-cover"
                            src={child.avatar || '/assets/images/avatars/default.png'}
                            alt={child.firstName}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                            {child.firstName} {child.lastName}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                            {child.gradeLevel === 'ce2' && 'CE2'}
                            {child.gradeLevel === 'cm1' && 'CM1'}
                            {child.gradeLevel === 'cm2' && 'CM2'}
                            {child.gradeLevel === '6e' && '6ème'}
                        </p>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Progression globale</h4>
                        <ProgressBar value={child.overallProgress || 0} />
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Badges récents</h4>
                        <div className="flex space-x-2">
                            {child.recentBadges?.length > 0 ? (
                                child.recentBadges.slice(0, 3).map(badge => (
                                    <Badge key={badge.id} color="primary" size="sm">
                                        {badge.name}
                                    </Badge>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">Aucun badge encore</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-6 py-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Activité récente</span>
                    <span className="font-medium text-primary-600">
                        {child.lastActivity || 'Aucune activité'}
                    </span>
                </div>
            </div>
        </div>
    )
}

ChildCard.propTypes = {
    child: PropTypes.shape({
        id: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        gradeLevel: PropTypes.string.isRequired,
        overallProgress: PropTypes.number,
        recentBadges: PropTypes.array,
        lastActivity: PropTypes.string
    }).isRequired
}

export default ChildCard