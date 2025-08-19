import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../../../config/routes'
import { useTutors } from '../../../../hooks/useTutors'
import Card from '../../../common/Card'
import Avatar from '../../../common/Avatar'
import Badge from '../../../common/Badge'
import Button from '../../../common/Button'
import { StarRating } from '../../../common/StarRating'
import { AcademicCapIcon, CalendarIcon } from '@heroicons/react/outline'

const TutorList = () => {
    const { approvedTutors, isLoading } = useTutors()

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                    [...Array(3)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <div className="h-64 bg-gray-200 rounded-lg"></div>
                        </Card>
                    ))
                ) : approvedTutors.length > 0 ? (
                    approvedTutors.map(tutor => (
                        <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
                            <div className="p-6 space-y-4">
                                <div className="flex items-center space-x-4">
                                    <Avatar
                                        src={tutor.avatar}
                                        alt={`${tutor.firstName} ${tutor.lastName}`}
                                        size="lg"
                                    />
                                    <div>
                                        <h3 className="text-lg font-medium">
                                            {tutor.firstName} {tutor.lastName}
                                        </h3>
                                        <p className="text-primary-600">{tutor.specialty}</p>
                                        <StarRating rating={tutor.rating} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <AcademicCapIcon className="h-4 w-4 mr-2" />
                                        <span>{tutor.qualifications.join(', ')}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {tutor.availability.map(day => (
                                            <Badge key={day} color="primary" size="xs">
                                                {day}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-gray-600 line-clamp-3">
                                    {tutor.bio || 'Aucune biographie fournie'}
                                </p>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-lg font-bold">
                                        {tutor.hourlyRate} €/h
                                    </span>
                                    <Button
                                        as={Link}
                                        to={ROUTES.BOOK_TUTOR.replace(':id', tutor.id)}
                                        variant="primary"
                                        size="sm"
                                        icon={CalendarIcon}
                                    >
                                        Réserver
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <p className="text-gray-500">Aucun tuteur disponible pour le moment</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TutorList