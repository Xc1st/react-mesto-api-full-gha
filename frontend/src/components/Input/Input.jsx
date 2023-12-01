import { useContext } from "react";
import SendContext from '../../contexts/SendContext'

export default function Input({ name, type, placeholder, minLength, maxLength, isInputValid, value, onChange, error }) {
    const isSent = useContext(SendContext)

    return (
        <>
            {name === 'password' || name === 'email' ?
                <>
                    <input
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        minLength={minLength ? minLength : ''}
                        maxLength={maxLength ? maxLength : ''}
                        required
                        className={`login__input ${isInputValid === undefined || isInputValid ? '' : 'login__input_type_error'}`}
                        value={value ? value : ''}
                        onChange={onChange}
                        disabled={isSent}
                    />
                    <span className={'login__error'}>{error}</span>
                </>
                :
                <>
                    <input
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        minLength={minLength ? minLength : ''}
                        maxLength={maxLength ? maxLength : ''}
                        required
                        className={`popup__input ${isInputValid === undefined || isInputValid ? '' : 'popup__input_type_error'}`}
                        value={value ? value : ''}
                        onChange={onChange}
                        disabled={isSent}
                    />
                    <span className={'popup__error'}>{error}</span>
                </>
            }
        </>
    )
}