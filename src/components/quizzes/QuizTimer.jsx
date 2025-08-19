// src/components/quizzes/QuizTimer.jsx
import { useState, useEffect } from 'react'

function QuizTimer({
    initialTime = 0,
    onTimeUpdate,
    onTimeUp,
    className = ''
}) {
    const [time, setTime] = useState(initialTime)
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        setTime(initialTime)
    }, [initialTime])

    useEffect(() => {
        let interval
        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime(prev => {
                    const newTime = prev - 1
                    if (onTimeUpdate) onTimeUpdate(newTime)
                    if (newTime <= 0) {
                        if (onTimeUp) onTimeUp()
                        setIsRunning(false)
                    }
                    return newTime
                })
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isRunning, time, onTimeUpdate, onTimeUp])

    const start = () => {
        setIsRunning(true)
    }

    const pause = () => {
        setIsRunning(false)
    }

    const reset = (newTime) => {
        setIsRunning(false)
        setTime(newTime || initialTime)
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    return (
        <div className={`flex items-center ${className}`}>
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{formatTime(time)}</span>
            <div className="ml-4 space-x-2">
                <button
                    onClick={start}
                    disabled={isRunning || time <= 0}
                    className="text-sm text-primary-600 hover:text-primary-800 disabled:text-gray-400"
                >
                    Démarrer
                </button>
                <button
                    onClick={pause}
                    disabled={!isRunning}
                    className="text-sm text-primary-600 hover:text-primary-800 disabled:text-gray-400"
                >
                    Pause
                </button>
                <button
                    onClick={() => reset()}
                    className="text-sm text-primary-600 hover:text-primary-800"
                >
                    Réinitialiser
                </button>
            </div>
        </div>
    )
}

export default QuizTimer