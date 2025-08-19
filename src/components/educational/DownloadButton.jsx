// src/components/educational/DownloadButton.jsx
import { useState } from 'react'
import Button from '../common/Button'
import { downloadResource } from '../../data/services/educationalResourcesService'
import { showSuccessNotification, showErrorNotification } from '../../utils/notifications'

function DownloadButton({
    resourceId,
    resourceType,
    children,
    ...props
}) {
    const [isDownloading, setIsDownloading] = useState(false)

    const handleDownload = async () => {
        try {
            setIsDownloading(true)
            const url = await downloadResource(resourceId)

            // Créer un lien temporaire pour déclencher le téléchargement
            const a = document.createElement('a')
            a.href = url
            a.download = `resource-${resourceId}.${resourceType}`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)

            showSuccessNotification('Téléchargement commencé')
        } catch (error) {
            showErrorNotification('Échec du téléchargement')
            console.error('Download failed:', error)
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <Button
            onClick={handleDownload}
            loading={isDownloading}
            {...props}
        >
            {children || 'Télécharger'}
        </Button>
    )
}

export default DownloadButton