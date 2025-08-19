import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/config/routes'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import Button from '@/components/common/Button'
import AvatarUpload from '@/components/common/AvatarUpload'
import { useUsers } from '../../../hooks/useUser'

const CreateUser = () => {
    const { createUser } = useUsers()
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState(null)

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        role: 'parent',
        password: '',
        confirmPassword: ''
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Le prénom est requis'),
        lastName: Yup.string().required('Le nom est requis'),
        email: Yup.string().email('Email invalide').required('L\'email est requis'),
        role: Yup.string().required('Le rôle est requis'),
        password: Yup.string()
            .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
            .required('Le mot de passe est requis'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
            .required('La confirmation du mot de passe est requise')
    })

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData()
            formData.append('firstName', values.firstName)
            formData.append('lastName', values.lastName)
            formData.append('email', values.email)
            formData.append('role', values.role)
            formData.append('password', values.password)
            if (avatar) formData.append('avatar', avatar)

            await createUser(formData)
            navigate(ROUTES.ADMIN_USERS)
        } catch (error) {
            console.error('Error creating user:', error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <DashboardLayout
            title="Créer un utilisateur"
            backLink={ROUTES.ADMIN_USERS}
        >
            <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form className="space-y-6">
                            <div className="flex flex-col items-center mb-6">
                                <AvatarUpload
                                    onChange={setAvatar}
                                    initialPreview="/assets/images/avatars/default.png"
                                />
                                <p className="mt-2 text-sm text-gray-500">
                                    Choisissez une photo de profil (optionnel)
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <Input
                                    label="Prénom"
                                    name="firstName"
                                    type="text"
                                    required
                                />

                                <Input
                                    label="Nom"
                                    name="lastName"
                                    type="text"
                                    required
                                />

                                <Input
                                    label="Adresse email"
                                    name="email"
                                    type="email"
                                    required
                                />

                                <Select
                                    label="Rôle"
                                    name="role"
                                    options={[
                                        { value: 'admin', label: 'Administrateur' },
                                        { value: 'parent', label: 'Parent' },
                                        { value: 'child', label: 'Enfant' },
                                        { value: 'tutor', label: 'Tuteur' }
                                    ]}
                                    required
                                />

                                <Input
                                    label="Mot de passe"
                                    name="password"
                                    type="password"
                                    required
                                />

                                <Input
                                    label="Confirmer le mot de passe"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate(ROUTES.ADMIN_USERS)}
                                >
                                    Annuler
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={isSubmitting}
                                >
                                    Créer l'utilisateur
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </DashboardLayout>
    )
}

export default CreateUser