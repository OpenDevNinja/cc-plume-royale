// src/components/shop/ProductReviews.jsx
import { useState } from 'react'
import Avatar from '../common/Avatar'
import Button from '../common/Button'
import Input from '../common/Input'
import Rating from '../common/Rating'

function ProductReviews({ reviews, onAddReview }) {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (rating === 0 || !comment.trim()) return

        setIsSubmitting(true)
        try {
            await onAddReview({ rating, comment })
            setRating(0)
            setComment('')
        } catch (error) {
            console.error('Failed to submit review:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-8">
            <h3 className="text-lg font-medium">Avis des clients</h3>

            {reviews.length > 0 ? (
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-0">
                            <div className="flex items-start space-x-4">
                                <Avatar src={review.user.avatar} size="md" />
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <h4 className="font-medium">{review.user.name}</h4>
                                        <Rating value={review.rating} readOnly />
                                    </div>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {new Date(review.date).toLocaleDateString()}
                                    </p>
                                    <p className="mt-2 text-gray-800">{review.comment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">Aucun avis pour le moment.</p>
            )}

            <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg space-y-4">
                <h4 className="font-medium">Donnez votre avis</h4>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Note
                    </label>
                    <Rating
                        value={rating}
                        onChange={setRating}
                        interactive
                    />
                </div>
                <Input
                    label="Commentaire"
                    type="textarea"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    disabled={rating === 0 || !comment.trim() || isSubmitting}
                    loading={isSubmitting}
                >
                    Soumettre l'avis
                </Button>
            </form>
        </div>
    )
}

export default ProductReviews