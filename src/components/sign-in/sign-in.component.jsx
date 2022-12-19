import {signInUserWithEmailAndPassword, signInWithGooglePopup} from '../../utils/firebase/firebase.utils'
import FormInput from '../../components/form-input/form-input.component'
import Button, {BUTTON_TYPE_CLASSES} from '../../components/button/button.component'
import {useState} from 'react'
import {ButtonsContainer, SignInContainer, SignInHeader} from './sign-in.styles'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    let [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields

    const handleChange = async (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    const submitUserCredentials = async (event) => {
        event.preventDefault()
        await signInWithCredentials()
    }

    const signInWithCredentials = async() => {
        try {
            await signInUserWithEmailAndPassword(email, password)
            resetFormFields()
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    alert('User not found.')
                    break
                case 'auth/wrong-password':
                    alert('Your password was incorrect.  Please try again.')
                    break
                default:
                    console.log('user sign in encountered an error', error)
            }
        }
    }

    const resetFormFields = () => {
        setFormFields({...defaultFormFields})
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
    }

    return (
        <SignInContainer>
            <SignInHeader>I already have an account</SignInHeader>
            <span>Sign in with your email and password</span>

            <form onSubmit={submitUserCredentials}>
                <FormInput
                    label='Email'
                    inputOptions={{
                        type:'email',
                        name:'email',
                        value: email,
                        onChange: handleChange,
                        required: true
                    }}
                />
                <FormInput
                    label='Password'
                    inputOptions={{
                        type:'password',
                        name:'password',
                        value: password,
                        onChange: handleChange,
                        required: true
                    }}
                />
                <ButtonsContainer>
                    <Button type='submit'>
                        Sign in
                    </Button>

                    <Button
                        type='button'
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm