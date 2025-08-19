// src/pages/admin/EducationalResources/CreateResource.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../../config/routes'
import AdminLayout from '../../../components/layout/AdminLayout'
import Button from '../../../components/common/Button'
import Input from '../../../components/common/Input'
import Select from '../../../components/common/Select'
import FileUpload from '../../../components/common/FileUpload'
import { createResource } from '../../../../data/services/educationalResourcesService'
import { showSuccessNotification, showErrorNotification } from '../../../../utils/notifications'

const RESOURCE_TYPES = [
    { value: 'pdf', label: 'PDF' },
    { value: 'video', label: 'Vidéo' },
    { value: 'article', label: 'Article' }
]

const SUBJECTS = [
    { value: 'math', label: 'Mathématiques' },
    { value: 'french', label: 'Français' },
    { value: 'science', label: 'Sciences' }
]

const LEVELS = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `Niveau ${i + 1}`
}))

function CreateResource() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'pdf',
        subject: 'math',
        level: 1,
        file: null,
        content: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (file) => {
        setFormData(prev => ({ ...prev, file }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const formPayload = new FormData()
            formPayload.append('title', formData.title)
            formPayload.append('description', formData.description)
            formPayload.append('type', formData.type)
            formPayload.append('subject', formData.subject)
            formPayload.append('level', formData.level)
            if (formData.file) {
                formPayload.append('file', formData.file)
            }
            if (formData.content) {
                formPayload.append('content', formData.content)
            }

            await createResource(formPayload)
            showSuccessNotification('Ressource créée avec succès')
            navigate(ROUTES.ADMIN_RESOURCES)
        } catch (error) {
            showErrorNotification(error.message || 'Erreur lors de la création')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Créer une ressource</h1>
                    <Button
                        variant="outline"
                        onClick={() => navigate(ROUTES.ADMIN_RESOURCES)}
                    >
                        Retour
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
                    <Input
                        label="Titre"
                        id="title"
                        name="title"
                        type="text"
                        required
                        value={formData.title}
                        onChange={handleChange}
                    />

                    <Input
                        label="Description"
                        id="description"
                        name="description"
                        type="textarea"
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <Select
                            label="Type"
                            options={RESOURCE_TYPES}
                            value={formData.type}
                            onChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                            required
                        />

                        <Select
                            label="Matière"
                            options={SUBJECTS}
                            value={formData.subject}
                            onChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                            required
                        />

                        <Select
                            label="Niveau"
                            options={LEVELS}
                            value={formData.level}
                            onChange={(value) => setFormData(prev => ({ ...prev, level: value }))}
                            required
                        />
                    </div>

                    {formData.type === 'pdf' || formData.type === 'video' ? (
                        <FileUpload
                            label={formData.type === 'pdf' ? 'Fichier PDF' : 'Fichier Vidéo'}
                            accept={formData.type === 'pdf' ? '.pdf' : 'video/*'}
                            onChange={handleFileChange}
                            required
                        />
                    ) : (
                        <Input
                            label="Contenu de l'article"
                            id="content"
                            name="content"
                            type="textarea"
                            rows={10}
                            value={formData.content}
                            onChange={handleChange}
                            required
                        />
                    )}

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            loading={isLoading}
                        >
                            Créer la ressource
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}

export default CreateResource