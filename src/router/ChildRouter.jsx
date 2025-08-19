// src/routes/ChildRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import ChildLayout from '../components/layout/ChildLayout'
import ChildDashboard from '../pages/child/Dashboard'
import ChildProfile from '../pages/child/Profile'
import MathGame from '../pages/child/Games/MathGame'
import MemoryGame from '../pages/child/Games/MemoryGame'
import PuzzleGame from '../pages/child/Games/PuzzleGame'
import PlayQuiz from '../pages/child/Quizzes/PlayQuiz'
import QuizCompleted from '../pages/child/Quizzes/Completed'
import ArticleViewer from '../pages/child/Resources/Article'
import VideoViewer from '../pages/child/Resources/Video'
import { useAuth } from '../hooks/useAuth'
import NotFound from '../pages/NotFound'

function ChildRoutes() {
    const { user } = useAuth()

    if (!user || user.role !== 'child') {
        return <Navigate to={ROUTES.LOGIN} replace />
    }

    return (
        <Routes>
            <Route element={<ChildLayout />}>
                <Route index element={<ChildDashboard />} />
                <Route path="profile" element={<ChildProfile />} />

                {/* Games Routes */}
                <Route path="games">
                    <Route path="math" element={<MathGame />} />
                    <Route path="memory" element={<MemoryGame />} />
                    <Route path="puzzle" element={<PuzzleGame />} />
                </Route>

                {/* Quizzes Routes */}
                <Route path="quizzes">
                    <Route path="play/:id" element={<PlayQuiz />} />
                    <Route path="completed/:id" element={<QuizCompleted />} />
                </Route>

                {/* Resources Routes */}
                <Route path="resources">
                    <Route path="article/:id" element={<ArticleViewer />} />
                    <Route path="video/:id" element={<VideoViewer />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default ChildRoutes