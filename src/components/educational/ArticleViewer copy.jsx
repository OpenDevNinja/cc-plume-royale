// src/components/educational/ArticleViewer.jsx
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { fetchResourceContent } from '../../api/educationalResources'
import Loader from '../common/Loader'
import ErrorMessage from '../common/ErrorMessage'

const ArticleViewer = ({ resourceId }) => {
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadContent = async () => {
            try {
                setIsLoading(true)
                const data = await fetchResourceContent(resourceId)
                setContent(data.content)
                setError(null)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadContent()
    }, [resourceId])

    if (isLoading) return <Loader />
    if (error) return <ErrorMessage message={error} />

    return (
        <div className="prose prose-primary max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}

ArticleViewer.propTypes = {
    resourceId: PropTypes.string.isRequired
}

export default ArticleViewer