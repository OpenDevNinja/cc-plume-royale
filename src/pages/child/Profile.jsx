import React from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Avatar from '@/components/common/Avatar'
import Badge from '@/components/common/Badge'
import ProgressBar from '@/components/common/ProgressBar'
import Button from '@/components/common/Button'

import { FiAward, FiBookOpen } from 'react-icons/fi'
import { FaGraduationCap } from 'react-icons/fa'

const ChildProfile = () => {
    const childData = {
        name: "Emma Dupont",
        avatar: "/assets/images/avatars/child1.png",
        grade: "CM1",
        points: 1250,
        badges: [
            { id: 1, name: "Math Expert", icon: "/assets/images/badges/gold.png" },
            { id: 2, name: "Reading Champion", icon: "/assets/images/badges/silver.png" },
            { id: 3, name: "Science Explorer", icon: "/assets/images/badges/bronze.png" }
        ],
        progress: {
            math: 75,
            french: 68,
            science: 82
        }
    }

    return (
        <DashboardLayout title="Mon Profil">
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-8">
                    <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-6 sm:space-y-0 sm:space-x-6">
                        <div className="flex-shrink-0">
                            <Avatar
                                src={childData.avatar}
                                size="xl"
                                className="border-4 border-primary-100"
                            />
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-2xl font-bold text-gray-900">{childData.name}</h2>
                            <p className="text-primary-600 text-lg">Niveau : {childData.grade}</p>

                            <div className="mt-4 flex items-center justify-center sm:justify-start">
                                <FiAward className="h-5 w-5 text-yellow-500 mr-1" />
                                <span className="font-medium">{childData.points} points</span>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <FiBookOpen className="h-5 w-5 text-primary-600 mr-2" />
                                        <span className="font-medium">Ressues</span>
                                    </div>
                                    <p className="mt-1 text-2xl font-bold">24</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <FaGraduationCap className="h-5 w-5 text-primary-600 mr-2" />
                                        <span className="font-medium">Badges</span>
                                    </div>
                                    <p className="mt-1 text-2xl font-bold">{childData.badges.length}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center">
                                        <FiAward className="h-5 w-5 text-primary-600 mr-2" />
                                        <span className="font-medium">Quiz</span>
                                    </div>
                                    <p className="mt-1 text-2xl font-bold">15</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Ma progression</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium">Mathématiques</span>
                                    <span>{childData.progress.math}%</span>
                                </div>
                                <ProgressBar value={childData.progress.math} color="primary" />
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium">Français</span>
                                    <span>{childData.progress.french}%</span>
                                </div>
                                <ProgressBar value={childData.progress.french} color="secondary" />
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium">Sciences</span>
                                    <span>{childData.progress.science}%</span>
                                </div>
                                <ProgressBar value={childData.progress.science} color="success" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Mes badges</h3>
                        <div className="flex flex-wrap gap-4">
                            {childData.badges.map(badge => (
                                <div key={badge.id} className="flex flex-col items-center">
                                    <img
                                        src={badge.icon}
                                        alt={badge.name}
                                        className="h-16 w-16"
                                    />
                                    <span className="mt-2 text-sm font-medium">{badge.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <Button variant="outline">
                            Modifier mon avatar
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default ChildProfile