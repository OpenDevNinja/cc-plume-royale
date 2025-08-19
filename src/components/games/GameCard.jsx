import React from 'react'
import Badge from '@/components/common/Badge'
import Button from '@/components/common/Button'

import Rating from '@/components/common/Rating'
import PropTypes from 'prop-types'

const GameCard = ({
    id,
    title,
    description,
    image,
    subject,
    level,
    difficulty,
    rating,
    duration,
    onPlay
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                </div>
            </div>

            <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-3">
                    <Badge color="primary">{subject}</Badge>
                    <Badge color="secondary">{level}</Badge>
                    <Badge color={
                        difficulty === 'easy' ? 'success' :
                            difficulty === 'medium' ? 'warning' : 'danger'
                    }>
                        {difficulty}
                    </Badge>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

                <div className="flex items-center justify-between mb-4">
                    <Rating rating={rating} />
                    <span className="text-sm text-gray-500">{duration} min</span>
                </div>

                <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => onPlay(id)}
                >
                    Jouer
                </Button>
            </div>
        </div>
    )
}

GameCard.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    difficulty: PropTypes.oneOf(['easy', 'medium', 'hard']).isRequired,
    rating: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    onPlay: PropTypes.func.isRequired
}

export default GameCard