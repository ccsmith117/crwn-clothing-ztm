import {createUserDocumentFromAuth, signInWithGooglePopup} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocumentReference = await createUserDocumentFromAuth(user)
        console.log(userDocumentReference)
    }

    return (
        <div>
            <h1>Sign in</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
        </div>
    )
}

export default SignIn