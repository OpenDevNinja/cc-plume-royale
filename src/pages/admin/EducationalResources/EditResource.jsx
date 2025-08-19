// src/pages/admin/EducationalResources/EditResource.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../../config/routes'
import AdminLayout from '../../../../components/layout/AdminLayout'
import { useEducationalResources } from '../../../../hooks/useEducationalResources'
import { showSuccessNotification } from '../../../../utils/notifications'
import ResourceForm from '../../../../components/educational/ResourceForm'

function EditResource() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getResourceById, updateResource } = useEducationalResources()
    const [resource, setResource] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadResource = async () => {
            try {
                const data = await getResourceById(id)
                setResource(data)
            } catch (error) {
                console.error('Failed to load resource:', error)
                navigate(ROUTES.ADMIN_RESOURCES)
            } finally {
                setIsLoading(false)
            }
        }

        loadResource()
    }, [id, getResourceById, navigate])

    const handleSubmit = async (updatedData) => {
        try {
            await updateResource(id, updatedData)
            showSuccessNotification('Ressource mise à jour avec succès!')
            navigate(ROUTES.ADMIN_RESOURCES)
        } catch (error) {
            console.error('Failed to update resource:', error)
        }
    }

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Modifier la ressource</h1>
                <div className="bg-white shadow rounded-lg p-6">
                    {resource && (
                        <ResourceForm
                            initialValues={resource}
                            onSubmit={handleSubmit}
                            submitText="Enregistrer les modifications"
                        />
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}

export default EditResource