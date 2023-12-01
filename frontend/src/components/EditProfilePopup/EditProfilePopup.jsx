import { useContext, useEffect } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import CurrentUserContext from "../../contexts/CurrentUserContext"

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSent }) {
    const currentUser = useContext(CurrentUserContext)
    const { values, errors, isValid, isInputValid, handleChange, reset, setValue, } = useFormValidation()

    useEffect(() => {
        setValue("name", currentUser.name)
        setValue("about", currentUser.about)
    }, [currentUser, setValue])

    function resetForClose() {
        onClose()
        reset({
            name: currentUser.name,
            about: currentUser.about
        })
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateUser({
            name: values.name,
            about: values.about
        },reset)
    }

    return (
        <PopupWithForm
            name='edit-profile'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={resetForClose}
            isValid={isValid}
            isSent={isSent}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className={`popup__input popup__input_type_name ${isInputValid.name === undefined || isInputValid.name ? ' ' : 'popup__input_type_error'}`}
                id="name"
                name="name"
                minLength={2}
                maxLength={40}
                required
                placeholder="Введите имя"
                value={values.name ? values.name : ''}
                disabled={isSent}
                onChange={handleChange}

            />
            <span className="name-error popup__error popup__error_type_name" >{errors.name}</span>
            <input
                type="text"
                className={`popup__input popup__input_type_about ${isInputValid.about === undefined || isInputValid.about ? ' ' : 'popup__input_type_error'}`}
                id="about"
                placeholder="О себе"
                name="about"
                minLength={2}
                maxLength={200}
                required
                value={values.about ? values.about : ''}
                disabled={isSent}
                onChange={handleChange}
            />
            <span className="about-error popup__error popup__error_type_about" >{errors.about}</span>
        </PopupWithForm>
    )
}