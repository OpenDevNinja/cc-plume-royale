// src/pages/admin/Quizzes/CreateQuiz.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import AdminLayout from '@/components/layout/AdminLayout'
import QuizForm from '@/components/quizzes/QuizForm'
import { showSuccessNotification } from '@/utils/notifications'

function CreateQuiz() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (quizData) => {
        try {
            setIsSubmitting(true)
            // Simuler la création du quiz
            await new Promise(resolve => setTimeout(resolve, 1000))
            showSuccessNotification('Quiz créé avec succès!')
            navigate(ROUTES.ADMIN_QUIZZES)
        } catch (error) {
            console.error('Failed to create quiz:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Créer un nouveau quiz</h1>
                <div className="bg-white shadow rounded-lg p-6">
                    <QuizForm
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>
        </AdminLayout>
    )
}

export default CreateQuiz