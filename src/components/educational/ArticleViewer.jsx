// src/components/educational/ArticleViewer.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getResourceById } from '../../data/services/educationalResourcesService'
import Loader from '../common/Loader'
import ErrorMessage from '../common/ErrorMessage'
import Button from '../common/Button'
import { ROUTES } from '../../config/routes'

function ArticleViewer() {
    const { id } = useParams()
    const [article, setArticle] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadArticle = async () => {
            try {
                setIsLoading(true)
                const data = await getResourceById(id)
                if (data.type !== 'article') {
                    throw new Error('Cette ressource n\'est pas un article')
                }
                setArticle(data)
                setError(null)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadArticle()
    }, [id])

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader />
            </div>
        )
    }

    if (error) {
        return (
            <ErrorMessage
                title="Erreur de chargement"
                message={error}
                action={
                    <Button to={ROUTES.EDUCATIONAL_RESOURCES}>
                        Retour aux ressources
                    </Button>
                }
            />
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="prose prose-lg max-w-none">
                <h1>{article.title}</h1>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                    <span>Publié le {new Date(article.createdAt).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{article.subject}</span>
                    <span className="mx-2">•</span>
                    <span>Niveau {article.level}</span>
                </div>

                <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </div>
        </div>
    )
}

export default ArticleViewer