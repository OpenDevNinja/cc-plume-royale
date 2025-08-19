// src/components/educational/VideoPlayer.jsx
import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { fetchResourceContent } from '../../api/educationalResources'
import Loader from '../common/Loader'
import ErrorMessage from '../common/ErrorMessage'

const VideoPlayer = ({ resourceId }) => {
    const [videoUrl, setVideoUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const videoRef = useRef(null)

    useEffect(() => {
        const loadVideo = async () => {
            try {
                setIsLoading(true)
                const url = await fetchResourceContent(resourceId)
                setVideoUrl(url)
                setError(null)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadVideo()
    }, [resourceId])

    const togglePlay = () => {
        if (isPlaying) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    if (isLoading) return <Loader />
    if (error) return <ErrorMessage message={error} />

    return (
        <div className="relative">
            <video
                ref={videoRef}
                src={videoUrl}
                controls
                className="w-full rounded-lg shadow"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            {!isPlaying && (
                <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30 rounded-lg"
                >
                    <svg
                        className="w-16 h-16 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            )}
        </div>
    )
}

VideoPlayer.propTypes = {
    resourceId: PropTypes.string.isRequired
}

export default VideoPlayer