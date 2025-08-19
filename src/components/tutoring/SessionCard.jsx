// src/components/tutoring/SessionCard.jsx
import { formatDateTime } from '../../../utils/date'
import Badge from '../common/Badge'
import Button from '../common/Button'

const STATUS_COLORS = {
    scheduled: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    canceled: 'bg-red-100 text-red-800',
    missed: 'bg-yellow-100 text-yellow-800'
}

function SessionCard({
    session,
    onCancel,
    onReschedule,
    className = ''
}) {
    return (
        <div className={`border rounded-lg p-4 ${className}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-medium">{session.tutorName}</h3>
                    <p className="text-sm text-gray-600">{session.subject}</p>
                </div>
                <Badge className={STATUS_COLORS[session.status]}>
                    {session.status === 'scheduled' ? 'Planifié' :
                        session.status === 'completed' ? 'Terminé' :
                            session.status === 'canceled' ? 'Annulé' : 'Manqué'}
                </Badge>
            </div>

            <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formatDateTime(session.date)}</span>
                </div>
                <div className="flex items-center text-sm">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{session.duration} minutes</span>
                </div>
            </div>

            {session.status === 'scheduled' && (
                <div className="mt-4 flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onReschedule(session.id)}
                    >
                        Replanifier
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onCancel(session.id)}
                    >
                        Annuler
                    </Button>
                </div>
            )}
        </div>
    )
}

export default SessionCard