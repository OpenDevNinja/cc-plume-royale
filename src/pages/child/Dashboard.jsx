// src/pages/child/Dashboard.jsx
import { useState } from 'react'
import { ROUTES } from '@/config/routes'
import ChildLayout from '@/components/layout/ChildLayout'
import ProgressChart from '@/components/dashboard/ProgressChart'
import ResourceGrid from '@/components/educational/ResourceGrid'
import GameCard from '@/components/games/GameCard'
import { useEducationalResources } from '@/hooks/useEducationalResources'
import { useGames } from '@/hooks/useGames'
import { useQuizzes } from '@/hooks/useQuizzes'

const games = [
    {
        id: 1,
        title: 'Mathématiques',
        description: 'Jeu de calcul mental',
        icon: 'calculator',
        color: 'primary',
        link: ROUTES.CHILD_MATH_GAME
    },
    {
        id: 2,
        title: 'Mémoire',
        description: 'Jeu de mémoire visuelle',
        icon: 'lightning-bolt',
        color: 'secondary',
        link: ROUTES.CHILD_MEMORY_GAME
    },
    {
        id: 3,
        title: 'Puzzle',
        description: 'Jeu de logique',
        icon: 'puzzle',
        color: 'success',
        link: ROUTES.CHILD_PUZZLE_GAME
    }
]

function ChildDashboard() {
    const [activeTab, setActiveTab] = useState('resources')
    const { resources } = useEducationalResources({ limit: 4 })
    const { games: playedGames } = useGames()
    const { quizzes } = useQuizzes({ limit: 3 })

    return (
        <ChildLayout>
            <div className="space-y-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Ma progression</h2>
                    <ProgressChart
                        subjects={[
                            { name: 'Maths', value: 75, color: 'primary' },
                            { name: 'Français', value: 60, color: 'secondary' },
                            { name: 'Sciences', value: 45, color: 'success' }
                        ]}
                    />
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab('resources')}
                                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'resources' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                Ressources récentes
                            </button>
                            <button
                                onClick={() => setActiveTab('games')}
                                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'games' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                Jeux
                            </button>
                            <button
                                onClick={() => setActiveTab('quizzes')}
                                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'quizzes' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                Quiz
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'resources' && (
                            <ResourceGrid resources={resources} />
                        )}

                        {activeTab === 'games' && (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {games.map(game => (
                                    <GameCard
                                        key={game.id}
                                        {...game}
                                        progress={playedGames.find(g => g.id === game.id)?.progress || 0}
                                    />
                                ))}
                            </div>
                        )}

                        {activeTab === 'quizzes' && (
                            <div className="space-y-4">
                                {quizzes.map(quiz => (
                                    <div key={quiz.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <h3 className="font-medium text-gray-900">{quiz.title}</h3>
                                            <p className="text-sm text-gray-500">{quiz.description}</p>
                                        </div>
                                        <a
                                            href={`${ROUTES.CHILD_PLAY_QUIZ}/${quiz.id}`}
                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                        >
                                            Commencer
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ChildLayout>
    )
}

export default ChildDashboard