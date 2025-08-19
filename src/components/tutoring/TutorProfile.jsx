// src/components/tutoring/TutorProfile.jsx
import { useParams } from 'react-router-dom'
import { fetchTutorById } from '../../../api/tutoring'
import { useQuery } from 'react-query'
import Avatar from '../common/Avatar'
import Button from '../common/Button'
import Loader from '../common/Loader'
import ErrorMessage from '../common/ErrorMessage'
import { ROUTES } from '../../../config/routes'

function TutorProfile() {
    const { id } = useParams()

    const { data: tutor, isLoading, error } = useQuery(
        ['tutor', id],
        () => fetchTutorById(id),
        { retry: false }
    )

    if (isLoading) return <Loader />
    if (error) return <ErrorMessage message={error.message} />

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/3 p-6 flex flex-col items-center">
                        <Avatar
                            src={tutor.avatar}
                            size="xxl"
                            alt={tutor.name}
                        />
                        <h2 className="mt-4 text-xl font-bold">{tutor.name}</h2>
                        <p className="text-gray-600">{tutor.subject} • {tutor.experience} ans d'expérience</p>

                        <div className="mt-6 w-full space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tarif:</span>
                                <span className="font-medium">{tutor.rate}€/h</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Note:</span>
                                <div className="flex items-center">
                                    <span className="font-medium mr-1">{tutor.rating}</span>
                                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-2/3 p-6 border-t md:border-t-0 md:border-l border-gray-200">
                        <h3 className="text-lg font-medium mb-4">À propos</h3>
                        <p className="text-gray-700 mb-6">{tutor.bio}</p>

                        <h3 className="text-lg font-medium mb-4">Disponibilités</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {tutor.availability.map((slot, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                                >
                                    {slot}
                                </span>
                            ))}
                        </div>

                        <h3 className="text-lg font-medium mb-4">Qualifications</h3>
                        <ul className="list-disc pl-5 space-y-1 mb-6">
                            {tutor.qualifications.map((qual, index) => (
                                <li key={index}>{qual}</li>
                            ))}
                        </ul>

                        <div className="flex justify-end">
                            <Button to={`${ROUTES.BOOK_TUTOR}/${tutor.id}`}>
                                Réserver une session
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TutorProfile