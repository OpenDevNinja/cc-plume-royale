import React, { useState } from 'react'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import { useEducationalResources } from '@/hooks/useEducationalResources'
import {
    FiUpload,        // Upload
    FiX,             // Close/X
    FiCheck          // Checkmark
} from "react-icons/fi"

const resourceTypes = [
    { value: 'pdf', label: 'Document PDF' },
    { value: 'video', label: 'Vidéo' },
    { value: 'interactive', label: 'Activité interactive' }
]

const subjects = [
    { value: 'math', label: 'Mathématiques' },
    { value: 'french', label: 'Français' },
    { value: 'science', label: 'Sciences' },
    { value: 'history', label: 'Histoire' }
]

const levels = [
    { value: 'ce2', label: 'CE2' },
    { value: 'cm1', label: 'CM1' },
    { value: 'cm2', label: 'CM2' }
]

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Le titre est requis'),
    description: Yup.string().required('La description est requise'),
    subject: Yup.string().required('La matière est requise'),
    level: Yup.string().required('Le niveau est requis'),
    resourceType: Yup.string().required('Le type de ressource est requis'),
    file: Yup.mixed().required('Un fichier est requis')
})

const ResourceUploads = () => {
    const { uploadResource } = useEducationalResources()
    const [preview, setPreview] = useState(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleSubmit = async (values, { resetForm }) => {
        try {
            setIsUploading(true)
            const formData = new FormData()
            formData.append('title', values.title)
            formData.append('description', values.description)
            formData.append('subject', values.subject)
            formData.append('level', values.level)
            formData.append('resourceType', values.resourceType)
            formData.append('file', values.file)

            await uploadResource(formData)
            resetForm()
            setPreview(null)
        } catch (error) {
            console.error('Upload failed:', error)
        } finally {
            setIsUploading(false)
        }
    }

    const handleFileChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0]
        setFieldValue('file', file)

        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onload = (e) => setPreview(e.target.result)
                reader.readAsDataURL(file)
            } else {
                setPreview(null)
            }
        }
    }

    return (
        <Card>
            <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Uploader une nouvelle ressource</h2>

                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        subject: '',
                        level: '',
                        resourceType: '',
                        file: null
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values }) => (
                        <Form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Titre de la ressource"
                                    name="title"
                                    placeholder="Introduction aux fractions"
                                    required
                                />
                                <Select
                                    label="Matière"
                                    name="subject"
                                    options={subjects}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Select
                                    label="Niveau scolaire"
                                    name="level"
                                    options={levels}
                                    required
                                />
                                <Select
                                    label="Type de ressource"
                                    name="resourceType"
                                    options={resourceTypes}
                                    required
                                />
                            </div>

                            <Input
                                label="Description"
                                name="description"
                                as="textarea"
                                rows={3}
                                placeholder="Description détaillée de la ressource..."
                                required
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fichier {values.resourceType && `(${values.resourceType})`}
                                </label>
                                <div className="mt-1 flex items-center">
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                    >
                                        <FiUpload className="h-5 w-5 mr-1 inline" />
                                        Choisir un fichier
                                    </label>
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                        onChange={(e) => handleFileChange(e, setFieldValue)}
                                    />
                                    {values.file && (
                                        <span className="ml-3 text-sm text-gray-500">
                                            {values.file.name}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {preview && (
                                <div className="mt-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Aperçu
                                    </label>
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="h-32 object-contain border rounded"
                                    />
                                </div>
                            )}

                            <div className="pt-4 flex justify-end">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={isUploading}
                                    icon={isUploading ? null : FiCheck}
                                >
                                    {isUploading ? 'Envoi en cours...' : 'Uploader la ressource'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Card>
    )
}

export default ResourceUploads