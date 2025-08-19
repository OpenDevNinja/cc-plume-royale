import React from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import AvatarUpload from '@/components/common/AvatarUpload'

const SettingsPage = () => {
    const userData = {
        firstName: 'Marie',
        lastName: 'Dupont',
        email: 'marie.dupont@example.com',
        phone: '0601020304',
        avatar: '/assets/images/avatars/parent1.png'
    }

    const initialValues = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Le prénom est requis'),
        lastName: Yup.string().required('Le nom est requis'),
        email: Yup.string().email('Email invalide').required('L\'email est requis'),
        phone: Yup.string().matches(/^[0-9]{10}$/, 'Numéro de téléphone invalide'),
        currentPassword: Yup.string().when(['newPassword', 'confirmPassword'], {
            is: (newPassword, confirmPassword) => newPassword || confirmPassword,
            then: Yup.string().required('Le mot de passe actuel est requis'),
            otherwise: Yup.string()
        }),
        newPassword: Yup.string()
            .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
            .when('currentPassword', {
                is: (currentPassword) => currentPassword,
                then: Yup.string().required('Le nouveau mot de passe est requis'),
                otherwise: Yup.string()
            }),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Les mots de passe doivent correspondre')
            .when('newPassword', {
                is: (newPassword) => newPassword,
                then: Yup.string().required('La confirmation du mot de passe est requise'),
                otherwise: Yup.string()
            })
    })

    const handleSubmit = (values) => {
        console.log('Settings updated', values)
        // Ici, on enverrait les modifications à l'API
    }

    return (
        <DashboardLayout title="Paramètres du compte">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6">
                        <Card>
                            <div className="p-6">
                                <h3 className="text-lg font-medium mb-6">Profil</h3>
                                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                                    <AvatarUpload
                                        initialPreview={userData.avatar}
                                        className="flex-shrink-0"
                                    />
                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Input
                                            label="Prénom"
                                            name="firstName"
                                            required
                                        />
                                        <Input
                                            label="Nom"
                                            name="lastName"
                                            required
                                        />
                                        <Input
                                            label="Adresse email"
                                            name="email"
                                            type="email"
                                            required
                                        />
                                        <Input
                                            label="Téléphone"
                                            name="phone"
                                            type="tel"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="p-6">
                                <h3 className="text-lg font-medium mb-6">Sécurité</h3>
                                <div className="space-y-4">
                                    <Input
                                        label="Mot de passe actuel"
                                        name="currentPassword"
                                        type="password"
                                    />
                                    <Input
                                        label="Nouveau mot de passe"
                                        name="newPassword"
                                        type="password"
                                    />
                                    <Input
                                        label="Confirmer le nouveau mot de passe"
                                        name="confirmPassword"
                                        type="password"
                                    />
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="p-6">
                                <h3 className="text-lg font-medium mb-6">Préférences</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            id="newsletter"
                                            name="newsletter"
                                            type="checkbox"
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-900">
                                            Recevoir la newsletter
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="notifications"
                                            name="notifications"
                                            type="checkbox"
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="notifications" className="ml-2 block text-sm text-gray-900">
                                            Recevoir les notifications
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                variant="primary"
                                loading={isSubmitting}
                            >
                                Enregistrer les modifications
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </DashboardLayout>
    )
}

export default SettingsPage