// src/components/educational/PdfViewer.jsx
import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import PropTypes from 'prop-types'
import { fetchResourceContent } from '../../api/educationalResources'
import Loader from '../common/Loader'
import ErrorMessage from '../common/ErrorMessage'
import Button from '../common/Button'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const PdfViewer = ({ resourceId }) => {
    const [pdfUrl, setPdfUrl] = useState(null)
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadPdf = async () => {
            try {
                setIsLoading(true)
                const url = await fetchResourceContent(resourceId)
                setPdfUrl(url)
                setError(null)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadPdf()
    }, [resourceId])

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
    }

    const goToPrevPage = () => {
        setPageNumber(prev => Math.max(prev - 1, 1))
    }

    const goToNextPage = () => {
        setPageNumber(prev => Math.min(prev + 1, numPages))
    }

    if (isLoading) return <Loader />
    if (error) return <ErrorMessage message={error} />

    return (
        <div className="flex flex-col items-center">
            <div className="mb-4 flex items-center gap-4">
                <Button
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                    size="sm"
                >
                    Précédent
                </Button>
                <span className="text-sm text-gray-600">
                    Page {pageNumber} sur {numPages}
                </span>
                <Button
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages}
                    size="sm"
                >
                    Suivant
                </Button>
            </div>
            <div className="border rounded-lg shadow-sm overflow-hidden">
                <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<Loader />}
                >
                    <Page
                        pageNumber={pageNumber}
                        width={800}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                    />
                </Document>
            </div>
        </div>
    )
}

PdfViewer.propTypes = {
    resourceId: PropTypes.string.isRequired
}

export default PdfViewer