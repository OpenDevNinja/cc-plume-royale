import React from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/common/Card'
import Avatar from '@/components/common/Avatar'
import Button from '@/components/common/Button'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Input from '@/components/common/Input'
//import { PencilIcon, CheckIcon } from '@heroicons/react/outline'
import { MdOutlineEdit } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
const ParentProfile = () => {
    const [editMode, setEditMode] = useState(false)
    const [avatar, setAvatar] = useState('/assets/images/avatars/parent1.png')

    const initialValues = {
        firstName: 'Marie',
        lastName: 'Dupont',
        email: 'marie.dupont@example.com',
        phone: '+1 514 123 4567',
        address: '123 Rue Éducation',
        city: 'Montréal',
        postalCode: 'H1T 1S7',
        country: 'Canada'
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Le prénom est requis'),
        lastName: Yup.string().required('Le nom est requis'),
        email: Yup.string().email('Email invalide').required('L\'email est requis'),
        phone: Yup.string(),
        address: Yup.string(),
        city: Yup.string(),
        postalCode: Yup.string(),
        country: Yup.string()
    })

    const handleSubmit = (values) => {
        console.log('Profile updated:', values)
        setEditMode(false)
        // Ici, on enverrait les modifications à l'API
    }

    return (
        <DashboardLayout title="Mon Profil">
            <div className="space-y-6">
                <Card>
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-bold">Informations personnelles</h2>
                            {!editMode ? (
                                <Button
                                    variant="outline"
                                    icon={MdOutlineEdit}
                                    onClick={() => setEditMode(true)}
                                >
                                    Modifier
                                </Button>
                            ) : (
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setEditMode(false)}
                                    >
                                        Annuler
                                    </Button>
                                    <Button
                                        type="submit"
                                        form="profileForm"
                                        variant="primary"
                                        icon={FiCheck}
                                    >
                                        Enregistrer
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex flex-col items-center">
                                <Avatar
                                    src={avatar}
                                    size="xl"
                                    editable={editMode}
                                    onEdit={(newAvatar) => setAvatar(newAvatar)}
                                />
                                {editMode && (
                                    <p className="mt-2 text-sm text-gray-500">
                                        Cliquez sur l'avatar pour changer
                                    </p>
                                )}
                            </div>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ values }) => (
                                    <Form id="profileForm" className="flex-1">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                label="Prénom"
                                                name="firstName"
                                                disabled={!editMode}
                                                required
                                            />
                                            <Input
                                                label="Nom"
                                                name="lastName"
                                                disabled={!editMode}
                                                required
                                            />
                                            <Input
                                                label="Email"
                                                name="email"
                                                type="email"
                                                disabled={!editMode}
                                                required
                                            />
                                            <Input
                                                label="Téléphone"
                                                name="phone"
                                                type="tel"
                                                disabled={!editMode}
                                            />
                                            <Input
                                                label="Adresse"
                                                name="address"
                                                disabled={!editMode}
                                            />
                                            <Input
                                                label="Ville"
                                                name="city"
                                                disabled={!editMode}
                                            />
                                            <Input
                                                label="Code postal"
                                                name="postalCode"
                                                disabled={!editMode}
                                            />
                                            <Input
                                                label="Pays"
                                                name="country"
                                                disabled={!editMode}
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">Sécurité</h3>
                        <Button
                            variant="outline"
                            as="a"
                            href="/change-password"
                            className="w-full md:w-auto"
                        >
                            Changer le mot de passe
                        </Button>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default ParentProfile