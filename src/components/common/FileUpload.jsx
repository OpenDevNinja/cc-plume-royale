// src/components/common/FileUpload.jsx
import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

function FileUpload({
    label,
    accept,
    onChange,
    required = false,
    className = '',
    multiple = false
}) {
    const [fileName, setFileName] = useState('')
    const [isDragging, setIsDragging] = useState(false)

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0]
        if (file) {
            setFileName(file.name)
            onChange(file)
        }
    }, [onChange])

    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        if (file) {
            setFileName(file.name)
            onChange(file)
        }
    }

    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-danger-500"> *</span>}
                </label>
            )}

            <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="space-y-1 text-center">
                    <svg
                        className={`mx-auto h-12 w-12 ${isDragging ? 'text-primary-500' : 'text-gray-400'
                            }`}
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                    >
                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                        >
                            <span>Téléverser un fichier</span>
                            <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                accept={accept}
                                onChange={handleFileChange}
                                required={required}
                                multiple={multiple}
                            />
                        </label>
                        <p className="pl-1">ou glisser-déposer</p>
                    </div>
                    <p className="text-xs text-gray-500">
                        {accept ? `Formats supportés: ${accept}` : 'Tous formats supportés'}
                    </p>
                </div>
            </div>

            {fileName && (
                <div className="flex items-center text-sm text-gray-700">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                    </svg>
                    <span>{fileName}</span>
                </div>
            )}
        </div>
    )
}

FileUpload.propTypes = {
    label: PropTypes.string,
    accept: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    className: PropTypes.string,
    multiple: PropTypes.bool
}

export default FileUpload