// src/pages/parent/Children/ChildProgress.jsx
import { useParams } from 'react-router-dom'
import ParentLayout from '@/components/layout/ParentLayout'
import { useChildren } from '@/hooks/useChildren'
import ProgressChart from '@/components/dashboard/ProgressChart'
import Loader from '@/components/common/Loader'
import ErrorMessage from '@/components/common/ErrorMessage'
import { ROUTES } from '@/config/routes'
import Button from '@/components/common/Button'

// import ProgressChart from '../../../../components/dashboard/ProgressChart'
// import Loader from '../../../../components/common/Loader'
// import ErrorMessage from '../../../../components/common/ErrorMessage'
// import { ROUTES } from '../../../../config/routes'
// import Button from '../../../../components/common/Button'

function ChildProgress() {
    const { id } = useParams()
    const { loadChildProgress } = useChildren()
    const [progressData, setProgressData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadProgress = async () => {
            try {
                setIsLoading(true)
                const data = await loadChildProgress(id)
                setProgressData(data)
                setError(null)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadProgress()
    }, [id, loadChildProgress])

    return (
        <ParentLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Progression de l'enfant</h1>
                    <Button
                        variant="outline"
                        to={ROUTES.PARENT_CHILDREN}
                    >
                        Retour
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader />
                    </div>
                ) : error ? (
                    <ErrorMessage
                        title="Erreur de chargement"
                        message={error}
                    />
                ) : (
                    <div className="space-y-8">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-lg font-medium mb-4">Progression globale</h2>
                            <ProgressChart
                                subjects={progressData.overallProgress}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-lg font-medium mb-4">Activités récentes</h2>
                                <ul className="space-y-3">
                                    {progressData.recentActivities.map((activity, index) => (
                                        <li key={index} className="flex items-start">
                                            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${activity.type === 'quiz' ? 'bg-blue-100 text-blue-600' :
                                                    activity.type === 'game' ? 'bg-green-100 text-green-600' :
                                                        'bg-purple-100 text-purple-600'
                                                }`}>
                                                {activity.type === 'quiz' ? (
                                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                ) : activity.type === 'game' ? (
                                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-sm font-medium">{activity.title}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(activity.date).toLocaleDateString()} • {activity.score}%
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-lg font-medium mb-4">Statistiques</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Temps total passé</h3>
                                        <p className="text-lg font-medium">{progressData.totalTime} minutes</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Ressources consultées</h3>
                                        <p className="text-lg font-medium">{progressData.resourcesViewed}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Quiz complétés</h3>
                                        <p className="text-lg font-medium">{progressData.quizzesCompleted}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ParentLayout>
    )
}

export default ChildProgress