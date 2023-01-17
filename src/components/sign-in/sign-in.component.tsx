import FormInput from '../form-input/form-input.component'
import Button, {BUTTON_TYPE_CLASSES} from '../../components/button/button.component'
import {ChangeEvent, FormEvent, useState} from 'react'
import {ButtonsContainer, SignInContainer, SignInHeader} from './sign-in.styles'
import {useDispatch} from 'react-redux'
import {emailSignInStart, googleSignInStart} from '../../store/user/user.action'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    let [formFields, setFormFields] = useState(defaultFormFields)
    const {email, password} = formFields
    const dispatch = useDispatch()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }

    const signInUser = () => {
        try {
            dispatch(emailSignInStart(email, password))
            resetFormFields()
        } catch (error: any) { // todo how to handle error typing here?
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

    const submitUserCredentials = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        signInUser()
    }

    const resetFormFields = () => {
        setFormFields({...defaultFormFields})
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart())
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
                    <Button
                        type='submit'
                        isLoading={false}
                        buttonType={BUTTON_TYPE_CLASSES.base}
                    >
                        Sign in
                    </Button>

                    <Button
                        type='button'
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGoogle}
                        isLoading={false}
                    >
                        Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm