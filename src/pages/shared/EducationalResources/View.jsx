import React from 'react'
import { useParams } from 'react-router-dom'
import { ROUTES } from '../../../../config/routes'
import { useEducationalResources } from '../../../../hooks/useEducationalResources'
import DashboardLayout from '../../../../components/layout/DashboardLayout'
import Card from '../../../../components/common/Card'
import Button from '../../../../components/common/Button'
import { BookOpenIcon, DownloadIcon, StarIcon } from '@heroicons/react/outline'

const ViewResource = () => {
    const { id } = useParams()
    const { getResourceById } = useEducationalResources()
    const resource = getResourceById(id)

    if (!resource) {
        return (
            <DashboardLayout title="Ressource non trouvée">
                <Card>
                    <div className="text-center py-12">
                        <p className="text-gray-500">La ressource demandée n'existe pas</p>
                    </div>
                </Card>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout title={resource.title} backLink={ROUTES.EDUCATIONAL_RESOURCES}>
            <div className="space-y-6">
                <Card>
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            <div className="flex-shrink-0">
                                <img
                                    src={resource.thumbnail}
                                    alt={resource.title}
                                    className="h-48 w-full md:w-64 object-cover rounded-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold">{resource.title}</h2>
                                        <div className="mt-1 flex items-center">
                                            <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded mr-2">
                                                {resource.subject === 'math' && 'Mathématiques'}
                                                {resource.subject === 'french' && 'Français'}
                                                {resource.subject === 'science' && 'Sciences'}
                                            </span>
                                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                                Niveau {resource.level.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                                        <span className="font-medium">{resource.rating}</span>
                                    </div>
                                </div>

                                <p className="mt-4 text-gray-600">{resource.description}</p>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Button variant="primary" icon={BookOpenIcon}>
                                        Commencer
                                    </Button>
                                    <Button variant="outline" icon={DownloadIcon}>
                                        Télécharger
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">Contenu de la ressource</h3>

                        {resource.type === 'pdf' && (
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-600 mb-4">
                                    Cette ressource est un document PDF de {resource.duration} de lecture.
                                </p>
                                <iframe
                                    src={resource.url}
                                    className="w-full h-96 border rounded-lg"
                                    title={resource.title}
                                />
                            </div>
                        )}

                        {resource.type === 'video' && (
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-600 mb-4">
                                    Vidéo de {resource.duration} - Lecture recommandée en plein écran
                                </p>
                                <div className="aspect-w-16 aspect-h-9">
                                    <video controls className="w-full rounded-lg">
                                        <source src={resource.url} type="video/mp4" />
                                        Votre navigateur ne supporte pas la lecture de vidéos.
                                    </video>
                                </div>
                            </div>
                        )}

                        {resource.type === 'interactive' && (
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-600 mb-4">
                                    Activité interactive - {resource.duration} d'engagement moyen
                                </p>
                                <div className="bg-white border rounded-lg p-8 text-center">
                                    <p className="text-gray-500">Contenu interactif à charger ici</p>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">Ressources similaires</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Similar resources would be mapped here */}
                            <div className="border rounded-lg p-4">
                                <h4 className="font-medium">Fractions avancées</h4>
                                <p className="text-sm text-gray-500 mt-1">Mathématiques • CM1</p>
                            </div>
                            <div className="border rounded-lg p-4">
                                <h4 className="font-medium">Les temps du passé</h4>
                                <p className="text-sm text-gray-500 mt-1">Français • CM2</p>
                            </div>
                            <div className="border rounded-lg p-4">
                                <h4 className="font-medium">Le système solaire</h4>
                                <p className="text-sm text-gray-500 mt-1">Sciences • CE2</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default ViewResource