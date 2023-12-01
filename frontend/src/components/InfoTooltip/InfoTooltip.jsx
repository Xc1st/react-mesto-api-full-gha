import Popup from "../Popup/Popup";

export default function InfoTooltip({ name, isSuccessful, isOpen, onClose }) {

    return (
        <Popup name={name} isOpen={isOpen} onClose={onClose}>
            <div className={` ${ isSuccessful ? 'popup__registration_type_successful' : 'popup__registration_type_error'}`} />
            <h2 className="popup__registration_type_title">{isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        </Popup>
    )
}