import StartSection from "../StartSection/StartSection"
import useFormValidation from "../../utils/useFormValidation"
import Input from "../Input/Input"

export default function Register({ name, handleRegister }) {
    const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()

    function onRegister(e) {
        e.preventDefault()
        handleRegister(values.password, values.email)
    }
    return (
        <StartSection 
        name={name}
        onSubmit={onRegister}
        isValid={isValid}>

            <Input
            name='email'
            type='email'
            placeholder={'Email'}
            value={values.email}
            onChange={handleChange}
            isInputValid={isInputValid.email}
            error={errors.email}
            />

            <Input
            name='password'
            type='password'
            placeholder={'Пароль'}
            minLength={3}
            value={values.password}
            onChange={handleChange}
            isInputValid={isInputValid.password}
            error={errors.password}
            />

        </StartSection>
    )
}