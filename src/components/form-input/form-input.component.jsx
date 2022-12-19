import {FormInputGroup, FormInputLabel, Input} from './form-input.styles'

const FormInput = ({label, inputOptions}) => {
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