import {useState} from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-up.styles'
import {SignUpContainer, SignUpHeader} from './sign-up.styles'
import {useDispatch} from 'react-redux'
import {signUp} from '../../store/user/user.action'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    let [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    const isFormValid = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match.")
            return false;
        }
        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (isFormValid()) {
            createUser()
        }
    }

    const createUser = () => {
        try {
            dispatch(signUp(email, password, displayName))
            resetFormFields()
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user- email already in use.')
            } else {
                console.log('user creation encountered an error', error)
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
                    label='Display Name'
                    inputOptions={{
                        type:'text',
                        name:'displayName',
                        value: displayName,
                        onChange: handleChange,
                        required: true
                    }}
                />

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

                <FormInput
                    label='Confirm Password'
                    inputOptions={{
                        type:'password',
                        name:'confirmPassword',
                        value: confirmPassword,
                        onChange: handleChange,
                        required: true
                    }}
                />

                <Button type='submit'>Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm