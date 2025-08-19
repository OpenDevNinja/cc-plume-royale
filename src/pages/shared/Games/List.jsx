import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../../config/routes'
import Card from '../../../common/Card'
import Badge from '../../../common/Badge'
import { StarRating } from '../../../common/StarRating'

const games = [
    {
        id: '1',
        title: 'Calcul rapide',
        subject: 'math',
        level: 'ce2',
        description: 'Résolvez des opérations mathématiques le plus vite possible!',
        image: '/assets/images/games/math-game.jpg',
        rating: 4.7,
        skills: ['calcul mental', 'rapidité']
    },
    {
        id: '2',
        title: 'Memory des mots',
        subject: 'french',
        level: 'cm1',
        description: 'Retrouvez les paires de mots et améliorez votre vocabulaire',
        image: '/assets/images/games/memory-game.jpg',
        rating: 4.5,
        skills: ['mémoire', 'vocabulaire']
    },
    {
        id: '3',
        title: 'Puzzle géographique',
        subject: 'geography',
        level: 'cm2',
        description: 'Reconstituez la carte de France en plaçant les départements',
        image: '/assets/images/games/puzzle-game.jpg',
        rating: 4.9,
        skills: ['géographie', 'logique']
    }
]

const GamesList = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map(game => (
                <Link
                    key={game.id}
                    to={ROUTES.CHILD_GAMES + '/' + game.id}
                    className="hover:opacity-90 transition-opacity"
                >
                    <Card className="h-full">
                        <div className="p-4">
                            <img
                                src={game.image}
                                alt={game.title}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-lg font-bold">{game.title}</h3>
                            <div className="mt-1 flex items-center">
                                <Badge color="primary" size="sm" className="mr-2">
                                    {game.subject === 'math' && 'Maths'}
                                    {game.subject === 'french' && 'Français'}
                                    {game.subject === 'geography' && 'Géographie'}
                                </Badge>
                                <Badge color="secondary" size="sm">
                                    {game.level.toUpperCase()}
                                </Badge>
                            </div>
                            <p className="mt-2 text-gray-600 line-clamp-2">{game.description}</p>
                            <div className="mt-3 flex items-center justify-between">
                                <StarRating rating={game.rating} />
                                <div className="flex flex-wrap gap-1">
                                    {game.skills.map(skill => (
                                        <span key={skill} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    )
}

export default GamesList