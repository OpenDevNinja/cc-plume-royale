// src/components/tutoring/TutorFilter.jsx
import { useState } from 'react'
import Select from '../common/Select'
import Input from '../common/Input'

const SUBJECT_OPTIONS = [
    { value: 'all', label: 'Toutes les matières' },
    { value: 'math', label: 'Mathématiques' },
    { value: 'french', label: 'Français' },
    { value: 'science', label: 'Sciences' }
]

const AVAILABILITY_OPTIONS = [
    { value: 'all', label: 'Toute disponibilité' },
    { value: 'morning', label: 'Matin (8h-12h)' },
    { value: 'afternoon', label: 'Après-midi (12h-17h)' },
    { value: 'evening', label: 'Soir (17h-20h)' }
]

const EXPERIENCE_OPTIONS = [
    { value: 'any', label: 'Toute expérience' },
    { value: '1', label: '1+ an' },
    { value: '3', label: '3+ ans' },
    { value: '5', label: '5+ ans' }
]

function TutorFilter({
    onFilterChange,
    className = ''
}) {
    const [filters, setFilters] = useState({
        subject: 'all',
        availability: 'all',
        experience: 'any',
        search: ''
    })

    const handleChange = (name, value) => {
        const newFilters = { ...filters, [name]: value }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    return (
        <div className={`bg-white p-4 rounded-lg shadow-sm ${className}`}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="md:col-span-1">
                    <Input
                        label="Recherche"
                        placeholder="Nom du tuteur..."
                        value={filters.search}
                        onChange={(e) => handleChange('search', e.target.value)}
                    />
                </div>

                <div>
                    <Select
                        label="Matière"
                        options={SUBJECT_OPTIONS}
                        value={filters.subject}
                        onChange={(value) => handleChange('subject', value)}
                    />
                </div>

                <div>
                    <Select
                        label="Disponibilité"
                        options={AVAILABILITY_OPTIONS}
                        value={filters.availability}
                        onChange={(value) => handleChange('availability', value)}
                    />
                </div>

                <div>
                    <Select
                        label="Expérience"
                        options={EXPERIENCE_OPTIONS}
                        value={filters.experience}
                        onChange={(value) => handleChange('experience', value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default TutorFilter