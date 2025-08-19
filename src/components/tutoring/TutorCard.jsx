// src/components/tutoring/TutorCard.jsx
import { Link } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import Avatar from '../common/Avatar'
import Button from '../common/Button'
import Rating from '../common/Rating'

function TutorCard({ tutor }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
                <div className="flex flex-col items-center text-center">
                    <Avatar
                        src={tutor.avatar}
                        size="xl"
                        alt={tutor.name}
                        className="mb-4"
                    />
                    <h3 className="text-lg font-medium text-gray-900">{tutor.name}</h3>
                    <p className="text-primary-600">{tutor.specialty}</p>
                    <Rating value={tutor.rating} className="mt-2" />

                    <div className="mt-4 text-sm text-gray-500">
                        <p>{tutor.experience} ans d'expérience</p>
                        <p className="mt-1">{tutor.lessonsGiven} leçons données</p>
                    </div>

                    <div className="mt-6 w-full">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-500">Tarif:</span>
                            <span className="font-medium">{tutor.hourlyRate}€/h</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Disponibilité:</span>
                            <span>{tutor.availability.join(', ')}</span>
                        </div>
                    </div>

                    <Link
                        to={`${ROUTES.BOOK_TUTOR}/${tutor.id}`}
                        className="mt-6 w-full"
                    >
                        <Button variant="primary" fullWidth>
                            Réserver une session
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TutorCard