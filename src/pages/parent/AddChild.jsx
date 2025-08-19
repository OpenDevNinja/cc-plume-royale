import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { useChildren } from '@/hooks/useChildren'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'
import AvatarUpload from '@/components/common/AvatarUpload'
import Select from '@/components/common/Select'

const AddChild = () => {
    const { addChild } = useChildren()
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState(null)

    const initialValues = {
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: '',
        gradeLevel: '',
        interests: []
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Le prénom est requis'),
        lastName: Yup.string().required('Le nom est requis'),
        birthDate: Yup.date().required('La date de naissance est requise'),
        gender: Yup.string().required('Le genre est requis'),
        gradeLevel: Yup.string().required('Le niveau scolaire est requis')
    })

    const gradeLevels = [
        { value: 'ce2', label: 'CE2' },
        { value: 'cm1', label: 'CM1' },
        { value: 'cm2', label: 'CM2' },
        { value: '6e', label: '6ème' }
    ]

    const interests = [
        { value: 'math', label: 'Mathématiques' },
        { value: 'reading', label: 'Lecture' },
        { value: 'science', label: 'Sciences' },
        { value: 'history', label: 'Histoire' },
        { value: 'art', label: 'Arts' },
        { value: 'sports', label: 'Sports' }
    ]

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData()
            formData.append('firstName', values.firstName)
            formData.append('lastName', values.lastName)
            formData.append('birthDate', values.birthDate)
            formData.append('gender', values.gender)
            formData.append('gradeLevel', values.gradeLevel)
            values.interests.forEach(interest => formData.append('interests[]', interest))
            if (avatar) formData.append('avatar', avatar)

            await addChild(formData)
            navigate(ROUTES.PARENT_CHILDREN)
        } catch (error) {
            console.error('Error adding child:', error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <DashboardLayout title="Ajouter un enfant" backLink={ROUTES.PARENT_DASHBOARD}>
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
                                    Choisissez une photo pour le profil de votre enfant
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
                                    label="Date de naissance"
                                    name="birthDate"
                                    type="date"
                                    required
                                />

                                <Select
                                    label="Genre"
                                    name="gender"
                                    options={[
                                        { value: 'male', label: 'Garçon' },
                                        { value: 'female', label: 'Fille' },
                                        { value: 'other', label: 'Autre' }
                                    ]}
                                    required
                                />

                                <Select
                                    label="Niveau scolaire"
                                    name="gradeLevel"
                                    options={gradeLevels}
                                    required
                                />

                                <Select
                                    label="Centres d'intérêt (optionnel)"
                                    name="interests"
                                    options={interests}
                                    isMulti
                                    onChange={(selected) => {
                                        setFieldValue(
                                            'interests',
                                            selected ? selected.map(option => option.value) : []
                                        )
                                    }}
                                />
                            </div>

                            <div className="flex justify-end space-x-4 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate(ROUTES.PARENT_DASHBOARD)}
                                >
                                    Annuler
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    loading={isSubmitting}
                                >
                                    Enregistrer
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </DashboardLayout>
    )
}

export default AddChild