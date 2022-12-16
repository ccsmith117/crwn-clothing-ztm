import {FormInputGroup, FormInputLabel, Input} from './form-input.styles'

const FormInput = ({label, inputOptions}) => {
    return (
        <FormInputGroup>
            <Input {...inputOptions}/>
            {label &&
                (<FormInputLabel className={`${inputOptions.value.length ? 'shrink' : ''} form-input-label`.trim()}>
                    {label}
                </FormInputLabel>)}
        </FormInputGroup>
    )
}

export default FormInput