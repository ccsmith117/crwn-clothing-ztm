import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import ExistingSignInForm from "../../components/sign-in-form/sign-in-form.component";
import './authentication.scss'

const Authentication = () => {
    return (
        <div className='authentication-container'>
            <ExistingSignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication