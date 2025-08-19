// src/components/shop/ProductInfo.jsx
import { useState } from 'react'
import Button from '../common/Button'
import Rating from '../common/Rating'
import { useCart } from '../../../hooks/useCart'

function ProductInfo({
    product,
    className = ''
}) {
    const { addToCart } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [isAdding, setIsAdding] = useState(false)

    const handleAddToCart = async () => {
        setIsAdding(true)
        try {
            await addToCart({
                ...product,
                quantity
            })
        } catch (error) {
            console.error('Failed to add to cart:', error)
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <div className={`space-y-6 ${className}`}>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
                <p className="text-primary-600 text-2xl font-medium mt-2">
                    {product.price}€
                </p>
            </div>

            {product.rating && (
                <div className="flex items-center">
                    <Rating value={product.rating} />
                    <span className="ml-2 text-sm text-gray-500">
                        {product.reviewCount} avis
                    </span>
                </div>
            )}

            <div className="space-y-4">
                <p className="text-gray-700">{product.description}</p>

                {product.features && (
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-4 mb-4">
                    <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                        Quantité
                    </label>
                    <select
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>

                <Button
                    onClick={handleAddToCart}
                    loading={isAdding}
                    fullWidth
                >
                    Ajouter au panier
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo