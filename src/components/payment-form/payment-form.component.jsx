import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import {FormContainer} from './payment-form.styles'

const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const paymentHandler = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            console.error('stripe or elements not setup')
            return
        }

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: 10000})
        }).then(res => res.json())

        const clientSecret = response.paymentIntent.client_secret
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Bob Bobber'
                }
            }
        })

        if (paymentResult.error) {
            alert(paymentResult.error)
        } else if (paymentResult.paymentIntent.status === 'succeeded') {
            alert('Payment Successful')
        }
    }

    return (
        <FormContainer onSubmit={paymentHandler}>
            <h2>Credit Card Payment: </h2>
            <CardElement />
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
        </FormContainer>
    )
}

export default PaymentForm