// src/components/shop/CheckoutSteps.jsx
import { useState } from 'react'
import Button from '../common/Button'

const STEPS = [
    { id: 'cart', name: 'Panier' },
    { id: 'information', name: 'Informations' },
    { id: 'payment', name: 'Paiement' },
    { id: 'confirmation', name: 'Confirmation' }
]

function CheckoutSteps({ currentStep, onStepChange }) {
    const currentIndex = STEPS.findIndex(step => step.id === currentStep)

    return (
        <nav className="flex items-center justify-center mb-8">
            <ol className="flex items-center space-x-8">
                {STEPS.map((step, index) => (
                    <li key={step.id} className="flex items-center">
                        {index <= currentIndex ? (
                            <button
                                onClick={() => onStepChange(step.id)}
                                className={`flex items-center ${index === currentIndex
                                        ? 'text-primary-600 font-medium'
                                        : 'text-primary-500 hover:text-primary-700'
                                    }`}
                            >
                                <span className={`flex items-center justify-center w-8 h-8 rounded-full ${index === currentIndex
                                        ? 'bg-primary-100'
                                        : 'bg-primary-50'
                                    }`}>
                                    {index + 1}
                                </span>
                                <span className="ml-2">{step.name}</span>
                            </button>
                        ) : (
                            <span className="flex items-center text-gray-400">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                                    {index + 1}
                                </span>
                                <span className="ml-2">{step.name}</span>
                            </span>
                        )}

                        {index < STEPS.length - 1 && (
                            <svg
                                className="w-5 h-5 text-gray-300 mx-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default CheckoutSteps