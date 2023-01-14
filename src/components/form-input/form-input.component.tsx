import {FormInputGroup, FormInputLabel, Input} from './form-input.styles'
import {ChangeEventHandler} from "react";

type InputOptions = {
    type: string,
    name: string,
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    required: boolean
}

type FormInputProps = {
    label: string,
    inputOptions: InputOptions
}

const FormInput = ({label, inputOptions}: FormInputProps) => {
    return (
        <FormInputGroup>
            <Input {...inputOptions}/>
            {label &&
                (<FormInputLabel shrink={inputOptions.value.length}>
                    {label}
                </FormInputLabel>)}
        </FormInputGroup>
    )
}

export default FormInput