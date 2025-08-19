// src/pages/admin/Users/EditUser.jsx
import { useParams, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import AdminLayout from '@/components/layout/AdminLayout'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import Loader from '@/components/common/Loader'
import ErrorMessage from '@/components/common/ErrorMessage'
import { useUsers } from '../../../hooks/useUser'

const ROLE_OPTIONS = [
    { value: 'admin', label: 'Administrateur' },
    { value: 'parent', label: 'Parent' },
    { value: 'child', label: 'Enfant' },
    { value: 'tutor', label: 'Tuteur' }
]

const STATUS_OPTIONS = [
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' },
    { value: 'pending', label: 'En attente' }
]

function EditUser() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getUserById, editUser } = useUsers()
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadUser = async () => {
            try {
                setIsLoading(true)
                const user = await getUserById(id)
                setUserData(user)
                setError(null)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadUser()
    }, [id, getUserById])

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            await editUser(id, userData)
            navigate(ROUTES.ADMIN_USERS)
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading && !userData) {
        return (
            <AdminLayout>
                <div className="flex justify-center py-12">
                    <Loader />
                </div>
            </AdminLayout>
        )
    }

    if (error) {
        return (
            <AdminLayout>
                <ErrorMessage
                    title="Erreur de chargement"
                    message={error}
                    action={
                        <Button onClick={() => navigate(ROUTES.ADMIN_USERS)}>
                            Retour à la liste
                        </Button>
                    }
                />
            </AdminLayout>
        )
    }

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Modifier l'utilisateur</h1>
                    <Button
                        variant="outline"
                        onClick={() => navigate(ROUTES.ADMIN_USERS)}
                    >
                        Retour
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <Input
                            label="Prénom"
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            value={userData?.firstName || ''}
                            onChange={handleChange}
                        />

                        <Input
                            label="Nom"
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            value={userData?.lastName || ''}
                            onChange={handleChange}
                        />

                        <Input
                            label="Email"
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={userData?.email || ''}
                            onChange={handleChange}
                        />

                        <Select
                            label="Rôle"
                            options={ROLE_OPTIONS}
                            value={userData?.role || 'parent'}
                            onChange={(value) => setUserData(prev => ({ ...prev, role: value }))}
                            required
                        />

                        <Select
                            label="Statut"
                            options={STATUS_OPTIONS}
                            value={userData?.status || 'active'}
                            onChange={(value) => setUserData(prev => ({ ...prev, status: value }))}
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(ROUTES.ADMIN_USERS)}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            loading={isLoading}
                        >
                            Enregistrer
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}

export default EditUser