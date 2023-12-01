import { useContext } from "react";
import SendContext from "../../contexts/SendContext";

export default function Form({ name, titleButton, children, isValid, onSubmit }) {
    const isSent = useContext(SendContext)
    return (
        <form noValidate name={name} onSubmit={onSubmit}>
            {children}
            {name === 'sign-in' || name === 'sign-up' ?
            <button className={`login__button ${isSent ? 'login__button_loading' : ''} ${isValid ? '' : 'login__button_disable'}`}>
                {isSent ? '' : titleButton || 'Сохранить'}
            </button>
            :
            <button className={`popup__save ${isSent ? 'popup__save_loading' : ''}  ${isValid ? '' : 'popup__save_disabled'}`} >
                {isSent ? '' : titleButton || 'Сохранить'}
            </button>
}
        </form>
    )
}