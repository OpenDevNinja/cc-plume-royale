import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../../config/routes'
import { useTutors } from '../../../../hooks/useTutors'
import { useTutoring } from '../../../../hooks/useTutoring'
import Card from '../../../common/Card'
import Avatar from '../../../common/Avatar'
import Button from '../../../common/Button'
import { StarRating } from '../../../common/StarRating'
import { Calendar } from '../../../common/Calendar'
import { TimeSlotPicker } from '../../../common/TimeSlotPicker'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Input from '../../../common/Input'
import Textarea from '../../../common/Textarea'
import { CheckIcon, XIcon } from '@heroicons/react/outline'

const BookSession = () => {
    const { id } = useParams()
    const { getTutorById } = useTutors()
    const { bookSession } = useTutoring()
    const navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedTime, setSelectedTime] = useState(null)

    const tutor = getTutorById(id)

    if (!tutor) {
        navigate(ROUTES.TUTORS)
        return null
    }

    const availableTimeSlots = [
        '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
    ]

    const initialValues = {
        subject: '',
        notes: '',
        childId: ''
    }

    const validationSchema = Yup.object().shape({
        subject: Yup.string().required('Le sujet est requis'),
        childId: Yup.string().required('Veuillez sélectionner un enfant')
    })

    const handleSubmit = async (values) => {
        if (!selectedDate || !selectedTime) {
            alert('Veuillez sélectionner une date et une heure')
            return
        }

        const sessionData = {
            tutorId: tutor.id,
            childId: values.childId,
            subject: values.subject,
            notes: values.notes,
            date: selectedDate,
            time: selectedTime
        }

        await bookSession(sessionData)
        navigate(ROUTES.PARENT_DASHBOARD)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <div className="p-6 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <Avatar
                            src={tutor.avatar}
                            alt={`${tutor.firstName} ${tutor.lastName}`}
                            size="xl"
                        />
                        <div>
                            <h2 className="text-2xl font-bold">
                                {tutor.firstName} {tutor.lastName}
                            </h2>
                            <p className="text-primary-600 text-lg">{tutor.specialty}</p>
                            <StarRating rating={tutor.rating} />
                            <p className="mt-2 text-gray-600">
                                <span className="font-bold">{tutor.hourlyRate} €/h</span> - {tutor.qualifications.join(', ')}
                            </p>
                        </div>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, values }) => (
                            <Form className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-medium">Choisissez une date</h3>
                                        <Calendar
                                            availability={tutor.availability}
                                            selectedDate={selectedDate}
                                            onSelectDate={setSelectedDate}
                                        />

                                        {selectedDate && (
                                            <>
                                                <h3 className="text-lg font-medium">Choisissez une heure</h3>
                                                <TimeSlotPicker
                                                    slots={availableTimeSlots}
                                                    selectedSlot={selectedTime}
                                                    onSelectSlot={setSelectedTime}
                                                />
                                            </>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="text-lg font-medium">Détails de la session</h3>

                                        <Input
                                            label="Sujet"
                                            name="subject"
                                            placeholder="Ex: Fractions, Conjugaison..."
                                            required
                                        />

                                        <Select
                                            label="Enfant"
                                            name="childId"
                                            options={[
                                                { value: '1', label: 'Emma (CM1)' },
                                                { value: '2', label: 'Lucas (CE2)' }
                                            ]}
                                            required
                                        />

                                        <Textarea
                                            label="Notes supplémentaires (optionnel)"
                                            name="notes"
                                            rows={3}
                                            placeholder="Précisez vos attentes ou les points à aborder..."
                                        />

                                        <div className="pt-4">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h4 className="font-medium mb-2">Récapitulatif</h4>
                                                {selectedDate && selectedTime ? (
                                                    <div className="space-y-1">
                                                        <p>
                                                            <span className="font-medium">Date:</span> {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium">Heure:</span> {selectedTime}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium">Prix:</span> {tutor.hourlyRate} €
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500">Sélectionnez une date et une heure</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-end space-x-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => navigate(ROUTES.TUTORS)}
                                                icon={XIcon}
                                            >
                                                Annuler
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="primary"
                                                disabled={!selectedDate || !selectedTime}
                                                loading={isSubmitting}
                                                icon={CheckIcon}
                                            >
                                                Confirmer la réservation
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Card>
        </div>
    )
}

export default BookSession