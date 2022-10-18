import {useState} from 'react'
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import './sign-up.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    let [formFields, setFormFields] = useState(defaultFormFields)
    const {displayName, email, password, confirmPassword} = formFields

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await createUser()
    }

    const createUser = async () => {
        try {
            await createUserFromFormFields()
            resetFormFields()
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user- email already in use.')
            } else {
                console.log('user creation encountered an error', error)
            }
        }
    }

    const createUserFromFormFields = async () => {
        if (password === confirmPassword) {
            const user = await createUserInFirebase()
            await createUserDocumentFromAuth(user)
        } else {
            alert("Passwords do not match.")
        }
    }

    async function createUserInFirebase() {
        const {user} = await createAuthUserWithEmailAndPassword(email, password)
        return {...user, displayName}
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
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
        </div>
    )
}

export default SignUpForm