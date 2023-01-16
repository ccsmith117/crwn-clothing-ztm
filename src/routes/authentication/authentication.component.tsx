import SignInForm from '../../components/sign-in/sign-in.component'
import SignUpForm from '../../components/sign-up/sign-up.component'
import {AuthenticationContainer} from './authentication.styles'

const Authentication = () => {
    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    )
}

export default Authentication