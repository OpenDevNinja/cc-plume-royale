import React from 'react'
import { useParams } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

import { FiArrowLeft } from 'react-icons/fi'
import { FaBookOpen } from 'react-icons/fa'

const ArticleViewer = () => {
    const { id } = useParams()
    const article = {
        id,
        title: "Les mystères de la photosynthèse",
        content: `
      <h2>Introduction à la photosynthèse</h2>
      <p>La photosynthèse est le processus par lequel les plantes vertes, les algues et certaines bactéries utilisent l'énergie lumineuse pour synthétiser de la matière organique à partir de dioxyde de carbone et d'eau.</p>
      
      <h3>Le processus en détail</h3>
      <p>Ce processus vital se déroule en deux phases principales :</p>
      <ol>
        <li>La phase photochimique (dépendante de la lumière)</li>
        <li>La phase chimique (cycle de Calvin)</li>
      </ol>
      
      <h2>Expérience à réaliser</h2>
      <p>Matériel nécessaire :</p>
      <ul>
        <li>Une plante verte</li>
        <li>Un sac en plastique transparent</li>
        <li>Un ruban adhésif</li>
      </ul>
    `,
        subject: 'science',
        level: 'cm1',
        duration: '10 min',
        rating: 4.2
    }

    return (
        <DashboardLayout title={article.title}>
            <div className="space-y-6">
                <Card>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <Button
                                variant="outline"
                                icon={FiArrowLeft}
                                onClick={() => window.history.back()}
                            >
                                Retour
                            </Button>
                            <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                                <FaBookOpen className="h-4 w-4 text-primary-600 mr-1" />
                                <span className="text-sm">{article.duration} de lecture</span>
                            </div>
                        </div>

                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-sm text-gray-500">Cet article t'a plu ?</span>
                                </div>
                                <div className="flex space-x-2">
                                    <Button variant="outline" size="sm">
                                        👍 Oui
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        👎 Non
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">Articles similaires</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                                <h4 className="font-medium">Le cycle de l'eau</h4>
                                <p className="text-sm text-gray-500 mt-1">Science • CM1 • 8 min</p>
                            </div>
                            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                                <h4 className="font-medium">Les écosystèmes</h4>
                                <p className="text-sm text-gray-500 mt-1">Science • CM2 • 12 min</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default ArticleViewer