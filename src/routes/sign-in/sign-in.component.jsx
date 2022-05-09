import { createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up.component'

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup()
        console.log(response)
        createUserDocumentFromAuth(response.user)
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign In with Google Popup
            </button>
            <SignUpForm />
        </div>
    )
}

export default SignIn