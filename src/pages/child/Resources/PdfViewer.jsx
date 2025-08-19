// src/pages/child/Resources/PdfViewer.jsx
import { useParams } from 'react-router-dom'
import { useEducationalResources } from '../../../../hooks/useEducationalResources'
import PdfViewer from '../../../../components/educational/PdfViewer'
import ErrorMessage from '../../../../components/common/ErrorMessage'
import Loader from '../../../../components/common/Loader'
import { ROUTES } from '../../../../config/routes'

function ChildPdfViewer() {
    const { id } = useParams()
    const { getResourceById } = useEducationalResources()
    const [pdfUrl, setPdfUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadPdf = async () => {
            try {
                setIsLoading(true)
                const resource = await getResourceById(id)
                if (resource.type !== 'pdf') {
                    throw new Error('Cette ressource n\'est pas un PDF')
                }
                setPdfUrl(resource.fileUrl)
                setError(null)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadPdf()
    }, [id, getResourceById])

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
                    <Button to={ROUTES.CHILD_RESOURCES}>
                        Retour aux ressources
                    </Button>
                }
            />
        )
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1">
                <PdfViewer fileUrl={pdfUrl} />
            </div>
        </div>
    )
}

export default ChildPdfViewer