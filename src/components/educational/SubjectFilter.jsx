// src/components/educational/SubjectFilter.jsx
function SubjectFilter({
    subjects,
    selectedSubject,
    onSelect,
    className = ''
}) {
    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            <button
                onClick={() => onSelect(null)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${!selectedSubject
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
            >
                Toutes
            </button>
            {subjects.map((subject) => (
                <button
                    key={subject.value}
                    onClick={() => onSelect(subject.value)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${selectedSubject === subject.value
                            ? 'bg-primary-100 text-primary-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                >
                    {subject.label}
                </button>
            ))}
        </div>
    )
}

export default SubjectFilter