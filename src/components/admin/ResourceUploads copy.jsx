import React, { useState } from 'react'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import { UploadIcon, XIcon } from '@heroicons/react/outline'

const ResourceUploads = ({ onUpload }) => {
    const [files, setFiles] = useState([])
    const [resourceType, setResourceType] = useState('pdf')
    const [subject, setSubject] = useState('math')
    const [gradeLevel, setGradeLevel] = useState('cm1')

    const resourceTypes = [
        { value: 'pdf', label: 'PDF' },
        { value: 'video', label: 'Vidéo' },
        { value: 'interactive', label: 'Contenu interactif' }
    ]

    const subjects = [
        { value: 'math', label: 'Mathématiques' },
        { value: 'french', label: 'Français' },
        { value: 'science', label: 'Sciences' },
        { value: 'history', label: 'Histoire' }
    ]

    const gradeLevels = [
        { value: 'ce2', label: 'CE2' },
        { value: 'cm1', label: 'CM1' },
        { value: 'cm2', label: 'CM2' }
    ]

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files)
        setFiles(prev => [...prev, ...newFiles])
    }

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const resources = files.map(file => ({
            file,
            type: resourceType,
            subject,
            gradeLevel
        }))
        onUpload(resources)
        setFiles([])
    }

    return (
        <Card>
            <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Uploader des ressources</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type de ressource</label>
                        <Select
                            options={resourceTypes}
                            value={resourceType}
                            onChange={setResourceType}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Matière</label>
                        <Select
                            options={subjects}
                            value={subject}
                            onChange={setSubject}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Niveau scolaire</label>
                        <Select
                            options={gradeLevels}
                            value={gradeLevel}
                            onChange={setGradeLevel}
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fichiers à uploader
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <div className="flex text-sm text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none"
                                >
                                    <span>Sélectionner des fichiers</span>
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                        onChange={handleFileChange}
                                        multiple
                                    />
                                </label>
                                <p className="pl-1">ou glisser-déposer</p>
                            </div>
                            <p className="text-xs text-gray-500">
                                {resourceType === 'pdf' && 'PDF jusqu\'à 10MB'}
                                {resourceType === 'video' && 'MP4, MOV jusqu\'à 100MB'}
                                {resourceType === 'interactive' && 'ZIP, HTML jusqu\'à 50MB'}
                            </p>
                        </div>
                    </div>
                </div>

                {files.length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Fichiers sélectionnés ({files.length})</h4>
                        <ul className="border rounded-md divide-y divide-gray-200">
                            {files.map((file, index) => (
                                <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div className="w-0 flex-1 flex items-center">
                                        <UploadIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                        <span className="ml-2 flex-1 w-0 truncate">
                                            {file.name}
                                        </span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-500"
                                            onClick={() => removeFile(index)}
                                        >
                                            <XIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={files.length === 0}
                    variant="primary"
                    icon={UploadIcon}
                >
                    Uploader les ressources
                </Button>
            </div>
        </Card>
    )
}

export default ResourceUploads