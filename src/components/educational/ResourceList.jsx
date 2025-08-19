// src/components/educational/ResourceList.jsx
import ResourceCard from './ResourceCard'
import EmptyState from '../common/EmptyState'
import Pagination from '../common/Pagination'

function ResourceList({
    resources,
    onResourceSelect,
    currentPage,
    totalPages,
    onPageChange,
    className = ''
}) {
    return (
        <div className={`space-y-6 ${className}`}>
            {resources.length === 0 ? (
                <EmptyState
                    title="Aucune ressource trouvée"
                    description="Essayez de modifier vos critères de recherche"
                />
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {resources.map((resource) => (
                            <ResourceCard
                                key={resource.id}
                                resource={resource}
                                onClick={() => onResourceSelect(resource)}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={onPageChange}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default ResourceList