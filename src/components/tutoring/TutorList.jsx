// src/components/tutoring/TutorList.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import Card from '../common/Card'
import Avatar from '../common/Avatar'
import Button from '../common/Button'
import Select from '../common/Select'
import SearchInput from '../common/SearchInput'
import { useTutors } from '../../hooks/useTutors'

const SUBJECTS = [
    { value: 'all', label: 'Toutes les matières' },
    { value: 'math', label: 'Mathématiques' },
    { value: 'french', label: 'Français' },
    { value: 'science', label: 'Sciences' }
]

const AVAILABILITY = [
    { value: 'all', label: 'Tous les horaires' },
    { value: 'morning', label: 'Matin (8h-12h)' },
    { value: 'afternoon', label: 'Après-midi (12h-17h)' },
    { value: 'evening', label: 'Soir (17h-20h)' }
]

function TutorList() {
    const [search, setSearch] = useState('')
    const [subjectFilter, setSubjectFilter] = useState('all')
    const [availabilityFilter, setAvailabilityFilter] = useState('all')

    const { tutors, isLoading } = useTutors({
        search,
        subject: subjectFilter !== 'all' ? subjectFilter : undefined,
        availability: availabilityFilter !== 'all' ? availabilityFilter : undefined
    })

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="md:col-span-1">
                    <SearchInput
                        placeholder="Rechercher un tuteur..."
                        value={search}
                        onChange={setSearch}
                    />
                </div>
                <div>
                    <Select
                        options={SUBJECTS}
                        value={subjectFilter}
                        onChange={setSubjectFilter}
                        label="Matière"
                    />
                </div>
                <div>
                    <Select
                        options={AVAILABILITY}
                        value={availabilityFilter}
                        onChange={setAvailabilityFilter}
                        label="Disponibilité"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tutors.map(tutor => (
                        <Card key={tutor.id}>
                            <div className="flex flex-col items-center text-center space-y-4">
                                <Avatar
                                    src={tutor.avatar}
                                    size="xl"
                                    alt={tutor.name}
                                />
                                <div>
                                    <h3 className="text-lg font-medium">{tutor.name}</h3>
                                    <p className="text-gray-500">{tutor.subject}</p>
                                    <p className="text-sm text-gray-500 mt-1">{tutor.experience} ans d'expérience</p>
                                </div>

                                <div className="w-full space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Disponibilité:</span>
                                        <span>{tutor.availability.join(', ')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Tarif:</span>
                                        <span className="font-medium">{tutor.rate}€/h</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Note:</span>
                                        <div className="flex items-center">
                                            <span className="font-medium mr-1">{tutor.rating}</span>
                                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to={`${ROUTES.BOOK_TUTOR}/${tutor.id}`}
                                    className="w-full"
                                >
                                    <Button variant="outline" fullWidth>
                                        Réserver
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TutorList