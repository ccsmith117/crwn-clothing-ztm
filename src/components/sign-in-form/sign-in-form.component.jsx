import './sign-in-form.styles.scss'
import {
    signInUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import {useState} from "react";
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({
            ...formFields,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { email, password } = formFields
        try {
            await signInUserWithEmailAndPassword(email, password)
            resetFormFields()
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break
                default:
                    console.log(error)
            }
        }
    }

    const logGoogleUser = async () => {
        await signInWithGooglePopup()
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput
                    label='Email'
                    required
                    type='email'
                    onChange={ handleChange }
                    name='email'
                    value={ email }
                />
                <FormInput
                    label='Password'
                    type='password'
                    required
                    onChange={ handleChange }
                    name='password'
                    value={ password }
                />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button
                        type='button'
                        buttonType='google'
                        onClick={logGoogleUser}
                    >
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm