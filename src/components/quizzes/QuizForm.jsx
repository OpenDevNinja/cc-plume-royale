import React, { useState } from 'react'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'

import Input from '@/components/common/Input'
import Select from '@/components/common/Select'
import Button from '@/components/common/Button'
import ErrorMessage from '@/components/common/ErrorMessage'

const QuizForm = ({
    initialValues = {
        title: '',
        subject: '',
        level: '',
        questions: []
    },
    onSubmit,
    subjects = [],
    levels = []
}) => {
    const [activeTab, setActiveTab] = useState('details')

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Le titre est requis'),
        subject: Yup.string().required('La matière est requise'),
        level: Yup.string().required('Le niveau est requis'),
        questions: Yup.array().of(
            Yup.object().shape({
                text: Yup.string().required('La question est requise'),
                options: Yup.array().of(
                    Yup.string().required('L\'option est requise')
                ).min(2, 'Au moins 2 options requises'),
                correctAnswer: Yup.number()
                    .required('La réponse correcte est requise')
                    .min(0, 'Doit être entre 0 et 3')
                    .max(3, 'Doit être entre 0 et 3')
            })
        ).min(1, 'Au moins une question requise')
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values, errors, touched }) => (
                <Form className="bg-white rounded-lg shadow p-6">
                    <div className="flex border-b border-gray-200 mb-6">
                        <button
                            type="button"
                            className={`py-2 px-4 font-medium ${activeTab === 'details' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('details')}
                        >
                            Détails
                        </button>
                        <button
                            type="button"
                            className={`py-2 px-4 font-medium ${activeTab === 'questions' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('questions')}
                        >
                            Questions ({values.questions.length})
                        </button>
                    </div>

                    {activeTab === 'details' && (
                        <div className="space-y-4">
                            <Input
                                label="Titre du quiz"
                                name="title"
                                required
                            />

                            <Select
                                label="Matière"
                                name="subject"
                                options={subjects}
                                required
                            />

                            <Select
                                label="Niveau"
                                name="level"
                                options={levels}
                                required
                            />
                        </div>
                    )}

                    {activeTab === 'questions' && (
                        <FieldArray name="questions">
                            {({ push, remove }) => (
                                <div className="space-y-6">
                                    {values.questions.map((question, qIndex) => (
                                        <div key={qIndex} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-4">
                                                <h4 className="font-medium">Question {qIndex + 1}</h4>
                                                <button
                                                    type="button"
                                                    className="text-danger-500 text-sm"
                                                    onClick={() => remove(qIndex)}
                                                >
                                                    Supprimer
                                                </button>
                                            </div>

                                            <Input
                                                label="Question"
                                                name={`questions.${qIndex}.text`}
                                                required
                                            />

                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Options
                                                </label>
                                                <div className="space-y-2">
                                                    {[0, 1, 2, 3].map((optionIndex) => (
                                                        <div key={optionIndex} className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                name={`questions.${qIndex}.correctAnswer`}
                                                                value={optionIndex}
                                                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                                            />
                                                            <Input
                                                                name={`questions.${qIndex}.options.${optionIndex}`}
                                                                className="ml-2 flex-1"
                                                                required
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                <ErrorMessage
                                                    name={`questions.${qIndex}.correctAnswer`}
                                                    component="div"
                                                    className="mt-1 text-sm text-danger-600"
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => push({
                                            text: '',
                                            options: ['', '', '', ''],
                                            correctAnswer: 0
                                        })}
                                    >
                                        Ajouter une question
                                    </Button>
                                </div>
                            )}
                        </FieldArray>
                    )}

                    <div className="mt-8 flex justify-end space-x-4">
                        <Button type="button" variant="outline">
                            Annuler
                        </Button>
                        <Button type="submit" variant="primary">
                            Enregistrer
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default QuizForm