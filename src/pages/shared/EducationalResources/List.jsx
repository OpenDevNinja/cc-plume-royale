// src/components/shared/EducationalResources/List.jsx
import ResourceCard from '../../../components/educational/ResourceCard'
import EmptyState from '../../../components/common/EmptyState'
import SearchInput from '../../../components/common/SearchInput'
import Select from '../../../components/common/Select'
import { useState } from 'react'

const SUBJECTS = [
    { value: 'all', label: 'Toutes les matières' },
    { value: 'math', label: 'Mathématiques' },
    { value: 'french', label: 'Français' },
    { value: 'science', label: 'Sciences' }
]

const LEVELS = [
    { value: 'all', label: 'Tous niveaux' },
    { value: '1', label: 'CE2' },
    { value: '2', label: 'CM1' },
    { value: '3', label: 'CM2' }
]

function ResourceList({ resources }) {
    const [search, setSearch] = useState('')
    const [subject, setSubject] = useState('all')
    const [level, setLevel] = useState('all')

    const filteredResources = resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(search.toLowerCase()) ||
            resource.description.toLowerCase().includes(search.toLowerCase())
        const matchesSubject = subject === 'all' || resource.subject === subject
        const matchesLevel = level === 'all' || resource.level.toString() === level
        return matchesSearch && matchesSubject && matchesLevel
    })

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <SearchInput
                    placeholder="Rechercher des ressources..."
                    value={search}
                    onChange={setSearch}
                />
                <Select
                    options={SUBJECTS}
                    value={subject}
                    onChange={setSubject}
                    label="Matière"
                />
                <Select
                    options={LEVELS}
                    value={level}
                    onChange={setLevel}
                    label="Niveau"
                />
            </div>

            {filteredResources.length === 0 ? (
                <EmptyState
                    title="Aucune ressource trouvée"
                    description="Essayez de modifier vos critères de recherche"
                    icon="book-open"
                />
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredResources.map(resource => (
                        <ResourceCard
                            key={resource.id}
                            resource={resource}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ResourceList