export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose, onSubmit, isSent, isValid = true }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
            <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
                <button className="popup__close-icon" type="button" onClick={onClose} />
                <h2 className={`popup__subtitle ${name === 'delete' ? 'popup__subtitle_type_delete' : ''}`}>{title}</h2>
                <form
                    className="popup__form popup__form-profile"
                    name={name}
                    onSubmit={onSubmit}
                >
                    {children}
                    <button className={`popup__save ${isSent ? 'popup__save_loading' : ''}  ${isValid ? '' : 'popup__save_disabled'}`} type="submit" disabled={isSent}>
                        {isSent ? '' : titleButton || 'Сохранить'}
                    </button>
                </form>
            </div>
        </div>
    )
}