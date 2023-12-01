import { useRef } from "react"
import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSent }) {
    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()
    const input = useRef()

    function resetForClose() {
        onClose()
        reset()
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateAvatar({ avatar: input.current.value }, reset)

    }

    return (
        <PopupWithForm
            name='edit-avatar'
            title='Обновить автар'
            isOpen={isOpen}
            onClose={resetForClose}
            onSubmit={handleSubmit}
            isSent={isSent}
            isValid={isValid}
        >
            <input
                ref={input}
                type="url"
                className={`popup__input popup__input_type_url ${isInputValid.avatar === undefined || isInputValid.avatar ? ' ' : 'popup__input_type_error'}`}
                id="avatar"
                placeholder="Ссылка на картинку"
                name="avatar"
                required
                value={values.avatar ? values.avatar : ''}
                disabled={isSent}
                onChange={handleChange}
            />
            <span className="avatar-error popup__error popup__error_type_avatar">{errors.avatar}</span>
        </PopupWithForm>
    )
}