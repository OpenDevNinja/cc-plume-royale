// src/components/educational/DownloadButton.jsx
import PropTypes from 'prop-types'
import Button from '../common/Button'
import { downloadResource } from '../../api/educationalResources'

const DownloadButton = ({ resourceId, fileName, variant = 'outline', size = 'md' }) => {
    const handleDownload = async () => {
        try {
            await downloadResource(resourceId, fileName)
        } catch (error) {
            console.error('Download failed:', error)
        }
    }

    return (
        <Button
            onClick={handleDownload}
            variant={variant}
            size={size}
        >
            Télécharger
        </Button>
    )
}

DownloadButton.propTypes = {
    resourceId: PropTypes.string.isRequired,
    fileName: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string
}

export default DownloadButton