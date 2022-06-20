import {useState} from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import {SignUpContainer, SignUpHeader} from './sign-up-form.styles'
import {useDispatch} from 'react-redux'
import {signUpStart} from '../../store/user/user.action'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const dispatch = useDispatch()
    const [ formFields, setFormFields ] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({
            ...formFields,
            [name]: value
        })
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const { displayName, email, password, confirmPassword } = formFields
        if (password === confirmPassword) {
            try {
                dispatch(signUpStart(email, password, displayName))
                resetFormFields()
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    alert('Cannot create user, email already in use')
                } else {
                    console.log('user creation encountered an error ', error)
                }
            }
        } else {
            alert('passwords do not match')
        }
    }
    return (
        <SignUpContainer>
            <SignUpHeader>Don't have an account?</SignUpHeader>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    required
                    type='text'
                    onChange={ handleChange }
                    name='displayName'
                    value={ displayName }
                />
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
                <FormInput
                    label='Confirm Password'
                    type='password'
                    required
                    onChange={ handleChange }
                    name='confirmPassword'
                    value={ confirmPassword }
                />
                <Button type='submit'>Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm