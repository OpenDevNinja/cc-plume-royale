import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import {
    FiPlay,          // Play
    FiPause,         // Pause
    FiArrowLeft      // Back arrow
} from "react-icons/fi";
const VideoPlayer = () => {
    const { id } = useParams()
    const videoRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)

    const videoData = {
        id,
        title: "Apprendre les fractions facilement",
        description: "Cette vidéo explique les concepts de base des fractions avec des exemples concrets.",
        duration: 582, // en secondes
        url: "/assets/videos/math/fractions.mp4",
        thumbnail: "/assets/images/books/math.jpg",
        subject: 'math',
        level: 'cm1'
    }

    const handlePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play()
            setIsPlaying(true)
        } else {
            videoRef.current.pause()
            setIsPlaying(false)
        }
    }

    const handleTimeUpdate = () => {
        const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100
        setProgress(currentProgress)
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`
    }

    return (
        <DashboardLayout title={videoData.title}>
            <div className="space-y-6">
                <Card>
                    <div className="p-6">
                        <div className="mb-4">
                            <Button
                                variant="outline"
                                icon={FiArrowLeft}
                                onClick={() => window.history.back()}
                            >
                                Retour
                            </Button>
                        </div>

                        <div className="relative">
                            <video
                                ref={videoRef}
                                src={videoData.url}
                                poster={videoData.thumbnail}
                                className="w-full rounded-lg"
                                onTimeUpdate={handleTimeUpdate}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                    onClick={handlePlayPause}
                                    className={`p-4 rounded-full bg-black bg-opacity-50 text-white transition-all ${isPlaying ? 'opacity-0 hover:opacity-100' : ''}`}
                                >
                                    {isPlaying ? (
                                        <FiPause className="h-12 w-12" />
                                    ) : (
                                        <FiPlay className="h-12 w-12" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                                <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
                                <span>{formatTime(videoData.duration)}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-primary-600 h-2.5 rounded-full"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-medium">Description</h3>
                            <p className="text-gray-600 mt-2">{videoData.description}</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">Vidéos similaires</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                <div className="relative">
                                    <img
                                        src="/assets/images/books/math2.jpg"
                                        alt="Mathématiques"
                                        className="w-full h-32 object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <PlayIcon className="h-8 w-8 text-white bg-black bg-opacity-50 rounded-full p-2" />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className="font-medium">Les nombres décimaux</h4>
                                    <p className="text-sm text-gray-500 mt-1">Maths • CM1 • 8 min</p>
                                </div>
                            </div>
                            <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                <div className="relative">
                                    <img
                                        src="/assets/images/books/math3.jpg"
                                        alt="Mathématiques"
                                        className="w-full h-32 object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <PlayIcon className="h-8 w-8 text-white bg-black bg-opacity-50 rounded-full p-2" />
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className="font-medium">La multiplication</h4>
                                    <p className="text-sm text-gray-500 mt-1">Maths • CE2 • 6 min</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    )
}

export default VideoPlayer