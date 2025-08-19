// src/pages/admin/Settings/General.jsx
import AdminLayout from '../../../../components/layout/AdminLayout'
import Input from '../../../../components/common/Input'
import Button from '../../../../components/common/Button'
import { useForm } from '../../../../hooks/useForm'

const initialValues = {
    siteName: 'C.C. Plume Royale',
    siteUrl: 'https://plume-royale.com',
    contactEmail: 'contact@plume-royale.com',
    maintenanceMode: false
}

function GeneralSettings() {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        isSubmitting
    } = useForm(initialValues, async (formValues) => {
        // Submit logic here
        console.log('Submitting:', formValues)
        await new Promise(resolve => setTimeout(resolve, 1000))
    })

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Paramètres généraux</h1>
                    <Button
                        onClick={handleSubmit}
                        loading={isSubmitting}
                    >
                        Enregistrer
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Input
                            label="Nom du site"
                            name="siteName"
                            value={values.siteName}
                            onChange={handleChange}
                            error={errors.siteName}
                            required
                        />

                        <Input
                            label="URL du site"
                            name="siteUrl"
                            type="url"
                            value={values.siteUrl}
                            onChange={handleChange}
                            error={errors.siteUrl}
                            required
                        />

                        <Input
                            label="Email de contact"
                            name="contactEmail"
                            type="email"
                            value={values.contactEmail}
                            onChange={handleChange}
                            error={errors.contactEmail}
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            id="maintenanceMode"
                            name="maintenanceMode"
                            type="checkbox"
                            checked={values.maintenanceMode}
                            onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-900">
                            Mode maintenance
                        </label>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}

export default GeneralSettings