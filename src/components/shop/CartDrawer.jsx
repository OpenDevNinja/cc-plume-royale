// src/components/shop/CartDrawer.jsx
import { useState, useEffect } from 'react'
import { useCart } from '../../../hooks/useCart'
import CartItem from './CartItem'
import Button from '../common/Button'
import { ROUTES } from '../../../config/routes'

function CartDrawer({
    isOpen,
    onClose,
    onCheckout
}) {
    const { cart, cartTotal, cartCount, removeFromCart, updateQuantity, clearCart } = useCart()
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true)
        }
    }, [isOpen])

    const handleClose = () => {
        setIsAnimating(false)
        setTimeout(onClose, 300)
    }

    if (!isOpen && !isAnimating) return null

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div
                className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity ${isAnimating ? 'opacity-100' : 'opacity-0'
                    }`}
                onClick={handleClose}
            />

            <div
                className={`fixed inset-y-0 right-0 max-w-full flex transform transition-all ${isAnimating ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="w-screen max-w-md">
                    <div className="h-full flex flex-col bg-white shadow-xl">
                        <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                            <div className="flex items-start justify-between">
                                <h2 className="text-lg font-medium text-gray-900">Panier</h2>
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-500"
                                    onClick={handleClose}
                                >
                                    <span className="sr-only">Fermer</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mt-8">
                                {cartCount === 0 ? (
                                    <div className="text-center py-12">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">Panier vide</h3>
                                        <p className="mt-1 text-sm text-gray-500">Commencez vos achats pour remplir votre panier</p>
                                        <div className="mt-6">
                                            <Button
                                                variant="outline"
                                                onClick={handleClose}
                                            >
                                                Continuer mes achats
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flow-root">
                                            <ul className="-my-6 divide-y divide-gray-200">
                                                {cart.map((item) => (
                                                    <CartItem
                                                        key={item.id}
                                                        item={item}
                                                        onRemove={() => removeFromCart(item.id)}
                                                        onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
                                                    />
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Total</p>
                                                <p>{cartTotal.toFixed(2)}€</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">Frais de livraison calculés à l'étape suivante</p>
                                            <div className="mt-6">
                                                <Button
                                                    fullWidth
                                                    onClick={onCheckout}
                                                >
                                                    Passer la commande
                                                </Button>
                                            </div>
                                            <div className="mt-4 flex justify-center text-sm text-center text-gray-500">
                                                <button
                                                    type="button"
                                                    className="text-primary-600 font-medium hover:text-primary-500"
                                                    onClick={clearCart}
                                                >
                                                    Vider le panier
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartDrawer