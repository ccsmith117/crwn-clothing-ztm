import { FormInputGroup, FormInputLabel, Input } from './form-input.styles'
import { FC, InputHTMLAttributes } from 'react'

type FormInputProps = {
    label: string
} & InputHTMLAttributes<HTMLInputElement>

const FormInput: FC<FormInputProps> = ({ label, ...inputOptions }) => {
    return (
        <FormInputGroup>
            <Input {...inputOptions} />
            {label && (
                <FormInputLabel
                    shrink={Boolean(
                        inputOptions.value &&
                            typeof inputOptions.value === 'string' &&
                            inputOptions.value.length
                    )}
                >
                    {label}
                </FormInputLabel>
            )}
        </FormInputGroup>
    )
}

export default FormInput
