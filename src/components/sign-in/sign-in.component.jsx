import {
    createUserDocumentFromAuth,
    signInUserWithEmailAndPassword,
    signInWithGooglePopup
} from '../../utils/firebase/firebase.utils'
import FormInput from '../../components/form-input/form-input.component'
import Button from '../../components/button/button.component'
import {useState} from 'react'

import './sign-in.styles.scss'

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
            const user = await signInUserWithEmailAndPassword(email, password)
            resetFormFields()
            console.log(user)
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
        const {user} = await signInWithGooglePopup()
        await createUserDocumentFromAuth(user)
    }

    return (
        <div className='sign-in-container'>
            <h2>I already have an account</h2>
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
                <div className='buttons-container'>
                    <Button type='submit'>
                        Sign in
                    </Button>

                    <Button
                        type='button'
                        buttonType='google'
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm