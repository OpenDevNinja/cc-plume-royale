import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Card from '@/components/common/Card'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
//import { TrashIcon } from '@heroicons/react/outline'
import { FiTrash2 } from "react-icons/fi";
const CartPage = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: '1',
            name: 'Cahier d\'activités Mathématiques CM1',
            price: 7.99,
            image: '/assets/images/books/math-cm1.jpg',
            quantity: 1
        },
        {
            id: '2',
            name: 'Kit scientifique',
            price: 24.99,
            image: '/assets/images/books/science-kit.jpg',
            quantity: 1
        }
    ])

    const [coupon, setCoupon] = useState('')

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 1) return
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ))
    }

    const handleRemoveItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const discount = coupon === 'EDU20' ? subtotal * 0.2 : 0
    const total = subtotal - discount

    return (
        <DashboardLayout title="Mon panier">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.length === 0 ? (
                        <Card>
                            <div className="p-6 text-center">
                                <p className="text-gray-500 mb-4">Votre panier est vide</p>
                                <Button as={Link} to={ROUTES.PARENT_SHOP} variant="primary">
                                    Parcourir la boutique
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        <Card>
                            <div className="p-6">
                                <h3 className="text-lg font-medium mb-4">Vos articles ({cartItems.length})</h3>
                                <div className="divide-y divide-gray-200">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="py-4 flex flex-col sm:flex-row">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-24 w-24 object-cover rounded-lg"
                                                />
                                            </div>
                                            <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                                                <div className="flex justify-between">
                                                    <h4 className="font-medium">{item.name}</h4>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="text-gray-400 hover:text-danger-500"
                                                    >
                                                        <FiTrash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            className="w-8 h-8 border rounded-l flex items-center justify-center"
                                                        >
                                                            -
                                                        </button>
                                                        <div className="w-12 h-8 border-t border-b flex items-center justify-center">
                                                            {item.quantity}
                                                        </div>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            className="w-8 h-8 border rounded-r flex items-center justify-center"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <span className="font-bold">{item.price.toFixed(2)} €</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    )}
                </div>

                <div className="space-y-4">
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-medium mb-4">Récapitulatif</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>Sous-total</span>
                                    <span>{subtotal.toFixed(2)} €</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Remise</span>
                                    <span className="text-success-600">-{discount.toFixed(2)} €</span>
                                </div>
                                <div className="pt-3 border-t border-gray-200 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>{total.toFixed(2)} €</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Code promo</label>
                                <div className="flex">
                                    <Input
                                        type="text"
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                        placeholder="Entrez votre code"
                                        className="flex-1 rounded-r-none"
                                    />
                                    <Button className="rounded-l-none">
                                        Appliquer
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Button
                                    as={Link}
                                    to={ROUTES.PARENT_CHECKOUT}
                                    variant="primary"
                                    disabled={cartItems.length === 0}
                                    className="w-full"
                                >
                                    Passer la commande
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-medium mb-2">Paiement sécurisé</h3>
                            <p className="text-sm text-gray-500">
                                Toutes les transactions sont sécurisées et cryptées. Nous ne stockons jamais vos informations de paiement.
                            </p>
                            <div className="mt-4 flex space-x-3">
                                <img src="/assets/images/payment/visa.png" alt="Visa" className="h-8" />
                                <img src="/assets/images/payment/mastercard.png" alt="Mastercard" className="h-8" />
                                <img src="/assets/images/payment/paypal.png" alt="PayPal" className="h-8" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default CartPage