export default function Popup({ name, children, isOpen, onClose }) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={onClose}>
            <div className={`${name === 'image' ? 'popup__container_type_image' : 'popup__container'} 
            ${name === 'result' ? 'popup__container_type_registration' : ''}`}
                onMouseDown={(evt => evt.stopPropagation())}>
                <button className="popup__close-icon" type="button" onClick={onClose} />
                {children}
            </div>
        </div>)

}