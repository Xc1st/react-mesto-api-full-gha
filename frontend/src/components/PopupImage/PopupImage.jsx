export default function PopupImage({ card, isOpen, onClose }) {
    return (
        <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
            <div className="popup__container popup__container_type_image" onClick={(evt => evt.stopPropagation())}>
                <img src={card.link ? card.link : '#'} alt={card.name ? `Изображение ${card.name}` : '#'} className="popup__image" />
                <p className="popup__caption" >{card.name}</p>
                <button className="popup__close-icon" type="button" onClick={onClose} />
            </div>
        </div>
    )
}