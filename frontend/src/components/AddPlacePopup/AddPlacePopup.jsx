import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isSent }) {
    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

    function resetForClose() {
        onClose()
        reset()
    }

    function handleSubmit(evt) {
        evt.preventDefault()
        onAddPlace({
            title: values.title,
            link: values.link
        }, reset)
    }

    return (
        <PopupWithForm
            name='add-card'
            title='Новое место'
            titleButton='Создать'
            isOpen={isOpen}
            onClose={resetForClose}
            onSubmit={handleSubmit}
            isValid={isValid}
            isSent={isSent}
        >
            <input
                type="text"
                className={`popup__input popup__input_type_title ${isInputValid.title === undefined || isInputValid.title ? ' ' : 'popup__input_type_error'}`}
                id="title"
                placeholder="Название"
                name="title"
                minLength={2}
                maxLength={30}
                value={values.title ? values.title : ''}
                disabled={isSent}
                onChange={handleChange}

            />
            <span className="title-error popup__error popup__error_type_title">{errors.title}</span>
            <input
                type="url"
                className={`popup__input popup__input_type_url ${isInputValid.link === undefined || isInputValid.link ? ' ' : 'popup__input_type_error'}`}
                id="link"
                placeholder="Ссылка на картинку"
                name="link"
                value={values.link ? values.link : ''}
                disabled={isSent}
                onChange={handleChange}

            />
            <span className="link-error popup__error popup__error_type_link" >{errors.link}</span>
        </PopupWithForm>
    )
}