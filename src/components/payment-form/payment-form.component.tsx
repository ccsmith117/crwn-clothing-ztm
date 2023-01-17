import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import {BUTTON_TYPE_CLASSES} from '../button/button.component'
import {FormContainer, PaymentButton} from './payment-form.styles'
import {selectCartTotalPrice} from '../../store/cart/cart.selector'
import {useSelector} from 'react-redux'
import {selectCurrentUser} from '../../store/user/user.selector'
import {FormEvent, useState} from 'react'

const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const amount = useSelector(selectCartTotalPrice)
    const currentUser = useSelector(selectCurrentUser)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)

    const convertToCents = (amount: number) => {
        return amount * 100
    }

    const paymentHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!stripe || !elements) {
            console.error('stripe or elements not setup')
            return
        }

        setIsProcessingPayment(true)

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: convertToCents(amount)})
        }).then(res => res.json())

        const clientSecret = response.paymentIntent.client_secret
        const card = elements.getElement(CardElement)

        if (card != null) {
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: currentUser.displayName ? currentUser.displayName : 'Guest'
                    }
                }
            })

            setIsProcessingPayment(false)

            if (paymentResult.error) {
                alert(paymentResult.error)
            } else if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successful')
            }
        }
    }

    return (
        <FormContainer onSubmit={paymentHandler}>
            <h2>Credit Card Payment: </h2>
            <CardElement />
            <PaymentButton buttonType={BUTTON_TYPE_CLASSES.inverted} isLoading={isProcessingPayment}>Pay Now</PaymentButton>
        </FormContainer>
    )
}

export default PaymentForm