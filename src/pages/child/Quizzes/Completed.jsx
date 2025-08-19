import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'

import { FiAward } from 'react-icons/fi'
import {
    FiCheckCircle,    // Check Circle
    FiArrowLeft       // Arrow Left
} from "react-icons/fi";

const QuizCompleted = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { score, totalQuestions } = state || { score: 0, totalQuestions: 0 }
    const percentage = Math.round((score / totalQuestions) * 100)

    const getResultMessage = () => {
        if (percentage >= 90) return "Excellent travail !"
        if (percentage >= 70) return "Très bien joué !"
        if (percentage >= 50) return "Bon effort !"
        return "Continue à t'entraîner !"
    }

    return (
        <DashboardLayout title="Quiz terminé">
            <Card>
                <div className="p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success-100">
                        <FiCheckCircle className="h-10 w-10 text-success-600" />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">Quiz terminé !</h2>
                    <p className="mt-2 text-lg text-gray-600">{getResultMessage()}</p>

                    <div className="mt-8 bg-primary-50 rounded-lg p-6 max-w-md mx-auto">
                        <div className="flex items-center justify-center">
                            <FiAward className="h-12 w-12 text-yellow-500 mr-4" />
                            <div>
                                <p className="text-sm text-gray-500">Ton score</p>
                                <p className="text-3xl font-bold">
                                    {score}/{totalQuestions} ({percentage}%)
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Button
                            variant="outline"
                            icon={FiArrowLeft}
                            onClick={() => navigate(ROUTES.CHILD_QUIZZES)}
                            className="w-full"
                        >
                            Retour aux quiz
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => navigate(ROUTES.CHILD_DASHBOARD)}
                            className="w-full"
                        >
                            Tableau de bord
                        </Button>
                    </div>
                </div>
            </Card>
        </DashboardLayout>
    )
}

export default QuizCompleted