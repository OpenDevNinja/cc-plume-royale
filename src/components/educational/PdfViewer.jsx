// src/components/educational/PdfViewer.jsx
import { useState, useEffect, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import Button from '../common/Button'
import Loader from '../common/Loader'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

function PdfViewer({ fileUrl }) {
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [scale, setScale] = useState(1.0)
    const [isLoading, setIsLoading] = useState(true)
    const containerRef = useRef(null)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
        setIsLoading(false)
    }

    const zoomIn = () => {
        setScale(prev => Math.min(prev + 0.25, 3.0))
    }

    const zoomOut = () => {
        setScale(prev => Math.max(prev - 0.25, 0.5))
    }

    const nextPage = () => {
        setPageNumber(prev => Math.min(prev + 1, numPages))
    }

    const prevPage = () => {
        setPageNumber(prev => Math.max(prev - 1, 1))
    }

    return (
        <div className="flex flex-col items-center">
            <div className="mb-4 flex items-center space-x-4">
                <Button
                    onClick={prevPage}
                    disabled={pageNumber <= 1}
                    size="sm"
                >
                    Précédent
                </Button>
                <span>
                    Page {pageNumber} sur {numPages || '--'}
                </span>
                <Button
                    onClick={nextPage}
                    disabled={pageNumber >= numPages}
                    size="sm"
                >
                    Suivant
                </Button>
                <Button onClick={zoomOut} size="sm" variant="outline">
                    -
                </Button>
                <span>{Math.round(scale * 100)}%</span>
                <Button onClick={zoomIn} size="sm" variant="outline">
                    +
                </Button>
            </div>

            <div
                ref={containerRef}
                className="border rounded-lg shadow-lg overflow-auto max-w-full bg-white"
                style={{ maxHeight: '80vh' }}
            >
                {isLoading && <Loader className="my-20" />}
                <Document
                    file={fileUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<Loader className="my-20" />}
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        width={containerRef.current?.clientWidth}
                        loading={<Loader className="my-20" />}
                    />
                </Document>
            </div>
        </div>
    )
}

export default PdfViewer