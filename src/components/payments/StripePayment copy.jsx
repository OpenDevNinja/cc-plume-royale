// src/components/payments/StripePayment.jsx
import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Button from '../common/Button'
import ErrorMessage from '../common/ErrorMessage'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const CheckoutForm = ({ amount, onSuccess, onError }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) return

        setLoading(true)
        setError(null)

        try {
            const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement)
            })

            if (stripeError) {
                setError(stripeError.message)
                return
            }

            // Envoyer le paymentMethod.id à votre backend pour confirmer le paiement
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.id,
                    amount
                })
            })

            const result = await response.json()

            if (result.error) {
                setError(result.error)
            } else {
                onSuccess(result)
            }
        } catch (err) {
            setError(err.message)
            onError(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border rounded-lg p-4">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4'
                                }
                            },
                            invalid: {
                                color: '#9e2146'
                            }
                        }
                    }}
                />
            </div>

            {error && <ErrorMessage message={error} />}

            <Button
                type="submit"
                disabled={!stripe || loading}
                loading={loading}
                fullWidth
            >
                Payer {amount}€
            </Button>
        </form>
    )
}

function StripePayment({ amount = 0, onSuccess, onError }) {
    const [clientReady, setClientReady] = useState(false)

    useEffect(() => {
        stripePromise.then(() => setClientReady(true))
    }, [])

    if (!clientReady) return <div>Chargement du système de paiement...</div>

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm
                amount={amount}
                onSuccess={onSuccess}
                onError={onError}
            />
        </Elements>
    )
}

export default StripePayment