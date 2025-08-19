// src/components/educational/VideoPlayer.jsx
import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '../common/Button'
import Loader from '../common/Loader'

function VideoPlayer({ src, poster, autoPlay = false, controls = true, className = '' }) {
    const videoRef = useRef(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isPlaying, setIsPlaying] = useState(autoPlay)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleLoadedData = () => {
            setIsLoading(false)
            setDuration(video.duration)
            if (autoPlay) video.play()
        }

        const handleTimeUpdate = () => {
            setProgress((video.currentTime / video.duration) * 100)
        }

        const handlePlay = () => setIsPlaying(true)
        const handlePause = () => setIsPlaying(false)
        const handleEnded = () => setIsPlaying(false)

        video.addEventListener('loadeddata', handleLoadedData)
        video.addEventListener('timeupdate', handleTimeUpdate)
        video.addEventListener('play', handlePlay)
        video.addEventListener('pause', handlePause)
        video.addEventListener('ended', handleEnded)

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData)
            video.removeEventListener('timeupdate', handleTimeUpdate)
            video.removeEventListener('play', handlePlay)
            video.removeEventListener('pause', handlePause)
            video.removeEventListener('ended', handleEnded)
        }
    }, [autoPlay])

    const togglePlay = () => {
        if (isPlaying) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }
    }

    const handleSeek = (e) => {
        const newTime = (e.target.value / 100) * duration
        videoRef.current.currentTime = newTime
    }

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoRef.current.requestFullscreen()
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    return (
        <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader />
                </div>
            )}

            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full"
                controls={false}
            />

            {!isLoading && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <div className="flex items-center space-x-4 mb-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={togglePlay}
                            className="text-white hover:bg-white hover:bg-opacity-10"
                        >
                            {isPlaying ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </Button>

                        <div className="flex-1">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progress}
                                onChange={handleSeek}
                                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        <span className="text-sm text-white">
                            {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
                        </span>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleFullscreen}
                            className="text-white hover:bg-white hover:bg-opacity-10"
                        >
                            {isFullscreen ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 16L4 20l4-2m10 2l2-4-4 2M4 8l2 4 2-4m12 0l-2 4 2 4" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

VideoPlayer.propTypes = {
    src: PropTypes.string.isRequired,
    poster: PropTypes.string,
    autoPlay: PropTypes.bool,
    controls: PropTypes.bool,
    className: PropTypes.string
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

export default VideoPlayer