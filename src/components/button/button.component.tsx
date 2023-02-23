import {
    BaseButton,
    ButtonSpinner,
    GoogleSignInButton,
    InvertedButton,
} from './button.styles'
import { ButtonHTMLAttributes, FC } from 'react'

export enum BUTTON_TYPE_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted',
}

const getButton = (
    buttonType = BUTTON_TYPE_CLASSES.base
): typeof BaseButton => {
    switch (buttonType) {
        case 'google-sign-in':
            return GoogleSignInButton
        case 'inverted':
            return InvertedButton
        default:
            return BaseButton
    }
}

export type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES
    isLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({
    children,
    buttonType,
    isLoading,
    ...buttonOptions
}) => {
    const CustomButton = getButton(buttonType)
    return (
        <CustomButton disabled={isLoading} {...buttonOptions}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton>
    )
}

export default Button
