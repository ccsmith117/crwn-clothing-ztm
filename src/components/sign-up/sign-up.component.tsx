import { ChangeEvent, FormEvent, useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-up.styles'
import { SignUpContainer, SignUpHeader } from './sign-up.styles'
import { useDispatch } from 'react-redux'
import { AuthError, AuthErrorCodes } from 'firebase/auth'
import { signUpStarted } from '../../store/user/user.reducer'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    let [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields
    const dispatch = useDispatch()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }

    const isFormValid = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match.')
            return false
        }
        return true
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (isFormValid()) {
            createUser()
        }
    }

    const createUser = () => {
        try {
            dispatch(signUpStarted({ email, password, displayName }))
            resetFormFields()
        } catch (error) {
            if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Cannot create user- email already in use.')
            } else {
                console.log(
                    'user creation encountered an error',
                    error as Error
                )
            }
        }
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    return (
        <SignUpContainer>
            <SignUpHeader>Don't have an account?</SignUpHeader>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    required={true}
                />

                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required={true}
                />

                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required={true}
                />

                <FormInput
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    required={true}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm
