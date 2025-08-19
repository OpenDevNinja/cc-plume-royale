// src/pages/admin/Games/CreateGame.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../../config/routes'
import AdminLayout from '../../../../components/layout/AdminLayout'
import { showSuccessNotification } from '../../../../utils/notifications'
import GameForm from '../../../../components/games/GameForm'

function CreateGame() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (gameData) => {
        try {
            setIsSubmitting(true)
            // Ici vous ajouteriez l'appel API pour créer le jeu
            // await createGame(gameData)
            showSuccessNotification('Jeu créé avec succès!')
            navigate(ROUTES.ADMIN_GAMES)
        } catch (error) {
            console.error('Failed to create game:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Créer un nouveau jeu</h1>
                <div className="bg-white shadow rounded-lg p-6">
                    <GameForm
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
        </AdminLayout>
    )
}

export default CreateGame