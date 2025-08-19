// src/components/shop/ProductCard.jsx
import { useState } from 'react'
import Button from '../common/Button'
import { useCart } from '../../hooks/useCart'

function ProductCard({ product }) {
    const { addToCart } = useCart()
    const [isAdding, setIsAdding] = useState(false)

    const handleAddToCart = async () => {
        setIsAdding(true)
        try {
            await addToCart(product)
        } catch (error) {
            console.error('Failed to add to cart:', error)
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gray-100 h-48 flex items-center justify-center p-4">
                <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            <div className="p-4">
                <h3 className="font-medium text-lg mb-1">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                <div className="flex justify-between items-center">
                    <span className="font-bold">{product.price}€</span>
                    <Button
                        size="sm"
                        onClick={handleAddToCart}
                        loading={isAdding}
                    >
                        Ajouter
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard