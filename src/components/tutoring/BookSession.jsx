// src/components/tutoring/BookSession.jsx
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../config/routes'
import { useTutoring } from '../../../hooks/useTutoring'
import { useAuth } from '../../../hooks/useAuth'
import TutorProfile from './TutorProfile'
import Calendar from './Calendar'
import Button from '../common/Button'
import Loader from '../common/Loader'
import { showSuccessNotification, showErrorNotification } from '../../../utils/notifications'

function BookSession() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { getTutorById, bookTutoringSession } = useTutoring()
    const [tutor, setTutor] = useState(null)
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadTutor = async () => {
            try {
                setIsLoading(true)
                const tutorData = await getTutorById(id)
                setTutor(tutorData)
                setError(null)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadTutor()
    }, [id, getTutorById])

    const handleBookSession = async () => {
        if (!selectedSlot) return

        try {
            setIsLoading(true)
            await bookTutoringSession({
                tutorId: tutor.id,
                userId: user.id,
                date: selectedSlot.date,
                time: selectedSlot.time,
                duration: 60,
                subject: tutor.subject
            })
            showSuccessNotification('Session réservée avec succès!')
            navigate(ROUTES.TUTORS)
        } catch (err) {
            showErrorNotification(err.message || 'Erreur lors de la réservation')
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader />
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-danger-600 mb-4">{error}</div>
                <Button onClick={() => navigate(ROUTES.TUTORS)}>
                    Retour à la liste des tuteurs
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <TutorProfile tutor={tutor} />

            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Choisir un créneau</h3>
                <Calendar
                    tutorId={tutor.id}
                    onTimeSelect={setSelectedSlot}
                />

                {selectedSlot && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Récapitulatif</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Date</p>
                                <p>{new Date(selectedSlot.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Heure</p>
                                <p>{selectedSlot.time}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Durée</p>
                                <p>60 minutes</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Prix</p>
                                <p>{tutor.rate}€</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Button
                                onClick={handleBookSession}
                                loading={isLoading}
                                fullWidth
                            >
                                Confirmer la réservation
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookSession